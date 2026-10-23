type MetricCardProps = {
  label: string
  value: string
  description?: string
}

export function MetricCard({ label, value, description }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-neutral-200 p-4">
      <div className="text-sm text-neutral-500">{label}</div>

      <div className="mt-2 text-2xl font-semibold">{value}</div>

      {description ? <div className="mt-1 text-sm text-neutral-500">{description}</div> : null}
    </div>
  )
}
