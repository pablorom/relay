import { describe, expect, it } from 'vitest'

import { incidentSeveritySchema, incidentStatusSchema } from './incident.schema'

describe('incidentStatusSchema', () => {
  it('accepts a valid incident status', () => {
    const result = incidentStatusSchema.safeParse('investigating')

    expect(result.success).toBe(true)
  })

  it('rejects an unknown incident status', () => {
    const result = incidentStatusSchema.safeParse('banana')

    expect(result.success).toBe(false)
  })
})

describe('incidentSeveritySchema', () => {
  it('accepts valid severities', () => {
    expect(incidentSeveritySchema.safeParse('SEV-1').success).toBe(true)
  })

  it('rejects unknown severities', () => {
    expect(incidentSeveritySchema.safeParse('SEV-5').success).toBe(false)
  })
})
