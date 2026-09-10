import { z } from 'zod'

import { incidentSeveritySchema, incidentStatusSchema } from './incident.schema'

export type IncidentStatus = z.infer<typeof incidentStatusSchema>

export type IncidentSeverity = z.infer<typeof incidentSeveritySchema>
