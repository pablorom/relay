import { notFound } from 'next/navigation'

import { DEMO_WORKSPACE_ID } from '@/server/db/demo/workspaces'
import { getServiceDetails } from '@/server/services/service.service'

type ServicePageProps = {
  params: Promise<{
    serviceId: string
  }>
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { serviceId } = await params

  const details = await getServiceDetails(DEMO_WORKSPACE_ID, serviceId)

  if (!details) {
    notFound()
  }

  const { service, team } = details

  return (
    <div>
      <p className="text-sm text-neutral-500">Services</p>

      <div className="mt-2 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{service.name}</h1>

          <p className="mt-2 text-neutral-600">{service.description}</p>

          <p className="mt-2 text-sm text-neutral-500">
            {team?.name ?? 'Unassigned team'} ·{' '}
            <span className="capitalize">{service.environment}</span>
          </p>
        </div>

        <span className="rounded-md border border-neutral-200 px-3 py-1 text-sm capitalize">
          {service.status}
        </span>
      </div>
    </div>
  )
}
