import type { IncidentStatus } from './incident.types'

const allowedTransitions: Record<IncidentStatus, readonly IncidentStatus[]> = {
  investigating: ['identified'],
  identified: ['monitoring'],
  monitoring: ['investigating', 'resolved'],
  resolved: [],
}

export function canTransitionIncident(current: IncidentStatus, next: IncidentStatus): boolean {
  return allowedTransitions[current].includes(next)
}
