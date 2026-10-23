import { deploymentSchema } from '@/domain/deployment/deployment.schema'

export const demoDeployments = deploymentSchema.array().parse([
  {
    id: 'dep-checkout-2184',
    serviceId: 'checkout-api',
    version: 'v2.18.4',
    environment: 'production',
    commitSha: '7c8f12a',
    deployedBy: 'user-alex',
    status: 'succeeded',
    startedAt: '2026-09-27T13:28:00.000Z',
    completedAt: '2026-09-27T13:31:00.000Z',
  },
  {
    id: 'dep-payments-4112',
    serviceId: 'payments-api',
    version: 'v4.11.2',
    environment: 'production',
    commitSha: 'a18f992',
    deployedBy: 'user-maya',
    status: 'succeeded',
    startedAt: '2026-09-27T13:16:00.000Z',
    completedAt: '2026-09-27T13:19:00.000Z',
  },
  {
    id: 'dep-auth-371',
    serviceId: 'auth-service',
    version: 'v3.7.1',
    environment: 'production',
    commitSha: '31eada2',
    deployedBy: 'user-daniel',
    status: 'succeeded',
    startedAt: '2026-09-27T12:20:00.000Z',
    completedAt: '2026-09-27T12:23:00.000Z',
  },
])
