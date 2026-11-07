import { describe, expect, it } from 'vitest'

import { buildInvestigationTimeline } from './build-investigation-timeline'

describe('buildInvestigationTimeline', () => {
  it('combines deployments and incidents chronologically', () => {
    const timeline = buildInvestigationTimeline({
      deployments: [
        {
          id: 'dep-2',
          deployedAt: '2026-08-25T10:40:00.000Z',
          version: 'v2.18.5',
        },
        {
          id: 'dep-1',
          deployedAt: '2026-08-25T10:14:00.000Z',
          version: 'v2.18.4',
        },
      ],
      incidents: [
        {
          id: 'inc-1',
          incidentId: 'INC-1042',
          startedAt: '2026-08-25T10:24:00.000Z',
          title: 'Checkout API elevated errors',
        },
      ],
    })

    expect(timeline.map((item) => item.id)).toEqual([
      'deployment:dep-1',
      'incident:inc-1',
      'deployment:dep-2',
    ])
  })

  it('preserves event-specific properties', () => {
    const timeline = buildInvestigationTimeline({
      deployments: [
        {
          id: 'dep-1',
          deployedAt: '2026-08-25T10:14:00.000Z',
          version: 'v2.18.4',
        },
      ],
      incidents: [
        {
          id: 'inc-1',
          incidentId: 'INC-1042',
          startedAt: '2026-08-25T10:24:00.000Z',
          title: 'Checkout API elevated errors',
        },
      ],
    })

    const deployment = timeline.find((item) => item.kind === 'deployment')

    const incident = timeline.find((item) => item.kind === 'incident')

    expect(deployment).toMatchObject({
      kind: 'deployment',
      version: 'v2.18.4',
    })

    expect(incident).toMatchObject({
      kind: 'incident',
      recordId: 'inc-1',
      incidentId: 'INC-1042',
    })
  })

  it('returns an empty timeline when both sources are empty', () => {
    expect(
      buildInvestigationTimeline({
        deployments: [],
        incidents: [],
      }),
    ).toEqual([])
  })

  it('supports an investigation with only incidents', () => {
    const timeline = buildInvestigationTimeline({
      deployments: [],
      incidents: [
        {
          id: 'inc-1',
          incidentId: 'INC-1042',
          startedAt: '2026-08-25T10:24:00.000Z',
          title: 'Checkout API elevated errors',
        },
      ],
    })

    expect(timeline).toHaveLength(1)
    expect(timeline[0]?.kind).toBe('incident')
  })

  it('does not mutate its source arrays', () => {
    const deployments = Object.freeze([
      Object.freeze({
        id: 'dep-1',
        deployedAt: '2026-08-25T10:14:00.000Z',
        version: 'v2.18.4',
      }),
    ])

    const incidents = Object.freeze([
      Object.freeze({
        id: 'inc-1',
        incidentId: 'INC-1042',
        startedAt: '2026-08-25T10:24:00.000Z',
        title: 'Checkout API elevated errors',
      }),
    ])

    expect(() =>
      buildInvestigationTimeline({
        deployments,
        incidents,
      }),
    ).not.toThrow()
  })
})
