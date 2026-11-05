import type { MetricKind } from '@/domain/event/event.types'

export type DeploymentTimelineItem = {
  id: string
  kind: 'deployment'
  timestamp: string
  version: string
}

export type IncidentTimelineItem = {
  id: string
  kind: 'incident'
  timestamp: string
  incidentId: string
  title: string
}

export type MetricAnomalyTimelineItem = {
  id: string
  kind: 'metric-anomaly'
  timestamp: string
  metric: MetricKind
  value: number
}

export type InvestigationTimelineItem =
  DeploymentTimelineItem | IncidentTimelineItem | MetricAnomalyTimelineItem
