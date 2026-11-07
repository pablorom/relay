import { describe, expect, it } from 'vitest'

import { sortInvestigationTimeline } from './investigation-timeline'
import type { InvestigationTimelineItem } from './investigation-timeline.types'

describe('sortInvestigationTimeline', () => {
  it('sorts investigation items chronologically', () => {
    const items: InvestigationTimelineItem[] = [
      {
        id: 'incident-1042',
        kind: 'incident',
        timestamp: '2026-08-25T10:24:00.000Z',
        incidentId: 'INC-1042',
        recordId: 'inc-1042',
        title: 'Checkout API elevated errors',
      },
      {
        id: 'deployment-v2.18.4',
        kind: 'deployment',
        timestamp: '2026-08-25T10:14:00.000Z',
        version: 'v2.18.4',
      },
      {
        id: 'error-rate-anomaly',
        kind: 'metric-anomaly',
        timestamp: '2026-08-25T10:17:00.000Z',
        metric: 'errorRate',
        value: 8.2,
      },
    ]

    const result = sortInvestigationTimeline(items)

    expect(result.map((item) => item.id)).toEqual([
      'deployment-v2.18.4',
      'error-rate-anomaly',
      'incident-1042',
    ])
  })

  it('does not mutate the original array', () => {
    const items: InvestigationTimelineItem[] = [
      {
        id: 'incident-1042',
        kind: 'incident',
        timestamp: '2026-08-25T10:24:00.000Z',
        incidentId: 'INC-1042',
        recordId: 'inc-1042',
        title: 'Checkout API elevated errors',
      },
      {
        id: 'deployment-v2.18.4',
        kind: 'deployment',
        timestamp: '2026-08-25T10:14:00.000Z',
        version: 'v2.18.4',
      },
    ]

    const originalOrder = items.map((item) => item.id)

    sortInvestigationTimeline(items)

    expect(items.map((item) => item.id)).toEqual(originalOrder)
  })
})
