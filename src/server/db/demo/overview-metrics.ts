import type { OverviewMetricPoint } from '@/features/overview/types/overview.types'

export const overviewMetrics: readonly OverviewMetricPoint[] = [
  {
    timestamp: '13:00',
    availability: 0.9998,
    requestRate: 15100,
  },
  {
    timestamp: '13:10',
    availability: 0.9997,
    requestRate: 15700,
  },
  {
    timestamp: '13:20',
    availability: 0.9998,
    requestRate: 16100,
  },
  {
    timestamp: '13:30',
    availability: 0.9994,
    requestRate: 16900,
  },
  {
    timestamp: '13:40',
    availability: 0.9978,
    requestRate: 17200,
  },
  {
    timestamp: '13:50',
    availability: 0.9941,
    requestRate: 16500,
  },
  {
    timestamp: '14:00',
    availability: 0.9894,
    requestRate: 15800,
  },
]
