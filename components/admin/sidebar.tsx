"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { BarChart3, CreditCard, DollarSign, Home, Settings, ShoppingCart, UsersRound } from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: Home,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: UsersRound,
    },
    {
      name: "Plans",
      href: "/admin/plans",
      icon: ShoppingCart,
    },
    {
      name: "Transactions",
      href: "/admin/transactions",
      icon: CreditCard,
    },
    {
      name: "Subscriptions",
      href: "/admin/subscriptions",
      icon: DollarSign,
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="w-64 border-r bg-muted/20 hidden md:block">
      <ScrollArea className="h-full py-6">
        <div className="px-3 space-y-1">
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start gap-2 text-sm", pathname === route.href && "bg-muted")}
              >
                <route.icon className="h-4 w-4" />
                {route.name}
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

