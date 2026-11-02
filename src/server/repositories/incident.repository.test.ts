import { describe, expect, it } from 'vitest'

import { DEMO_WORKSPACE_ID } from '@/server/db/demo/workspaces'

import { findIncidentsByServiceId } from './incident.repository'

describe('incidentRepository', () => {
  it('returns incidents affecting the requested service', () => {
    const incidents = findIncidentsByServiceId(DEMO_WORKSPACE_ID, 'checkout-api')

    expect(incidents.length).toBeGreaterThan(0)

    expect(
      incidents.every((incident) => incident.affectedServiceIds.includes('checkout-api')),
    ).toBe(true)
  })

  it('includes INC-1042 for checkout-api', () => {
    const incidents = findIncidentsByServiceId(DEMO_WORKSPACE_ID, 'checkout-api')

    expect(incidents.some((incident) => incident.number === 'INC-1042')).toBe(true)
  })

  it('does not return incidents from another workspace', () => {
    const incidents = findIncidentsByServiceId('another-workspace', 'checkout-api')

    expect(incidents).toEqual([])
  })

  it('returns an empty array for a service with no incidents', () => {
    const incidents = findIncidentsByServiceId(DEMO_WORKSPACE_ID, 'unknown-service')

    expect(incidents).toEqual([])
  })
})
