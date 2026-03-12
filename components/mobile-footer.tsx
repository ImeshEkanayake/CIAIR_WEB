import Link from "next/link"
import { ThemeLogo } from "@/components/theme-logo"

export default function MobileFooter() {
  return (
    <footer className="w-full border-t bg-background py-6 px-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <ThemeLogo height={30} className="h-7 w-auto" />
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Ceylon Institute for Artificial Intelligence and Research
        </p>
        <div className="flex gap-4 mt-2">
          <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
