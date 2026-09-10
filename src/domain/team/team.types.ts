import { z } from 'zod'

import { teamSchema } from './team.schema'

export type Team = z.infer<typeof teamSchema>
