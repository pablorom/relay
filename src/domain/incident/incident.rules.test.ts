import { describe, expect, it } from 'vitest'

import { canTransitionIncident } from './incident.rules'

describe('canTransitionIncident', () => {
  it('allows investigating incidents to become identified', () => {
    expect(canTransitionIncident('investigating', 'identified')).toBe(true)
  })

  it('allows identified incidents to become monitoring', () => {
    expect(canTransitionIncident('identified', 'monitoring')).toBe(true)
  })

  it('allows monitoring incidents to become resolved', () => {
    expect(canTransitionIncident('monitoring', 'resolved')).toBe(true)
  })

  it('allows monitoring incidents to return to investigating', () => {
    expect(canTransitionIncident('monitoring', 'investigating')).toBe(true)
  })

  it('does not allow resolved incidents to become investigating', () => {
    expect(canTransitionIncident('resolved', 'investigating')).toBe(false)
  })

  it('does not allow an incident to transition to its current status', () => {
    expect(canTransitionIncident('investigating', 'investigating')).toBe(false)
  })
})
