import { describe, expect, it } from 'vitest'

import { DEMO_WORKSPACE_ID } from '@/server/db/demo/workspaces'

import { getServiceDetails } from './service.service'

describe('getServiceDetails', () => {
  it('returns a service together with its team', async () => {
    const result = await getServiceDetails(DEMO_WORKSPACE_ID, 'checkout-api')

    expect(result?.service.name).toBe('checkout-api')
    expect(result?.team?.name).toBe('Payments Platform')
  })

  it('returns null when the service does not exist', async () => {
    const result = await getServiceDetails(DEMO_WORKSPACE_ID, 'missing-service')

    expect(result).toBeNull()
  })

  it('includes deployments for the service', async () => {
    const result = await getServiceDetails(DEMO_WORKSPACE_ID, 'checkout-api')

    expect(result?.deployments[0]?.version).toBe('v2.18.4')
  })

  it('includes incidents affecting the service', async () => {
    const result = await getServiceDetails(DEMO_WORKSPACE_ID, 'checkout-api')

    expect(result?.incidents.some((incident) => incident.number === 'INC-1042')).toBe(true)
  })

  it('includes deployments for the service', async () => {
    const result = await getServiceDetails(DEMO_WORKSPACE_ID, 'checkout-api')

    expect(result).not.toBeNull()

    expect(result?.deployments[0]?.version).toBe('v2.18.4')
  })

  it('includes incidents affecting the service', async () => {
    const result = await getServiceDetails(DEMO_WORKSPACE_ID, 'checkout-api')

    expect(result).not.toBeNull()

    expect(result?.incidents.some((incident) => incident.number === 'INC-1042')).toBe(true)
  })

  it('does not include deployments from another service', async () => {
    const result = await getServiceDetails(DEMO_WORKSPACE_ID, 'checkout-api')

    expect(result?.deployments.every((deployment) => deployment.serviceId === 'checkout-api')).toBe(
      true,
    )
  })

  it('returns null when the service does not exist', async () => {
    const result = await getServiceDetails(DEMO_WORKSPACE_ID, 'unknown-service')

    expect(result).toBeNull()
  })
})
