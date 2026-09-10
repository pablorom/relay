import { z } from 'zod'

import { deploymentSchema, deploymentStatusSchema } from './deployment.schema'

export type Deployment = z.infer<typeof deploymentSchema>
export type DeploymentStatus = z.infer<typeof deploymentStatusSchema>
