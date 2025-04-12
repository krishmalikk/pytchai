import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { AuthProvider } from "@/components/AuthContext"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auto-Pitch Generator',
  description: 'Transform your startup idea into a professional pitch deck in minutes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
} 