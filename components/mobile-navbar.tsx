"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeLogo } from "@/components/theme-logo"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export default function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <ThemeLogo height={32} />
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="h-10 w-10"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu" className="h-10 w-10">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="container bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="flex flex-col space-y-4 py-5">
            <Link
              href="/"
              className="text-base md:text-lg font-medium transition-colors hover:text-primary hover:bg-accent/50 py-3 px-4 rounded-md"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/research"
              className="text-base md:text-lg font-medium transition-colors hover:text-primary hover:bg-accent/50 py-3 px-4 rounded-md"
              onClick={toggleMenu}
            >
              Research
            </Link>
            <Link
              href="/people"
              className="text-base md:text-lg font-medium transition-colors hover:text-primary hover:bg-accent/50 py-3 px-4 rounded-md"
              onClick={toggleMenu}
            >
              People & Collaborators
            </Link>
            <Link
              href="/about"
              className="text-base md:text-lg font-medium transition-colors hover:text-primary hover:bg-accent/50 py-3 px-4 rounded-md"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-base md:text-lg font-medium transition-colors hover:text-primary hover:bg-accent/50 py-3 px-4 rounded-md"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="text-base md:text-lg font-medium transition-colors hover:text-primary hover:bg-accent/50 py-3 px-4 rounded-md"
              onClick={toggleMenu}
            >
              Blog
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
