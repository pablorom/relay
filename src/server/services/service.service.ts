import { Deployment } from '@/domain/deployment/deployment.types'
import { Incident } from '@/domain/incident/incident.types'
import type { Service } from '@/domain/service/service.types'
import type { Team } from '@/domain/team/team.types'
import { findDeploymentsByServiceId } from '@/server/repositories/deployment.repository'
import { findIncidentsByServiceId } from '@/server/repositories/incident.repository'
import {
  findServiceById,
  findServicesByWorkspaceId,
} from '@/server/repositories/service.repository'
import { findTeamById } from '@/server/repositories/team.repository'

export type ServiceDetails = {
  service: Service
  team: Team | null
  deployments: readonly Deployment[]
  incidents: readonly Incident[]
}

export async function getServicesForWorkspace(workspaceId: string): Promise<readonly Service[]> {
  return findServicesByWorkspaceId(workspaceId)
}

export async function getServiceDetails(
  workspaceId: string,
  serviceId: string,
): Promise<ServiceDetails | null> {
  const service = findServiceById(workspaceId, serviceId)

  if (!service) {
    return null
  }

  const team = findTeamById(workspaceId, service.teamId)

  const deployments = findDeploymentsByServiceId(service.id)

  const incidents = findIncidentsByServiceId(workspaceId, service.id)

  return {
    service,
    team,
    deployments,
    incidents,
  }
}
