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
            className="flex items-center justify-between p-4 hover:bg-neutral-50"
          >
            <div>
              <div className="font-medium">{service.name}</div>

              <div className="mt-1 text-sm text-neutral-500">{service.description}</div>
            </div>

            <div className="text-sm text-neutral-600 capitalize">{service.status}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
