import { workspaceSchema } from '@/domain/workspace/workspace.schema'

export const DEMO_WORKSPACE_ID = 'ws-acme-cloud'

export const demoWorkspace = workspaceSchema.parse({
  id: DEMO_WORKSPACE_ID,
  name: 'Acme Cloud',
  slug: 'acme-cloud',
  createdAt: '2026-01-01T09:00:00.000Z',
})
