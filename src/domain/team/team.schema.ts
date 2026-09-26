import { z } from 'zod'

export const teamSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  workspaceId: z.string().min(1),
})
