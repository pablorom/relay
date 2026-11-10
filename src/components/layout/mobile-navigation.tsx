import { Menu } from 'lucide-react'
import Link from 'next/link'

import { primaryNavigation } from './navigation'

export function MobileNavigation() {
  return (
    <details className="group relative md:hidden">
      <summary
        aria-label="Toggle navigation"
        className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border border-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 [&::-webkit-details-marker]:hidden"
      >
        <Menu aria-hidden="true" size={20} />
      </summary>

      <nav
        aria-label="Mobile navigation"
        className="absolute top-12 left-0 z-50 w-56 rounded-lg border border-neutral-200 bg-white p-2 text-neutral-900 shadow-lg"
      >
        {primaryNavigation.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-neutral-100 focus-visible:outline-2"
          >
            <Icon aria-hidden="true" size={18} />
            {label}
          </Link>
        ))}
      </nav>
    </details>
  )
}
