import type { Service } from '@/domain/service/service.types'
import type { Team } from '@/domain/team/team.types'
import {
  findServiceById,
  findServicesByWorkspaceId,
} from '@/server/repositories/service.repository'
import { findTeamById } from '@/server/repositories/team.repository'

export type ServiceDetails = {
  service: Service
  team: Team | null
}

export async function getServicesForWorkspace(workspaceId: string): Promise<readonly Service[]> {
  return findServicesByWorkspaceId(workspaceId)
}

export async function getServiceDetails(
  workspaceId: string,
  serviceId: string,
): Promise<ServiceDetails | null> {
  const service = await findServiceById(workspaceId, serviceId)

  if (!service) {
    return null
  }

  const team = await findTeamById(workspaceId, service.teamId)

  return {
    service,
    team,
  }
}
