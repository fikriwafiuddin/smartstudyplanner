import AppHeader from "@/components/layout/AppHeader"
import AppSidebar from "@/components/layout/AppSidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ReactNode } from "react"
import DeadlineAlerts from "./_components/DeadlineAlerts"
import GlobalFocusTimer from "./_components/GlobalFocusTimer"

export default function ProtectedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <main className="flex-1">
          <AppHeader />
          <DeadlineAlerts />
          <GlobalFocusTimer />
          <div className="p-6 space-y-6">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
