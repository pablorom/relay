import { MetricCard } from '@/components/ui/metric-card'
import { ActiveIncidentCard } from '@/features/overview/components/active-incident-card'
import { AvailabilityChart } from '@/features/overview/components/availability-chart'
import { ServiceOverviewTable } from '@/features/overview/components/service-overview-table'
import { formatPercentage } from '@/lib/utils/format'
import { DEMO_WORKSPACE_ID } from '@/server/db/demo/workspaces'
import { getOverviewData } from '@/server/services/overview.service'

export default async function OverviewPage() {
  const data = await getOverviewData(DEMO_WORKSPACE_ID)

  const activeIncident = data.activeIncidents[0] ?? null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Operations Overview</h1>

        <p className="mt-1 text-sm text-neutral-500">Acme Cloud</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Services"
          value={String(data.summary.totalServices)}
          description={`${data.summary.healthyServices} healthy`}
        />

        <MetricCard
          label="Active incidents"
          value={String(data.summary.activeIncidents)}
          description={activeIncident ? `${activeIncident.severity} active` : 'No active incidents'}
        />

        <MetricCard label="Availability" value={formatPercentage(data.summary.availability)} />

        <MetricCard label="Error rate" value={formatPercentage(data.summary.errorRate)} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-lg border border-neutral-200 p-4">
          <h2 className="font-semibold">System health</h2>

          <div className="mt-4">
            <AvailabilityChart data={data.metrics} />
          </div>
        </section>

        {activeIncident ? (
          <ActiveIncidentCard incident={activeIncident} />
        ) : (
          <section className="rounded-lg border border-neutral-200 p-4">
            <h2 className="font-semibold">No active incidents</h2>
          </section>
        )}
      </div>

      <ServiceOverviewTable services={data.services} />
    </div>
  )
}
