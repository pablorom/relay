import { z } from 'zod'

import { metricPointSchema } from '@/domain/event/event.schema'

export const serviceMetricsRangeSchema = z.enum(['1h', '6h', '24h', '7d'])

export const DEFAULT_SERVICE_METRICS_RANGE = '1h'

export const serviceMetricsResponseSchema = z.object({
  data: z.array(metricPointSchema),
})

export function parseServiceMetricsRange(value: unknown) {
  const result = serviceMetricsRangeSchema.safeParse(value)

  return result.success ? result.data : DEFAULT_SERVICE_METRICS_RANGE
}
