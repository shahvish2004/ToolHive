'use client'

import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

interface DashboardLayoutProps {
    title: string
    subtitle?: string
    children?: React.ReactNode
}

export default function DashboardLayout({ title, subtitle, children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
        <div className="flex h-screen overflow-hidden" style={{ background: "#1E293B" }}>
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                        <Header
                                    title={title}
                                    subtitle={subtitle}
                                    onMenuClick={() => setSidebarOpen(prev => !prev)}
                                  />
                        <main className="flex-1 overflow-y-auto p-6">
                          {children}
                        </main>
                </div>
        </div>
      )
}
