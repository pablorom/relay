import { incidentSchema } from '@/domain/incident/incident.schema'

export const demoIncidents = incidentSchema.array().parse([
  {
    id: 'inc-1042',
    number: 'INC-1042',
    title: 'Checkout failures in EU region',
    description: 'Checkout requests are failing at an elevated rate in the EU region.',
    severity: 'SEV-1',
    status: 'investigating',
    commanderId: 'user-maya',
    startedAt: '2026-09-27T13:34:00.000Z',
    resolvedAt: null,
    createdBy: 'user-alex',
    workspaceId: 'ws-acme-cloud',
    affectedServiceIds: ['checkout-api', 'payments-api'],
    affectedRegions: ['eu-west'],
  },
])
