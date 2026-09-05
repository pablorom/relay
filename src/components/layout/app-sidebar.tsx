import { Activity, Boxes, CalendarClock, Rocket, Settings, TriangleAlert } from 'lucide-react'
import Link from 'next/link'

const navigation = [
  {
    label: 'Overview',
    href: '/overview',
    icon: Activity,
  },
  {
    label: 'Services',
    href: '/services',
    icon: Boxes,
  },
  {
    label: 'Incidents',
    href: '/incidents',
    icon: TriangleAlert,
  },
  {
    label: 'Events',
    href: '/events',
    icon: CalendarClock,
  },
  {
    label: 'Deployments',
    href: '/deployments',
    icon: Rocket,
  },
]

export function AppSidebar() {
  return (
    <aside className="flex min-h-screen w-60 flex-col border-r">
      <div className="border-b p-4">
        <span className="font-semibold">Acme Cloud</span>
      </div>

      <nav aria-label="Primary navigation" className="flex flex-1 flex-col gap-1 p-3">
        {navigation.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-neutral-100"
          >
            <Icon aria-hidden="true" size={18} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t p-3">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-neutral-100"
        >
          <Settings aria-hidden="true" size={18} />
          Settings
        </Link>
      </div>
    </aside>
  )
}
