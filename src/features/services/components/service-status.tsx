import type { ServiceStatus as ServiceStatusValue } from '@/domain/service/service.types'

type ServiceStatusProps = {
  status: ServiceStatusValue
}

const labels: Record<ServiceStatusValue, string> = {
  healthy: 'Healthy',
  degraded: 'Degraded',
  down: 'Down',
  maintenance: 'Maintenance',
}

export function ServiceStatus({ status }: ServiceStatusProps) {
  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span aria-hidden="true" className="size-2 rounded-full bg-neutral-500" />

      {labels[status]}
    </span>
  )
}
