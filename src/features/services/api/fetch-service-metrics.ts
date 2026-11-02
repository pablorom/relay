import { serviceMetricsResponseSchema } from '@/domain/service/service-metrics.schema'
import type { ServiceMetricsRange } from '@/domain/service/service-metrics.types'

export async function fetchServiceMetrics(serviceId: string, range: ServiceMetricsRange) {
  const response = await fetch(
    `/api/services/${encodeURIComponent(serviceId)}/metrics?range=${range}`,
  )

  if (!response.ok) {
    throw new Error('Unable to load service metrics.')
  }

  const payload: unknown = await response.json()

  return serviceMetricsResponseSchema.parse(payload).data
}
