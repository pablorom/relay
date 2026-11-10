import { Activity, Boxes, CalendarClock, Rocket, Settings, TriangleAlert } from 'lucide-react'

export const primaryNavigation = [
  { label: 'Overview', href: '/overview', icon: Activity },
  { label: 'Services', href: '/services', icon: Boxes },
  { label: 'Incidents', href: '/incidents', icon: TriangleAlert },
  { label: 'Events', href: '/events', icon: CalendarClock },
  { label: 'Deployments', href: '/deployments', icon: Rocket },
  { label: 'Settings', href: '/settings', icon: Settings },
] as const
