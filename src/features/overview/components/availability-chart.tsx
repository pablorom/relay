'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatPercentage } from '@/lib/utils/format'
import type { OverviewMetricPoint } from '@/features/overview/types/overview.types'

type AvailabilityChartProps = {
  data: readonly OverviewMetricPoint[]
}

export function AvailabilityChart({ data }: AvailabilityChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={[...data]}>
          <XAxis dataKey="timestamp" />

          <YAxis
            domain={[0.98, 1]}
            tickFormatter={(value: number) => `${(value * 100).toFixed(1)}%`}
          />

          <Tooltip
            formatter={(value) => {
              if (typeof value !== 'number') {
                return '—'
              }

              return formatPercentage(value)
            }}
          />

          <Line type="monotone" dataKey="availability" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
