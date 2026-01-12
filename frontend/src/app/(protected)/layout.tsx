import AppSidebar from "@/components/layout/AppSidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ReactNode } from "react"

export default function ProtectedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
