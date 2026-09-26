import { z } from 'zod'

import { userRoleSchema, userSchema } from './user.schema'

export type User = z.infer<typeof userSchema>
export type UserRole = z.infer<typeof userRoleSchema>
