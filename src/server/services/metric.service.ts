import type { MetricPoint } from '@/domain/event/event.types'
import type { ServiceMetricsRange } from '@/domain/service/service-metrics.types'
import { findServiceMetrics } from '@/server/repositories/metric.repository'
import { findServiceById } from '@/server/repositories/service.repository'

export async function getServiceMetrics(
  workspaceId: string,
  serviceId: string,
  range: ServiceMetricsRange,
): Promise<readonly MetricPoint[] | null> {
  const service = findServiceById(workspaceId, serviceId)

  if (!service) {
    return null
  }

  return findServiceMetrics(service.id, range)
}
