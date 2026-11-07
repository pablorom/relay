import type { InvestigationTimelineItem } from '@/domain/investigation/investigation-timeline.types'
import Link from 'next/link'

type InvestigationTimelineProps = {
  items: readonly InvestigationTimelineItem[]
}

function formatTimelineTimestamp(timestamp: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  }).format(new Date(timestamp))
}

function getTimelineContent(item: InvestigationTimelineItem): {
  title: string
  description: string
} {
  switch (item.kind) {
    case 'deployment':
      return {
        title: `Deployment ${item.version}`,
        description: 'Deployment event',
      }

    case 'incident':
      return {
        title: `${item.incidentId} — ${item.title}`,
        description: 'Incident started',
      }

    case 'metric-anomaly':
      return {
        title: `Metric anomaly: ${item.metric}`,
        description: `Recorded value: ${item.value}`,
      }

    default: {
      const exhaustive: never = item
      return exhaustive
    }
  }
}

export function InvestigationTimeline({ items }: InvestigationTimelineProps) {
  return (
    <section
      aria-labelledby="investigation-timeline-heading"
      className="rounded-lg border border-neutral-200 p-6"
    >
      <div className="mb-6">
        <h2 id="investigation-timeline-heading" className="text-lg font-semibold">
          Investigation timeline
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          All recorded operational events affecting this service
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-neutral-500">
          No investigation events are available for this service.
        </p>
      ) : (
        <ol className="space-y-0">
          {items.map((item, index) => {
            const content = getTimelineContent(item)
            const isLast = index === items.length - 1

            return (
              <li key={item.id} className="flex gap-4">
                <div aria-hidden="true" className="flex w-4 shrink-0 flex-col items-center">
                  <div className="mt-1.5 h-3 w-3 rounded-full border-2 border-neutral-700 bg-white" />

                  {!isLast && <div className="min-h-12 w-px flex-1 bg-neutral-200" />}
                </div>

                <div className={isLast ? 'min-w-0 flex-1' : 'min-w-0 flex-1 pb-6'}>
                  <time dateTime={item.timestamp} className="text-xs text-neutral-500">
                    {formatTimelineTimestamp(item.timestamp)}
                  </time>

                  <h3 className="mt-1 font-medium">
                    {item.kind === 'incident' ? (
                      <Link
                        href={`/incidents/${encodeURIComponent(item.recordId)}`}
                        className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
                      >
                        {content.title}
                      </Link>
                    ) : (
                      content.title
                    )}
                  </h3>

                  <p className="mt-1 text-sm text-neutral-500">{content.description}</p>
                </div>
              </li>
            )
          })}
        </ol>
      )}
    </section>
  )
}
