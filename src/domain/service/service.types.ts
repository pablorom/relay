import { z } from 'zod'

import { environmentSchema, serviceSchema, serviceStatusSchema } from './service.schema'

export type Service = z.infer<typeof serviceSchema>
export type ServiceStatus = z.infer<typeof serviceStatusSchema>
export type Environment = z.infer<typeof environmentSchema>
