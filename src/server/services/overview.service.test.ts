import { describe, expect, it } from 'vitest'

import { DEMO_WORKSPACE_ID } from '@/server/db/demo/workspaces'

import { getOverviewData } from './overview.service'

describe('getOverviewData', () => {
  it('returns the demo workspace summary', async () => {
    const result = await getOverviewData(DEMO_WORKSPACE_ID)

    expect(result.summary.totalServices).toBe(12)
    expect(result.summary.healthyServices).toBe(10)
    expect(result.summary.activeIncidents).toBe(1)
  })

  it('includes the active SEV-1 incident', async () => {
    const result = await getOverviewData(DEMO_WORKSPACE_ID)

    expect(result.activeIncidents[0]?.number).toBe('INC-1042')
  })
})
