'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { parseServiceMetricsRange } from '@/domain/service/service-metrics.schema'
import type { ServiceMetricsRange } from '@/domain/service/service-metrics.types'
import { fetchServiceMetrics } from '@/features/services/api/fetch-service-metrics'
import { ServiceMetricSummary } from '@/features/services/components/service-metric-summary'
import { ServiceMetricsChart } from '@/features/services/components/service-metrics-chart'
import { ServiceMetricsProvider } from '@/features/services/components/service-metrics-context'
import { serviceMetricsKeys } from '@/features/services/queries/service-metrics.keys'
import {
  formatCompactNumber,
  formatMetricTimestamp,
  formatMilliseconds,
  formatPercentage,
} from '@/lib/utils/format'
import { ServiceChartEvent } from '@/features/services/types/service-chart-event'

const ranges: readonly ServiceMetricsRange[] = ['1h', '6h', '24h', '7d']

type ServiceMetricsPanelProps = {
  serviceId: string
  events?: readonly ServiceChartEvent[]
}

export function ServiceMetricsPanel({ serviceId, events }: ServiceMetricsPanelProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const range = parseServiceMetricsRange(searchParams.get('range'))

  const metricsQuery = useQuery({
    queryKey: serviceMetricsKeys.detail(serviceId, range),

    queryFn: () => fetchServiceMetrics(serviceId, range),

    staleTime: 15_000,

    placeholderData: keepPreviousData,
  })

  function changeRange(nextRange: ServiceMetricsRange) {
    if (nextRange === range) {
      return
    }

    const params = new URLSearchParams(searchParams.toString())

    params.set('range', nextRange)

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    })
  }

  if (metricsQuery.isPending) {
    return (
      <section aria-busy="true" aria-label="Loading service metrics" className="space-y-4">
        <div className="h-8 w-40 animate-pulse rounded bg-neutral-100" />

        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-24 animate-pulse rounded-lg bg-neutral-100" />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-64 animate-pulse rounded-lg bg-neutral-100" />
          ))}
        </div>
      </section>
    )
  }

  if (metricsQuery.isError) {
    return (
      <section className="rounded-lg border border-neutral-200 p-6">
        <h2 className="font-medium">Unable to load metrics</h2>

        <p className="mt-2 text-sm text-neutral-500">
          Relay could not retrieve metric data for this service.
        </p>

        <button
          type="button"
          onClick={() => metricsQuery.refetch()}
          className="mt-4 rounded-md border border-neutral-200 px-3 py-1.5 text-sm font-medium"
        >
          Try again
        </button>
      </section>
    )
  }

  const latest = metricsQuery.data.at(-1)

  if (!latest) {
    return (
      <section className="rounded-lg border border-neutral-200 p-6">
        <h2 className="font-medium">No metrics available</h2>

        <p className="mt-2 text-sm text-neutral-500">
          No metric points were recorded for the selected {range} range.
        </p>
      </section>
    )
  }

  return (
    <ServiceMetricsProvider>
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Performance</h2>

            <p className="mt-1 text-sm text-neutral-500">Runtime metrics for {serviceId}</p>
          </div>

          <div role="group" aria-label="Metrics time range" className="flex gap-1">
            {ranges.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={range === option}
                onClick={() => changeRange(option)}
                className={
                  range === option
                    ? 'rounded-md border border-neutral-900 px-3 py-1.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2'
                    : 'rounded-md border border-neutral-200 px-3 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2'
                }
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {metricsQuery.isFetching ? (
          <p role="status" aria-live="polite" className="text-sm text-neutral-500">
            Updating metrics…
          </p>
        ) : null}

        <div className="grid gap-4 md:grid-cols-3">
          <ServiceMetricSummary
            label="Request rate"
            value={`${formatCompactNumber(latest.requestRate)}/min`}
          />

          <ServiceMetricSummary label="Error rate" value={formatPercentage(latest.errorRate)} />

          <ServiceMetricSummary
            label="P95 latency"
            value={formatMilliseconds(latest.latencyP95Ms)}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <ServiceMetricsChart
            title="Request rate"
            data={metricsQuery.data}
            metric="requestRate"
            formatter={(value) => formatCompactNumber(value)}
            xAxisFormatter={(timestamp) => formatMetricTimestamp(timestamp, range)}

            {...(events ? { events } : {})}
          />

          <ServiceMetricsChart
            title="Error rate"
            data={metricsQuery.data}
            metric="errorRate"
            formatter={(value) => formatPercentage(value)}
            xAxisFormatter={(timestamp) => formatMetricTimestamp(timestamp, range)}

            {...(events ? { events } : {})}
          />

          <ServiceMetricsChart
            title="P95 latency"
            data={metricsQuery.data}
            metric="latencyP95Ms"
            formatter={(value) => formatMilliseconds(value)}
            xAxisFormatter={(timestamp) => formatMetricTimestamp(timestamp, range)}

            {...(events ? { events } : {})}
          />
        </div>
      </section>
    </ServiceMetricsProvider>
  )
}
