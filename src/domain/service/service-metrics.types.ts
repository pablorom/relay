import { z } from 'zod'

import { serviceMetricsRangeSchema, serviceMetricsResponseSchema } from './service-metrics.schema'

export type ServiceMetricsRange = z.infer<typeof serviceMetricsRangeSchema>

export type ServiceMetricsResponse = z.infer<typeof serviceMetricsResponseSchema>
