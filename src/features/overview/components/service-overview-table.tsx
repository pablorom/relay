import Link from 'next/link'

import type { Service } from '@/domain/service/service.types'
import { ServiceStatus } from '@/features/services/components/service-status'

type ServiceOverviewTableProps = {
  services: readonly Service[]
}

export function ServiceOverviewTable({ services }: ServiceOverviewTableProps) {
  return (
    <section className="rounded-lg border border-neutral-200">
      <div className="border-b border-neutral-200 px-4 py-3">
        <h2 className="font-semibold">Services</h2>
      </div>

      <div className="divide-y divide-neutral-200">
        {services.slice(0, 5).map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.id}`}
            className="grid grid-cols-[2fr_1fr] items-center gap-4 px-4 py-3 hover:bg-neutral-50"
          >
            <div>
              <div className="font-medium">{service.name}</div>

              <div className="text-sm text-neutral-500">{service.description}</div>
            </div>

            <ServiceStatus status={service.status} />
          </Link>
        ))}
      </div>

      <div className="border-t border-neutral-200 px-4 py-3 text-right">
        <Link href="/services" className="text-sm font-medium hover:underline">
          View all services →
        </Link>
      </div>
    </section>
  )
}
