import { describe, expect, it } from 'vitest'

import { metricPointSchema } from './event.schema'

const validMetricPoint = {
  timestamp: '2026-09-10T14:42:00.000Z',
  serviceId: 'svc_checkout',
  requestRate: 18400,
  errorRate: 0.0481,
  latencyP50Ms: 231,
  latencyP95Ms: 842,
  latencyP99Ms: 1210,
}

describe('metricPointSchema', () => {
  it('accepts a valid metric point', () => {
    expect(metricPointSchema.safeParse(validMetricPoint).success).toBe(true)
  })

  it('rejects an error rate above 100%', () => {
    const result = metricPointSchema.safeParse({
      ...validMetricPoint,
      errorRate: 1.2,
    })

    expect(result.success).toBe(false)
  })

  it('rejects negative latency', () => {
    const result = metricPointSchema.safeParse({
      ...validMetricPoint,
      latencyP95Ms: -10,
    })

    expect(result.success).toBe(false)
  })
})
