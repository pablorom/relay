import { describe, expect, it } from 'vitest'

import { findDeploymentsByServiceId } from './deployment.repository'

describe('deploymentRepository', () => {
  it('returns deployments for the requested service', () => {
    const deployments = findDeploymentsByServiceId('checkout-api')

    expect(deployments.length).toBeGreaterThan(0)

    expect(deployments.every((deployment) => deployment.serviceId === 'checkout-api')).toBe(true)
  })

  it('returns deployments ordered newest first', () => {
    const deployments = findDeploymentsByServiceId('checkout-api')

    for (let index = 1; index < deployments.length; index += 1) {
      const previous = deployments[index - 1]
      const current = deployments[index]

      expect(previous).toBeDefined()
      expect(current).toBeDefined()

      expect(new Date(previous!.startedAt).getTime()).toBeGreaterThanOrEqual(
        new Date(current!.startedAt).getTime(),
      )
    }
  })

  it('returns an empty array for a service with no deployments', () => {
    const deployments = findDeploymentsByServiceId('unknown-service')

    expect(deployments).toEqual([])
  })
})
