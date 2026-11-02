'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { MetricPoint } from '@/domain/event/event.types'
import { useServiceMetricsContext } from '@/features/services/components/service-metrics-context'
import type { ServiceChartEvent } from '@/features/services/types/service-chart-event'

type MetricKind = 'requestRate' | 'errorRate' | 'latencyP95Ms'

type ServiceMetricsChartProps = {
  title: string
  data: readonly MetricPoint[]
  metric: MetricKind
  formatter: (value: number) => string
  xAxisFormatter: (timestamp: string) => string
  events?: readonly ServiceChartEvent[]
}

export function ServiceMetricsChart({
  title,
  data,
  metric,
  formatter,
  xAxisFormatter,
  events,
}: ServiceMetricsChartProps) {
  const { hoveredTimestamp, setHoveredTimestamp } = useServiceMetricsContext()

  const chartData = data.map((point) => ({
    ...point,
    timestampMs: new Date(point.timestamp).getTime(),
  }))

  const chartEvents = events?.map((event) => ({
    id: event.id,
    timestampMs: new Date(event.timestamp).getTime(),
    label: event.label,
  }))

  return (
    <section className="rounded-lg border border-neutral-200 p-4">
      <h3 className="font-medium">{title}</h3>

      <div className="mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            onMouseMove={(state) => {
              const label = state.activeLabel

              if (typeof label === 'number') {
                setHoveredTimestamp(new Date(label).toISOString())
              }
            }}
            onMouseLeave={() => {
              setHoveredTimestamp(null)
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            <XAxis
              type="number"
              dataKey="timestampMs"
              domain={['dataMin', 'dataMax']}
              tickFormatter={(value: number) => xAxisFormatter(new Date(value).toISOString())}
            />

            <YAxis tickFormatter={(value: number) => formatter(value)} />

            <Tooltip
              labelFormatter={(value) => {
                if (typeof value !== 'number') {
                  return '—'
                }

                return new Date(value).toLocaleString('en-US')
              }}
              formatter={(value) => {
                if (typeof value !== 'number') {
                  return '—'
                }

                return formatter(value)
              }}
            />

            {/* fixed product events */}
            {chartEvents?.map((event) => (
              <ReferenceLine
                key={event.id}
                x={event.timestampMs}
                strokeDasharray="4 4"
                label={{
                  value: event.label,
                  position: 'insideTopRight',
                }}
              />
            ))}

            {/* temporary synchronized hover */}
            {hoveredTimestamp ? (
              <ReferenceLine x={new Date(hoveredTimestamp).getTime()} strokeDasharray="3 3" />
            ) : null}

            <Line type="monotone" dataKey={metric} dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
