import { metricPointSchema } from '@/domain/event/event.schema'
import type { ServiceMetricsRange } from '@/domain/service/service-metrics.types'

const rangeConfig: Record<
  ServiceMetricsRange,
  {
    points: number
    stepMinutes: number
  }
> = {
  '1h': {
    points: 13,
    stepMinutes: 5,
  },
  '6h': {
    points: 13,
    stepMinutes: 30,
  },
  '24h': {
    points: 13,
    stepMinutes: 120,
  },
  '7d': {
    points: 15,
    stepMinutes: 720,
  },
}

const DEMO_END_TIME = new Date('2026-09-27T14:00:00.000Z').getTime()

export function createDemoServiceMetrics(serviceId: string, range: ServiceMetricsRange) {
  const { points, stepMinutes } = rangeConfig[range]

  const incidentStartIndex = Math.floor(points * 0.65)

  const metrics = Array.from({ length: points }, (_, index) => {
    const timestamp = new Date(
      DEMO_END_TIME - (points - 1 - index) * stepMinutes * 60_000,
    ).toISOString()

    const isCheckout = serviceId === 'checkout-api'

    const incidentProgress = isCheckout
      ? Math.max(0, (index - incidentStartIndex) / Math.max(1, points - 1 - incidentStartIndex))
      : 0

    return {
      timestamp,
      serviceId,

      requestRate: Math.round(18_400 * (1 + Math.sin(index) * 0.025)),

      errorRate: 0.006 + incidentProgress * 0.0421,

      latencyP50Ms: 190 + incidentProgress * 120,

      latencyP95Ms: 320 + incidentProgress * 522,

      latencyP99Ms: 480 + incidentProgress * 740,
    }
  })

  return metricPointSchema.array().parse(metrics)
}
