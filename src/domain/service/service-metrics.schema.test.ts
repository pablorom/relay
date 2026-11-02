import { describe, expect, it } from 'vitest'

import { parseServiceMetricsRange, serviceMetricsRangeSchema } from './service-metrics.schema'

describe('serviceMetricsRangeSchema', () => {
  it('accepts supported ranges', () => {
    expect(serviceMetricsRangeSchema.safeParse('6h').success).toBe(true)
  })

  it('rejects unsupported ranges', () => {
    expect(serviceMetricsRangeSchema.safeParse('2h').success).toBe(false)
  })
})

describe('parseServiceMetricsRange', () => {
  it('returns a valid range', () => {
    expect(parseServiceMetricsRange('24h')).toBe('24h')
  })

  it('falls back to 1h for invalid input', () => {
    expect(parseServiceMetricsRange('banana')).toBe('1h')
  })
})
