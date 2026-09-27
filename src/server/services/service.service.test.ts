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
})
