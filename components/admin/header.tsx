"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, Moon, Sun } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"

export function AdminHeader() {
  const { logout } = useAuth()
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b sticky top-0 bg-background z-10">
      <div className="flex items-center">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-bold text-xl">
            Ekspresi <span className="text-primary text-sm">Admin</span>
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={toggleDarkMode} className="gap-2">
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {darkMode ? "Light" : "Dark"}
        </Button>
        <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  )
}

