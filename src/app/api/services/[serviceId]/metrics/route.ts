import {
  DEFAULT_SERVICE_METRICS_RANGE,
  serviceMetricsRangeSchema,
} from '@/domain/service/service-metrics.schema'
import { DEMO_WORKSPACE_ID } from '@/server/db/demo/workspaces'
import { getServiceMetrics } from '@/server/services/metric.service'

type RouteContext = {
  params: Promise<{
    serviceId: string
  }>
}

export async function GET(request: Request, { params }: RouteContext) {
  const { serviceId } = await params

  const { searchParams } = new URL(request.url)

  const rangeResult = serviceMetricsRangeSchema.safeParse(
    searchParams.get('range') ?? DEFAULT_SERVICE_METRICS_RANGE,
  )

  if (!rangeResult.success) {
    return Response.json(
      {
        code: 'VALIDATION_ERROR',
        message: 'Unsupported metrics range.',
      },
      {
        status: 400,
      },
    )
  }

  const metrics = await getServiceMetrics(DEMO_WORKSPACE_ID, serviceId, rangeResult.data)

  if (!metrics) {
    return Response.json(
      {
        code: 'NOT_FOUND',
        message: 'Service not found.',
      },
      {
        status: 404,
      },
    )
  }

  return Response.json({
    data: metrics,
  })
}
