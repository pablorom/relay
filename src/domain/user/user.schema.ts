import { z } from 'zod'

export const userRoleSchema = z.enum(['viewer', 'engineer', 'admin'])

export const userSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.email(),
  avatarUrl: z.url().nullable(),
  role: userRoleSchema,
  workspaceId: z.string().min(1),
})
