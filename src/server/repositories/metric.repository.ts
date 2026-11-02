import type { MetricPoint } from '@/domain/event/event.types'
import type { ServiceMetricsRange } from '@/domain/service/service-metrics.types'
import { createDemoServiceMetrics } from '@/server/db/demo/service-metrics'

export function findServiceMetrics(
  serviceId: string,
  range: ServiceMetricsRange,
): readonly MetricPoint[] {
  return createDemoServiceMetrics(serviceId, range)
}
