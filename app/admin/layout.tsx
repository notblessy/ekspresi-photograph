import type { ReactNode } from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { AdminProtectedRoute } from "@/components/admin-protected-route"

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <AdminProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <AdminHeader />
        <div className="flex flex-1">
          <AdminSidebar />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </AdminProtectedRoute>
  )
}

