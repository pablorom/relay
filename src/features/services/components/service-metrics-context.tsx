'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

type ServiceMetricsContextValue = {
  hoveredTimestamp: string | null
  setHoveredTimestamp: (timestamp: string | null) => void
}

const ServiceMetricsContext = createContext<ServiceMetricsContextValue | null>(null)

type ServiceMetricsProviderProps = {
  children: ReactNode
}

export function ServiceMetricsProvider({ children }: ServiceMetricsProviderProps) {
  const [hoveredTimestamp, setHoveredTimestamp] = useState<string | null>(null)

  return (
    <ServiceMetricsContext.Provider
      value={{
        hoveredTimestamp,
        setHoveredTimestamp,
      }}
    >
      {children}
    </ServiceMetricsContext.Provider>
  )
}

export function useServiceMetricsContext() {
  const context = useContext(ServiceMetricsContext)

  if (!context) {
    throw new Error('useServiceMetricsContext must be used within ServiceMetricsProvider')
  }

  return context
}
