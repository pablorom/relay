import type { Incident } from '@/domain/incident/incident.types'
import { demoIncidents } from '@/server/db/demo/incidents'

export function findActiveIncidentsByWorkspaceId(workspaceId: string): readonly Incident[] {
  return demoIncidents.filter(
    (incident) => incident.workspaceId === workspaceId && incident.status !== 'resolved',
  )
}
