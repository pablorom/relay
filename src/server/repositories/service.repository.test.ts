import { describe, expect, it } from 'vitest'

import { DEMO_WORKSPACE_ID } from '@/server/db/demo/workspaces'

import { findServiceById, findServicesByWorkspaceId } from './service.repository'

describe('serviceRepository', () => {
  it('returns services from the requested workspace', () => {
    const services = findServicesByWorkspaceId(DEMO_WORKSPACE_ID)

    expect(services).toHaveLength(12)
  })

  it('finds a service by id', () => {
    const service = findServiceById(DEMO_WORKSPACE_ID, 'checkout-api')

    expect(service?.name).toBe('checkout-api')
  })

  it('returns null for an unknown service', () => {
    const service = findServiceById(DEMO_WORKSPACE_ID, 'unknown-service')

    expect(service).toBeNull()
  })

  it('does not return a service from another workspace', () => {
    const service = findServiceById('another-workspace', 'checkout-api')

    expect(service).toBeNull()
  })
})
