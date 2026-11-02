export function formatPercentage(value: number, fractionDigits = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value)
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatMilliseconds(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}s`
  }

  return `${Math.round(value)}ms`
}

import type { ServiceMetricsRange } from '@/domain/service/service-metrics.types'

export function formatMetricTimestamp(timestamp: string, range: ServiceMetricsRange): string {
  const date = new Date(timestamp)

  if (range === '7d') {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
