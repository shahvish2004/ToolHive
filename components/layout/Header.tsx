'use client'
import { Bell, Search, Menu } from 'lucide-react'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import ToolHiveLogo from '@/components/brand/ToolHiveLogo'

interface HeaderProps {
  title: string
  subtitle?: string
  onMenuClick?: () => void
}

export default function Header({ title, subtitle, onMenuClick }: HeaderProps) {
  const { user, signOut } = useAuth()
  const router = useRouter()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 flex-shrink-0">
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left side: hamburger + logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onMenuClick}
              className="p-2 text-gray-500 hover:text-amber-500 transition-colors rounded-lg hover:bg-gray-100"
              aria-label="Toggle sidebar"
            >
              <Menu size={22} />
            </button>
            <ToolHiveLogo size="small" />
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-deep-slate leading-tight">ToolHive™</p>
              <p className="text-xs text-construction-amber leading-tight">Community Tool Sharing</p>
            </div>
          </div>

          {/* Page Title - centered */}
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold text-deep-slate leading-tight">{title}</h1>
            {subtitle && (
              <p className="text-xs text-gray-500">{subtitle}</p>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search tools..."
                  className="pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-construction-amber focus:border-transparent w-48"
                />
              </div>
            </div>

            <button
              onClick={() => router.push('/shop')}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-construction-amber/10 text-construction-amber text-xs font-medium rounded-lg hover:bg-construction-amber/20 transition-colors"
            >
              🪙 <span>25 TT</span>
            </button>

            <button className="relative p-2 text-gray-500 hover:text-construction-amber transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>

            <div className="relative group">
              <button className="flex items-center justify-center w-9 h-9 bg-construction-amber text-deep-slate rounded-full hover:opacity-90 transition-opacity font-bold text-sm">
                {(user?.user_metadata?.name || user?.email || 'D')[0].toUpperCase()}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1 px-2">
                  {user && (
                    <p className="text-xs text-gray-500 px-2 py-1 truncate">{user.email}</p>
                  )}
                  <button
                    onClick={signOut}
                    className="block w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}