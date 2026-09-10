type ServicePageProps = {
  params: Promise<{
    serviceId: string
  }>
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { serviceId } = await params

  return (
    <div>
      <p className="text-sm text-neutral-500">Services</p>

      <h1 className="mt-2 text-2xl font-semibold">{serviceId}</h1>
    </div>
  )
}
