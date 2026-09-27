import type { Team } from '@/domain/team/team.types'
import { demoTeams } from '@/server/db/demo/teams'

export function findTeamById(workspaceId: string, teamId: string): Team | null {
  return demoTeams.find((team) => team.workspaceId === workspaceId && team.id === teamId) ?? null
}
