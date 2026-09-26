import { z } from 'zod'

import { environmentSchema } from '@/domain/service/service.schema'

export const deploymentStatusSchema = z.enum([
  'pending',
  'running',
  'succeeded',
  'failed',
  'rolled_back',
])

export const deploymentSchema = z.object({
  id: z.string().min(1),
  serviceId: z.string().min(1),
  version: z.string().min(1),
  environment: environmentSchema,
  commitSha: z.string().min(1),
  deployedBy: z.string().min(1),
  status: deploymentStatusSchema,
  startedAt: z.iso.datetime(),
  completedAt: z.iso.datetime().nullable(),
})
