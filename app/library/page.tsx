'use client'

import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function LibraryPage() {
  const router = useRouter()

  return (
    <DashboardLayout title="Library Hub" subtitle="Browse all available tools">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-deep-slate mb-2">Library Hub</h2>
          <p className="text-gray-500 mb-6">Browse and borrow tools from your community. The full library is available in the Tools section.</p>
          <button
            onClick={() => router.push('/tools')}
            className="bg-construction-amber text-white font-bold px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors shadow-md"
          >
            Browse Tools Library
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
