"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  Users,
  BarChart3,
  Settings,
  GraduationCapIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Schedule", url: "/schedule", icon: Calendar },
  { title: "Tasks", url: "/tasks", icon: CheckSquare },
  { title: "Study Groups", url: "/groups", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
]

function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()
  const collapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      {/* Logo & Brand */}
      <SidebarHeader
        className={cn(
          "h-16 border-b border-border flex flex-col justify-center transition-all duration-200",
          collapsed ? "px-0" : "px-4"
        )}
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn(
                "flex items-center gap-3 w-full",
                collapsed ? "justify-center" : "px-0"
              )}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                <GraduationCapIcon className="size-5 text-primary-foreground" />
              </div>
              {!collapsed && (
                <div className="animate-fade-in flex flex-col">
                  <span className="font-bold text-foreground leading-none">
                    Smart Study
                  </span>
                  <span className="text-xs text-muted-foreground">Planner</span>
                </div>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent
        className={cn(
          "py-4 transition-all duration-200",
          collapsed ? "px-0" : "px-3"
        )}
      >
        <SidebarMenu className="gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.url
            return (
              <SidebarMenuItem
                key={item.title}
                className={cn("flex w-full", collapsed && "justify-center")}
              >
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className={cn(
                    "flex items-center gap-3 rounded-lg transition-all duration-200 group/item",
                    collapsed ? "justify-center size-10! px-0" : "px-3 py-5",
                    isActive
                      ? "bg-primary! text-primary-foreground! hover:text-primary-foreground!"
                      : "text-muted-foreground hover:bg-primary! hover:text-primary-foreground!"
                  )}
                >
                  <Link
                    href={item.url}
                    className={cn(
                      "flex items-center",
                      collapsed ? "justify-center w-full" : "gap-3"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "size-5! shrink-0 transition-transform duration-200",
                        !isActive && "group-hover/item:scale-110"
                      )}
                    />
                    {!collapsed && (
                      <span className="font-medium animate-fade-in">
                        {item.title}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* User Section */}
      <SidebarFooter
        className={cn(
          "p-3 border-t border-border bg-card/50 transition-all duration-200",
          collapsed && "px-0"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3 p-2 rounded-lg bg-secondary/50 border border-border/50 transition-all duration-200",
            collapsed ? "justify-center p-0 size-10! mx-auto" : "p-2"
          )}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-sm font-semibold text-primary-foreground">
              A
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0 animate-fade-in">
              <p className="text-sm font-medium text-foreground truncate">
                Alex Johnson
              </p>
              <p className="text-[10px] text-muted-foreground truncate leading-tight">
                alex@university.edu
              </p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
