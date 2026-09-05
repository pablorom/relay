import { Bell, Search } from 'lucide-react'

export function AppHeader() {
  return (
    <header className="flex h-16 items-center border-b px-6">
      <div className="font-semibold">Relay</div>

      <div className="mx-auto flex w-full max-w-md items-center gap-2 rounded-md border px-3 py-2 text-sm text-neutral-500">
        <Search aria-hidden="true" size={16} />
        <span>Search / ⌘K</span>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span>Help</span>

        <button type="button" aria-label="Notifications">
          <Bell aria-hidden="true" size={18} />
        </button>

        <span>User</span>
      </div>
    </header>
  )
}
