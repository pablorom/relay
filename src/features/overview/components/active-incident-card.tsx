import Link from 'next/link'

import type { Incident } from '@/domain/incident/incident.types'

type ActiveIncidentCardProps = {
  incident: Incident
}

export function ActiveIncidentCard({ incident }: ActiveIncidentCardProps) {
  return (
    <section className="rounded-lg border border-neutral-200 p-4">
      <div className="text-sm font-medium">Active incident</div>

      <div className="mt-4 flex items-center gap-2">
        <span className="rounded border border-neutral-300 px-2 py-1 text-xs font-medium">
          {incident.severity}
        </span>

        <span className="text-sm capitalize">{incident.status}</span>
      </div>

      <h2 className="mt-3 text-lg font-semibold">{incident.title}</h2>

      <div className="mt-6">
        <Link href={`/incidents/${incident.id}`} className="text-sm font-medium hover:underline">
          View incident →
        </Link>
      </div>
    </section>
  )
}
