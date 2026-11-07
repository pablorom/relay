import { describe, expect, it } from 'vitest'

import { DEMO_WORKSPACE_ID } from '@/server/db/demo/workspaces'

import { getServiceInvestigationTimeline } from './investigation.service'

describe('getServiceInvestigationTimeline', () => {
  it('combines real deployment and incident records', async () => {
    const timeline = await getServiceInvestigationTimeline(DEMO_WORKSPACE_ID, 'checkout-api')

    expect(timeline).not.toBeNull()

    expect(timeline).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'deployment:dep-checkout-2184',
          kind: 'deployment',
          version: 'v2.18.4',
          timestamp: '2026-09-27T13:31:00.000Z',
        }),
        expect.objectContaining({
          id: 'incident:inc-1042',
          kind: 'incident',
          recordId: 'inc-1042',
          incidentId: 'INC-1042',
          timestamp: '2026-09-27T13:34:00.000Z',
        }),
      ]),
    )
  })

  it('sorts events chronologically', async () => {
    const timeline = await getServiceInvestigationTimeline(DEMO_WORKSPACE_ID, 'checkout-api')

    expect(timeline).not.toBeNull()

    const timestamps = timeline!.map((item) => new Date(item.timestamp).getTime())

    expect(timestamps).toEqual([...timestamps].sort((a, b) => a - b))
  })

  it('does not include deployments from another service', async () => {
    const timeline = await getServiceInvestigationTimeline(DEMO_WORKSPACE_ID, 'checkout-api')

    expect(timeline?.some((item) => item.kind === 'deployment' && item.version === 'v4.11.2')).toBe(
      false,
    )
  })

  it('returns null for a nonexistent service', async () => {
    const timeline = await getServiceInvestigationTimeline(DEMO_WORKSPACE_ID, 'missing-service')

    expect(timeline).toBeNull()
  })

  it('does not expose a service from another workspace', async () => {
    const timeline = await getServiceInvestigationTimeline('another-workspace', 'checkout-api')

    expect(timeline).toBeNull()
  })

  it('returns a valid timeline when no incidents exist', async () => {
    const timeline = await getServiceInvestigationTimeline(DEMO_WORKSPACE_ID, 'auth-service')

    expect(timeline).not.toBeNull()

    expect(timeline?.every((item) => item.kind === 'deployment')).toBe(true)

    expect(timeline?.some((item) => item.kind === 'deployment' && item.version === 'v3.7.1')).toBe(
      true,
    )
  })
})
