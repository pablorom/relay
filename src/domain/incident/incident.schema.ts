import { z } from 'zod'

export const incidentStatusSchema = z.enum([
  'investigating',
  'identified',
  'monitoring',
  'resolved',
])

export const incidentSeveritySchema = z.enum(['SEV-1', 'SEV-2', 'SEV-3', 'SEV-4'])
