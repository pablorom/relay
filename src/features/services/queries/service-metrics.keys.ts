import type { ServiceMetricsRange } from '@/domain/service/service-metrics.types'

export const serviceMetricsKeys = {
  all: ['service-metrics'] as const,

  detail: (serviceId: string, range: ServiceMetricsRange) =>
    [...serviceMetricsKeys.all, serviceId, range] as const,
}
