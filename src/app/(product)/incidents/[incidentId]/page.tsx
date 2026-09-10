type IncidentPageProps = {
  params: Promise<{
    incidentId: string
  }>
}

export default async function IncidentPage({ params }: IncidentPageProps) {
  const { incidentId } = await params

  return (
    <div>
      <p className="text-sm text-neutral-500">Incidents</p>

      <h1 className="mt-2 text-2xl font-semibold">{incidentId}</h1>
    </div>
  )
}
