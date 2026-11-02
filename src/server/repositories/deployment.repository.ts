import type { Deployment } from '@/domain/deployment/deployment.types'
import { demoDeployments } from '@/server/db/demo/deployments'

export function findRecentDeployments(limit: number): readonly Deployment[] {
  return demoDeployments.slice(0, limit)
}

export function findDeploymentsByServiceId(serviceId: string): readonly Deployment[] {
  return demoDeployments
    .filter((deployment) => deployment.serviceId === serviceId)
    .toSorted((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
}
