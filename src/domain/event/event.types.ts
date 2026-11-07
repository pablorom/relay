import { z } from 'zod'

import { metricPointSchema, systemEventSchema, systemEventTypeSchema } from './event.schema'

export type SystemEvent = z.infer<typeof systemEventSchema>

export type SystemEventType = z.infer<typeof systemEventTypeSchema>

export type MetricPoint = z.infer<typeof metricPointSchema>

export type MetricKind = 'requestRate' | 'errorRate' | 'latencyP95Ms'
