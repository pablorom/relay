import { Bell, Search } from 'lucide-react'

import { MobileNavigation } from './mobile-navigation'

export function AppHeader() {
  return (
    <header className="flex h-16 min-w-0 items-center gap-3 border-b border-neutral-200 px-4 sm:px-6">
      <MobileNavigation />

      <div className="shrink-0 font-semibold">Relay</div>

      <div className="mx-auto hidden w-full max-w-md items-center gap-2 rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-500 md:flex">
        <Search aria-hidden="true" size={16} />
        <span>Search / ⌘K</span>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-3 text-sm">
        <span className="hidden md:inline">Help</span>

        <button
          type="button"
          aria-label="Notifications"
          className="rounded-md p-2 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <Bell aria-hidden="true" size={18} />
        </button>

        <span className="hidden md:inline">User</span>
      </div>
    </header>
  )
}
