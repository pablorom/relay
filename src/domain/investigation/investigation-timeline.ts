import type { InvestigationTimelineItem } from './investigation-timeline.types'

export function sortInvestigationTimeline(
  items: readonly InvestigationTimelineItem[],
): InvestigationTimelineItem[] {
  return [...items].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  )
}
