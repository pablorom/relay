import { describe, expect, it } from 'vitest'

import type { InvestigationTimelineItem } from './investigation-timeline.types'
import { createInvestigationWindow, filterInvestigationTimeline } from './investigation-window'

const END = '2026-09-27T14:00:00.000Z'

describe('createInvestigationWindow', () => {
  it.each([
    ['1h', '2026-09-27T13:00:00.000Z'],
    ['6h', '2026-09-27T08:00:00.000Z'],
    ['24h', '2026-09-26T14:00:00.000Z'],
    ['7d', '2026-09-20T14:00:00.000Z'],
  ] as const)('calculates the correct %s investigation window', (range, expectedStart) => {
    expect(createInvestigationWindow(range, END)).toEqual({
      start: expectedStart,
      end: END,
    })
  })

  it('rejects an invalid end timestamp', () => {
    expect(() => createInvestigationWindow('1h', 'invalid-date')).toThrow(
      'Invalid investigation end timestamp.',
    )
  })
})

describe('filterInvestigationTimeline', () => {
  const items: InvestigationTimelineItem[] = [
    {
      id: 'deployment:before',
      kind: 'deployment',
      timestamp: '2026-09-27T12:59:00.000Z',
      version: 'v2.18.3',
    },
    {
      id: 'deployment:boundary',
      kind: 'deployment',
      timestamp: '2026-09-27T13:00:00.000Z',
      version: 'v2.18.3',
    },
    {
      id: 'deployment:current',
      kind: 'deployment',
      timestamp: '2026-09-27T13:31:00.000Z',
      version: 'v2.18.4',
    },
    {
      id: 'incident:current',
      kind: 'incident',
      timestamp: '2026-09-27T13:34:00.000Z',
      recordId: 'inc-1042',
      incidentId: 'INC-1042',
      title: 'Checkout failures in EU region',
    },
    {
      id: 'deployment:end',
      kind: 'deployment',
      timestamp: END,
      version: 'v2.18.5',
    },
    {
      id: 'deployment:future',
      kind: 'deployment',
      timestamp: '2026-09-27T14:01:00.000Z',
      version: 'v2.18.6',
    },
  ]

  it('includes only events inside the selected window', () => {
    const window = createInvestigationWindow('1h', END)

    const result = filterInvestigationTimeline(items, window)

    expect(result.map((item) => item.id)).toEqual([
      'deployment:current',
      'incident:current',
      'deployment:end',
    ])
  })

  it('does not mutate the original timeline', () => {
    const window = createInvestigationWindow('1h', END)
    const originalIds = items.map((item) => item.id)

    filterInvestigationTimeline(items, window)

    expect(items.map((item) => item.id)).toEqual(originalIds)
  })

  it('returns an empty array when no events match', () => {
    const window = createInvestigationWindow('1h', '2026-09-28T14:00:00.000Z')

    expect(filterInvestigationTimeline(items, window)).toEqual([])
  })

  it('rejects an invalid window', () => {
    expect(() =>
      filterInvestigationTimeline(items, {
        start: END,
        end: END,
      }),
    ).toThrow('Invalid investigation window.')
  })
})
