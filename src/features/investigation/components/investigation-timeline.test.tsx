import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import type { InvestigationTimelineItem } from '@/domain/investigation/investigation-timeline.types'

import { InvestigationTimeline } from './investigation-timeline'

describe('InvestigationTimeline', () => {
  it('renders deployment and incident information', () => {
    const items: InvestigationTimelineItem[] = [
      {
        id: 'deployment:dep-1',
        kind: 'deployment',
        timestamp: '2026-09-27T13:31:00.000Z',
        version: 'v2.18.4',
      },
      {
        id: 'incident:inc-1',
        kind: 'incident',
        timestamp: '2026-09-27T13:34:00.000Z',
        incidentId: 'INC-1042',
        recordId: 'inc-1',
        title: 'Checkout failures in EU region',
      },
    ]

    const html = renderToStaticMarkup(<InvestigationTimeline items={items} />)

    expect(html).toContain('Deployment v2.18.4')
    expect(html).toContain('INC-1042')
    expect(html).toContain('Checkout failures in EU region')
    expect(html).toContain('<ol')
    expect(html).toContain('dateTime="2026-09-27T13:31:00.000Z"')
  })

  it('renders a meaningful empty state', () => {
    const html = renderToStaticMarkup(<InvestigationTimeline items={[]} />)

    expect(html).toContain('No investigation events are available for this service.')
  })

  it('renders metric anomaly items safely', () => {
    const items: InvestigationTimelineItem[] = [
      {
        id: 'metric-anomaly:1',
        kind: 'metric-anomaly',
        timestamp: '2026-09-27T13:32:00.000Z',
        metric: 'errorRate',
        value: 0.08,
      },
    ]

    const html = renderToStaticMarkup(<InvestigationTimeline items={items} />)

    expect(html).toContain('Metric anomaly: errorRate')
    expect(html).toContain('Recorded value: 0.08')
  })

  it('links incidents using their internal record ID', () => {
    const items: InvestigationTimelineItem[] = [
      {
        id: 'incident:inc-1042',
        kind: 'incident',
        timestamp: '2026-09-27T13:34:00.000Z',
        recordId: 'inc-1042',
        incidentId: 'INC-1042',
        title: 'Checkout failures in EU region',
      },
    ]

    const html = renderToStaticMarkup(<InvestigationTimeline items={items} />)

    expect(html).toContain('href="/incidents/inc-1042"')
    expect(html).toContain('INC-1042')
    expect(html).not.toContain('href="/incidents/INC-1042"')
  })

  it('explains that the timeline contains all recorded events', () => {
    const html = renderToStaticMarkup(<InvestigationTimeline items={[]} />)

    expect(html).toContain('All recorded operational events affecting this service')
  })
})
