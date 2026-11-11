import type { ServiceMetricsRange } from '@/domain/service/service-metrics.types'
import type { InvestigationTimelineItem } from './investigation-timeline.types'

export type InvestigationWindow = {
  start: string
  end: string
}

const RANGE_DURATION_MS: Record<ServiceMetricsRange, number> = {
  '1h': 60 * 60 * 1000,
  '6h': 6 * 60 * 60 * 1000,
  '24h': 24 * 60 * 60 * 1000,
  '7d': 7 * 24 * 60 * 60 * 1000,
}

export function createInvestigationWindow(
  range: ServiceMetricsRange,
  endTimestamp: string,
): InvestigationWindow {
  const endMs = new Date(endTimestamp).getTime()

  if (!Number.isFinite(endMs)) {
    throw new Error('Invalid investigation end timestamp.')
  }

  const startMs = endMs - RANGE_DURATION_MS[range]

  return {
    start: new Date(startMs).toISOString(),
    end: new Date(endMs).toISOString(),
  }
}

export function filterInvestigationTimeline(
  items: readonly InvestigationTimelineItem[],
  window: InvestigationWindow,
): InvestigationTimelineItem[] {
  const startMs = new Date(window.start).getTime()
  const endMs = new Date(window.end).getTime()

  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || startMs >= endMs) {
    throw new Error('Invalid investigation window.')
  }

  return items.filter((item) => {
    const timestampMs = new Date(item.timestamp).getTime()

    return timestampMs > startMs && timestampMs <= endMs
  })
}
