import { describe, expect, it } from 'vitest'

import { sortInvestigationTimeline } from './investigation-timeline'
import type { InvestigationTimelineItem } from './investigation-timeline.types'
import { renderToStaticMarkup } from 'react-dom/server'
import { InvestigationTimeline } from '@/features/investigation/components/investigation-timeline'

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

  it('describes the selected investigation window', () => {
    const html = renderToStaticMarkup(
      <InvestigationTimeline
        items={[]}
        window={{
          start: '2026-09-27T13:00:00.000Z',
          end: '2026-09-27T14:00:00.000Z',
        }}
      />,
    )

    expect(html).toContain('Events after')
    expect(html).toContain('13:00')
    expect(html).toContain('14:00')
    expect(html).not.toContain('All recorded operational events affecting this service')
  })
})
