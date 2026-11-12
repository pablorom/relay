import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { parseServiceMetricsRange } from '@/domain/service/service-metrics.schema'
import { ServiceMetricsPanel } from '@/features/services/components/service-metrics-panel'
import { serviceMetricsKeys } from '@/features/services/queries/service-metrics.keys'
import { makeQueryClient } from '@/lib/query/query-client'
import { DEMO_WORKSPACE_ID } from '@/server/db/demo/workspaces'
import { getServiceDetails } from '@/server/services/service.service'
import { getServiceMetrics } from '@/server/services/metric.service'
import { RecentDeploymentCard } from '@/features/services/components/recent-deployment-card'
import { ServiceIncidentCard } from '@/features/services/components/service-incident-card'
import { InvestigationTimeline } from '@/features/investigation/components/investigation-timeline'
import { getServiceInvestigationTimeline } from '@/server/services/investigation.service'
import { createInvestigationWindow } from '@/domain/investigation/investigation-window'

type ServicePageProps = {
  params: Promise<{
    serviceId: string
  }>

  searchParams: Promise<{
    range?: string | string[]
  }>
}

export default async function ServicePage({ params, searchParams }: ServicePageProps) {
  const [{ serviceId }, currentSearchParams] = await Promise.all([params, searchParams])

  const rawRange = Array.isArray(currentSearchParams.range)
    ? currentSearchParams.range[0]
    : currentSearchParams.range

  const range = parseServiceMetricsRange(rawRange)

  const [details, metrics] = await Promise.all([
    getServiceDetails(DEMO_WORKSPACE_ID, serviceId),
    getServiceMetrics(DEMO_WORKSPACE_ID, serviceId, range),
  ])

  if (!details || metrics === null) {
    notFound()
  }

  const latestMetricPoint = metrics.at(-1)

  const investigationWindow = latestMetricPoint
    ? createInvestigationWindow(range, latestMetricPoint.timestamp)
    : null

  const timeline = investigationWindow
    ? await getServiceInvestigationTimeline(DEMO_WORKSPACE_ID, serviceId, investigationWindow)
    : []

  if (timeline === null) {
    notFound()
  }

  const queryClient = makeQueryClient()

  queryClient.setQueryData(serviceMetricsKeys.detail(serviceId, range), metrics)

  const { service, team, deployments, incidents } = details

  const latestDeployment = deployments[0] ?? null

  const chartEvents = timeline.flatMap((item) =>
    item.kind === 'deployment'
      ? [
          {
            id: item.id,
            timestamp: item.timestamp,
            label: item.version,
          },
        ]
      : [],
  )

  const activeIncident = incidents.find((incident) => incident.status !== 'resolved') ?? null

  return (
    <div>
      {/* keep your existing service header here */}
      <div className="grid gap-4 lg:grid-cols-2">
        {latestDeployment ? <RecentDeploymentCard deployment={latestDeployment} /> : null}

        {activeIncident ? <ServiceIncidentCard incident={activeIncident} /> : null}
      </div>
      <div className="mt-8">
        {investigationWindow ? (
          <InvestigationTimeline items={timeline} window={investigationWindow} />
        ) : (
          <section className="rounded-lg border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold">Investigation timeline</h2>

            <p className="mt-2 text-sm text-neutral-500">
              No metrics are available to establish the selected investigation window.
            </p>
          </section>
        )}
      </div>
      <div className="mt-8">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div className="rounded-lg border p-6">Loading metrics…</div>}>
            <ServiceMetricsPanel serviceId={service.id} events={chartEvents} />
          </Suspense>
        </HydrationBoundary>
      </div>
    </div>
  )
}
