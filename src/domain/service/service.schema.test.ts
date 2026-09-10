import { describe, expect, it } from 'vitest'

import { serviceSchema } from './service.schema'

const validService = {
  id: 'svc_checkout',
  name: 'checkout-api',
  description: 'Handles checkout sessions and order creation',
  status: 'degraded',
  teamId: 'team_payments',
  workspaceId: 'ws_acme',
  environment: 'production',
  repositoryUrl: 'https://github.com/acme/checkout-api',
  createdAt: '2026-01-10T09:00:00.000Z',
}

describe('serviceSchema', () => {
  it('accepts a valid service', () => {
    expect(serviceSchema.safeParse(validService).success).toBe(true)
  })

  it('rejects an unknown service status', () => {
    const result = serviceSchema.safeParse({
      ...validService,
      status: 'exploding',
    })

    expect(result.success).toBe(false)
  })
})
