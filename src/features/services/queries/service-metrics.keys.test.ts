import { describe, expect, it } from 'vitest'

import { serviceMetricsKeys } from './service-metrics.keys'

describe('serviceMetricsKeys', () => {
  it('creates a key scoped by service and range', () => {
    expect(serviceMetricsKeys.detail('checkout-api', '6h')).toEqual([
      'service-metrics',
      'checkout-api',
      '6h',
    ])
  })
})
