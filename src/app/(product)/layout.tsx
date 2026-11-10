import { AppHeader } from '@/components/layout/app-header'
import { AppSidebar } from '@/components/layout/app-sidebar'

type ProductLayoutProps = {
  children: React.ReactNode
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return (
    <div className="flex min-h-screen min-w-0">
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />

        <main className="min-w-0 flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
