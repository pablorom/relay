import Link from 'next/link'

import { DEMO_WORKSPACE_ID } from '@/server/db/demo/workspaces'
import { getServicesForWorkspace } from '@/server/services/service.service'

export default async function ServicesPage() {
  const services = await getServicesForWorkspace(DEMO_WORKSPACE_ID)

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Services</h1>

        <p className="mt-2 text-sm text-neutral-500">{services.length} monitored services</p>
      </div>

      <div className="mt-6 divide-y rounded-lg border border-neutral-200">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.id}`}
            className="flex min-w-0 flex-col gap-2 p-4 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:-outline-offset-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0 flex-1">
              <div className="font-medium wrap-break-word">{service.name}</div>

              <div className="mt-1 text-sm wrap-break-word text-neutral-500">
                {service.description}
              </div>
            </div>

            <div className="shrink-0 self-start text-sm text-neutral-600 capitalize sm:self-auto">
              {service.status}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
