import './globals.css'
import { Inter } from 'next/font/google'
import SupabaseProvider from '@/components/providers/SupabaseProvider'
import { AuthProvider } from '@/components/providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ToolHive™ — Neighbourhood Tool Library',
  description: 'Borrow • Lend • Let\'s Build it Together™',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
