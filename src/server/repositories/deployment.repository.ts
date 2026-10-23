import type { Deployment } from '@/domain/deployment/deployment.types'
import { demoDeployments } from '@/server/db/demo/deployments'

export function findRecentDeployments(limit: number): readonly Deployment[] {
  return demoDeployments.slice(0, limit)
}
