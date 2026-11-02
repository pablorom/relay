import Link from 'next/link'

import type { Incident } from '@/domain/incident/incident.types'

type ServiceIncidentCardProps = {
  incident: Incident
}

export function ServiceIncidentCard({ incident }: ServiceIncidentCardProps) {
  return (
    <section className="rounded-lg border border-neutral-200 p-4">
      <div className="flex items-center gap-2">
        <span className="rounded border border-neutral-300 px-2 py-1 text-xs">
          {incident.severity}
        </span>
        <p className="mt-2 text-sm text-neutral-500">Affecting this service</p>
        <span className="text-sm text-neutral-500">{incident.number}</span>
      </div>

      <h3 className="mt-3 font-medium">{incident.title}</h3>

      <Link
        href={`/incidents/${incident.id}`}
        className="mt-4 inline-block text-sm font-medium hover:underline"
      >
        View incident →
      </Link>
    </section>
  )
}
