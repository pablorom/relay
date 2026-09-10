import { environmentSchema } from '@/domain/service/service.schema'
import { z } from 'zod'

export const systemEventTypeSchema = z.enum(['http_request', 'job', 'database', 'authentication'])

export const systemEventSchema = z.object({
  id: z.string().min(1),
  timestamp: z.iso.datetime(),
  serviceId: z.string().min(1),
  type: systemEventTypeSchema,
  environment: environmentSchema,
  region: z.string().min(1),
  method: z.string().nullable(),
  path: z.string().nullable(),
  statusCode: z.number().int().min(100).max(599).nullable(),
  durationMs: z.number().nonnegative(),
  traceId: z.string().min(1),
  metadata: z.record(z.string(), z.unknown()),
})

export const metricPointSchema = z.object({
  timestamp: z.iso.datetime(),
  serviceId: z.string().min(1),
  requestRate: z.number().nonnegative(),
  errorRate: z.number().min(0).max(1),
  latencyP50Ms: z.number().nonnegative(),
  latencyP95Ms: z.number().nonnegative(),
  latencyP99Ms: z.number().nonnegative(),
})
