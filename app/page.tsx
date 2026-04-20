'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function HomePage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [tokenBalance] = useState(25.00)

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'there'

  if (loading) {
    return (
      <div className="min-h-screen bg-toolhive-gray flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-construction-amber border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading ToolHive...</p>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout title="Home" subtitle="Welcome to ToolHive">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Welcome Hero */}
        <div className="bg-gradient-to-r from-construction-amber to-yellow-400 rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-extrabold mb-1">Hey, {userName}!</h1>
          <p className="text-lg opacity-90 mb-6">Welcome back to ToolHive. Your tools, your community.</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => router.push('/tools')}
              className="bg-white text-construction-amber font-bold px-5 py-2 rounded-lg hover:bg-gray-100 transition-colors shadow"
            >
              Browse Tools
            </button>
            <button
              onClick={() => router.push('/hivematch')}
              className="bg-white/20 text-white font-semibold px-5 py-2 rounded-lg hover:bg-white/30 transition-colors border border-white/40"
            >
              HiveMatch
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-construction-amber">{tokenBalance.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">ToolTokens</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-blue-600">0</p>
            <p className="text-xs text-gray-500 mt-1">Tools Listed</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-green-600">0</p>
            <p className="text-xs text-gray-500 mt-1">Active Borrows</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-purple-600">0</p>
            <p className="text-xs text-gray-500 mt-1">Community Matches</p>
          </div>
        </div>

        {/* Token Shop */}
        <div className="bg-white rounded-2xl shadow-md border border-amber-200 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-400 to-yellow-300 px-8 py-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-white drop-shadow">Token Shop</h2>
              <p className="text-white/90 text-sm mt-1">Buy or sell ToolTokens to unlock tools and services</p>
            </div>
            <span className="text-5xl">🪙</span>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div className="border border-amber-100 rounded-xl p-5 hover:shadow-md transition-shadow">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Starter Pack</p>
                <p className="text-3xl font-bold text-deep-slate">10 TT</p>
                <p className="text-construction-amber font-semibold text-lg">$12.50</p>
                <p className="text-xs text-gray-400 mt-1">$1.25 per ToolToken</p>
              </div>
              <div className="border-2 border-amber-400 rounded-xl p-5 hover:shadow-md transition-shadow relative">
                <span className="absolute top-3 right-3 bg-amber-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">Popular</span>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Regular Pack</p>
                <p className="text-3xl font-bold text-deep-slate">40 TT</p>
                <p className="text-construction-amber font-semibold text-lg">$50.00</p>
                <p className="text-xs text-gray-400 mt-1">$1.25 per ToolToken</p>
              </div>
              <div className="border border-amber-100 rounded-xl p-5 hover:shadow-md transition-shadow">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Premium Pack</p>
                <p className="text-3xl font-bold text-deep-slate">100 TT</p>
                <p className="text-construction-amber font-semibold text-lg">$125.00</p>
                <p className="text-xs text-gray-400 mt-1">$1.25 per ToolToken</p>
              </div>
              <div className="border border-amber-100 rounded-xl p-5 hover:shadow-md transition-shadow">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Enterprise Pack</p>
                <p className="text-3xl font-bold text-deep-slate">250 TT</p>
                <p className="text-construction-amber font-semibold text-lg">$312.50</p>
                <p className="text-xs text-gray-400 mt-1">$1.25 per ToolToken</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <p className="text-xs text-gray-400">Sell back rate: <strong>$0.75 / TT</strong> - Stripe coming soon</p>
              <button
                onClick={() => router.push('/shop')}
                className="bg-construction-amber text-white font-bold px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors shadow-md w-full sm:w-auto text-center"
              >
                Go to Full Token Shop
              </button>
            </div>
          </div>
        </div>

        {/* Quick Nav */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/tools')}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all text-left group"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="font-bold text-deep-slate mb-1">Tools Library</h3>
            <p className="text-sm text-gray-500">Browse and borrow tools from your community</p>
          </button>
          <button
            onClick={() => router.push('/hivematch')}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all text-left group"
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-deep-slate mb-1">HiveMatch</h3>
            <p className="text-sm text-gray-500">Get matched with local tool owners</p>
          </button>
          <button
            onClick={() => router.push('/membership')}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all text-left group"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="font-bold text-deep-slate mb-1">Membership</h3>
            <p className="text-sm text-gray-500">Upgrade your plan for premium perks</p>
          </button>
        </div>

      </div>
    </DashboardLayout>
  )
}
