import type { Service } from '@/domain/service/service.types'
import { demoServices } from '@/server/db/demo/services'

export function findServicesByWorkspaceId(workspaceId: string): readonly Service[] {
  return demoServices.filter((service) => service.workspaceId === workspaceId)
}

export function findServiceById(workspaceId: string, serviceId: string): Service | null {
  return (
    demoServices.find(
      (service) => service.workspaceId === workspaceId && service.id === serviceId,
    ) ?? null
  )
}
