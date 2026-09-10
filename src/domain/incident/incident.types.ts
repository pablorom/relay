import { z } from 'zod'

import {
  incidentEventSchema,
  incidentEventTypeSchema,
  incidentSchema,
  incidentSeveritySchema,
  incidentStatusSchema,
} from './incident.schema'

export type Incident = z.infer<typeof incidentSchema>
export type IncidentStatus = z.infer<typeof incidentStatusSchema>
export type IncidentSeverity = z.infer<typeof incidentSeveritySchema>
export type IncidentEvent = z.infer<typeof incidentEventSchema>
export type IncidentEventType = z.infer<typeof incidentEventTypeSchema>
