import { Suspense } from "react"
import DesktopHome from "@/components/home/desktop-home"
import MobileHome from "@/components/home/mobile-home"
import ClientResponsiveWrapper from "@/components/client-responsive-wrapper"

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientResponsiveWrapper
        desktopComponent={<DesktopHome />}
        mobileComponent={<MobileHome />}
        mobileBreakpoint={720}
      />
    </Suspense>
  )
}
