import { teamSchema } from '@/domain/team/team.schema'

import { DEMO_WORKSPACE_ID } from './workspaces'

export const demoTeams = teamSchema.array().parse([
  {
    id: 'team-payments',
    name: 'Payments Platform',
    slug: 'payments',
    workspaceId: DEMO_WORKSPACE_ID,
  },
  {
    id: 'team-identity',
    name: 'Identity',
    slug: 'identity',
    workspaceId: DEMO_WORKSPACE_ID,
  },
  {
    id: 'team-platform',
    name: 'Platform',
    slug: 'platform',
    workspaceId: DEMO_WORKSPACE_ID,
  },
  {
    id: 'team-growth',
    name: 'Growth',
    slug: 'growth',
    workspaceId: DEMO_WORKSPACE_ID,
  },
])
