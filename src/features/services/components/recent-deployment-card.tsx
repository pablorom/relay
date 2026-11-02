import type { Deployment } from '@/domain/deployment/deployment.types'

type RecentDeploymentCardProps = {
  deployment: Deployment
}

export function RecentDeploymentCard({ deployment }: RecentDeploymentCardProps) {
  return (
    <section className="rounded-lg border border-neutral-200 p-4">
      <div className="text-sm text-neutral-500">Latest deployment</div>

      <p className="mt-2 text-sm text-neutral-500">Recent production change</p>

      <div className="mt-2 font-medium">{deployment.version}</div>

      <div className="mt-1 text-sm text-neutral-500">Commit {deployment.commitSha}</div>

      <div className="mt-3 text-sm capitalize">{deployment.status.replace('_', ' ')}</div>
    </section>
  )
}
