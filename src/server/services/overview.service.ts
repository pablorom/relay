import { overviewMetrics } from '@/server/db/demo/overview-metrics'
import { findActiveIncidentsByWorkspaceId } from '@/server/repositories/incident.repository'
import { findRecentDeployments } from '@/server/repositories/deployment.repository'
import { findServicesByWorkspaceId } from '@/server/repositories/service.repository'

export async function getOverviewData(workspaceId: string) {
  const services = findServicesByWorkspaceId(workspaceId)

  const activeIncidents = findActiveIncidentsByWorkspaceId(workspaceId)

  const recentDeployments = findRecentDeployments(3)

  const healthyServices = services.filter((service) => service.status === 'healthy').length

  return {
    summary: {
      totalServices: services.length,
      healthyServices,
      activeIncidents: activeIncidents.length,
      availability: 0.9994,
      errorRate: 0.0481,
    },

    services,
    activeIncidents,
    recentDeployments,
    metrics: overviewMetrics,
  }
}
