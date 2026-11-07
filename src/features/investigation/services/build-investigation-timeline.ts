import { sortInvestigationTimeline } from '@/domain/investigation/investigation-timeline'
import type { InvestigationTimelineItem } from '@/domain/investigation/investigation-timeline.types'

export type DeploymentTimelineSource = {
  id: string
  deployedAt: string
  version: string
}

export type IncidentTimelineSource = {
  id: string
  incidentId: string
  startedAt: string
  title: string
}

export type InvestigationTimelineSources = {
  deployments: readonly DeploymentTimelineSource[]
  incidents: readonly IncidentTimelineSource[]
}

export function buildInvestigationTimeline({
  deployments,
  incidents,
}: InvestigationTimelineSources): InvestigationTimelineItem[] {
  const deploymentItems: InvestigationTimelineItem[] = deployments.map((deployment) => ({
    id: `deployment:${deployment.id}`,
    kind: 'deployment',
    timestamp: deployment.deployedAt,
    version: deployment.version,
  }))

  const incidentItems: InvestigationTimelineItem[] = incidents.map((incident) => ({
    id: `incident:${incident.id}`,
    kind: 'incident',
    timestamp: incident.startedAt,
    recordId: incident.id,
    incidentId: incident.incidentId,
    title: incident.title,
  }))

  return sortInvestigationTimeline([...deploymentItems, ...incidentItems])
}
