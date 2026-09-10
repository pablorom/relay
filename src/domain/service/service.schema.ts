import { z } from 'zod'

export const serviceStatusSchema = z.enum(['healthy', 'degraded', 'down', 'maintenance'])

export const environmentSchema = z.enum(['production', 'staging', 'development'])

export const serviceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  status: serviceStatusSchema,
  teamId: z.string().min(1),
  workspaceId: z.string().min(1),
  environment: environmentSchema,
  repositoryUrl: z.url().nullable(),
  createdAt: z.iso.datetime(),
})
