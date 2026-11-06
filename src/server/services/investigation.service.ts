import type { InvestigationTimelineItem } from '@/domain/investigation/investigation-timeline.types'
import { buildInvestigationTimeline } from '@/features/investigation/services/build-investigation-timeline'
import { findDeploymentsByServiceId } from '@/server/repositories/deployment.repository'
import { findIncidentsByServiceId } from '@/server/repositories/incident.repository'
import { findServiceById } from '@/server/repositories/service.repository'

export async function getServiceInvestigationTimeline(
  workspaceId: string,
  serviceId: string,
): Promise<InvestigationTimelineItem[] | null> {
  const service = findServiceById(workspaceId, serviceId)

  if (!service) {
    return null
  }

  const deployments = findDeploymentsByServiceId(service.id)

  const incidents = findIncidentsByServiceId(workspaceId, service.id)

  return buildInvestigationTimeline({
    deployments: deployments.map((deployment) => ({
      id: deployment.id,
      deployedAt: deployment.completedAt ?? deployment.startedAt,
      version: deployment.version,
    })),

    incidents: incidents.map((incident) => ({
      id: incident.id,
      incidentId: incident.number,
      startedAt: incident.startedAt,
      title: incident.title,
    })),
  })
}
