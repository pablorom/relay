import { z } from 'zod'

import { workspaceSchema } from './workspace.schema'

export type Workspace = z.infer<typeof workspaceSchema>
