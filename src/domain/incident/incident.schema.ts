import { z } from 'zod'

export const incidentStatusSchema = z.enum([
  'investigating',
  'identified',
  'monitoring',
  'resolved',
])

export const incidentSeveritySchema = z.enum(['SEV-1', 'SEV-2', 'SEV-3', 'SEV-4'])

export const incidentSchema = z.object({
  id: z.string().min(1),
  number: z.string().min(1),
  title: z.string().min(3).max(160),
  description: z.string(),
  severity: incidentSeveritySchema,
  status: incidentStatusSchema,
  commanderId: z.string().min(1).nullable(),
  startedAt: z.iso.datetime(),
  resolvedAt: z.iso.datetime().nullable(),
  createdBy: z.string().min(1),
  workspaceId: z.string().min(1),
  affectedServiceIds: z.array(z.string().min(1)),
  affectedRegions: z.array(z.string().min(1)),
})

export const incidentEventTypeSchema = z.enum([
  'alert',
  'status_change',
  'note',
  'deployment',
  'assignment',
  'rollback',
  'resolution',
])

export const incidentEventSchema = z.object({
  id: z.string().min(1),
  incidentId: z.string().min(1),
  type: incidentEventTypeSchema,
  message: z.string().min(1),
  createdBy: z.string().min(1).nullable(),
  createdAt: z.iso.datetime(),
  metadata: z.record(z.string(), z.unknown()),
})
