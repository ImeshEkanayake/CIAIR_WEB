import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ResponsiveLayout from "@/components/responsive-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CIAIR_WEB",
  description: "Advancing AI and Machine Learning research for societal improvement",
  generator: 'v0.dev',
  icons: {
      icon: [
        // { url: "/favicon.ico" },
        { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/images/favicon-192.png", sizes: "192x192", type: "image/png" }
      ],
      apple: { url: "/images/favicon-192.png", sizes: "192x192" }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="theme-transition" suppressHydrationWarning>
      <head>
        {/* JSON-LD for your Organization logo in Google’s Knowledge Panel */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: "https://ciair.org",
              logo: "https://ciair.org/images/favicon-192.png"
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ResponsiveLayout>{children}</ResponsiveLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
