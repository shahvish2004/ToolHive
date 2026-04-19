'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import DualLibraryModel from '@/components/marketplace/DualLibraryModel'
import SecureWallet from '@/components/wallet/SecureWallet'
import SecureDepositLoop from '@/components/deposit/SecureDepositLoop'

export default function HomePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('library-hub')
  const [tokenBalance, setTokenBalance] = useState(25.00)
  const { user, loading } = useAuth()

  const renderContent = () => {
    switch (activeTab) {
      case 'library-hub':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-deep-slate mb-4">Library Hub</h2>
            <p className="text-gray-600 mb-6">Browse and rent tools directly from our community inventory.</p>
            <DualLibraryModel defaultModel="hive-hub" />
          </div>
        )
      case 'p2p-marketplace':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-deep-slate mb-4">P2P Marketplace</h2>
            <p className="text-gray-600 mb-6">Connect with neighbors and rent tools peer-to-peer.</p>
            <DualLibraryModel defaultModel="p2p-marketplace" />
          </div>
        )
      case 'secure-wallet':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-deep-slate mb-4">Secure Wallet</h2>
            <p className="text-gray-600 mb-6">Manage your ToolTokens and transaction history.</p>
            <SecureWallet />
          </div>
        )
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-deep-slate mb-4">Welcome to ToolHive™</h2>
            <p className="text-gray-600 mb-6">Your community-powered tool sharing platform.</p>
            
            {/* Functional Action Buttons */}
            <div className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    console.log(' Browse Tools clicked')
                    router.push('/tools')
                  }}
                  className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Browse Tools
                </button>
                <button 
                  onClick={() => {
                    console.log(' Buy Tokens clicked')
                    router.push('/shop')
                  }}
                  className="inline-flex items-center gap-3 bg-white text-construction-amber px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Buy Tokens
                </button>
                <button 
                  onClick={() => {
                    console.log(' Join Community clicked')
                    router.push('/membership')
                  }}
                  className="inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Join Community
                </button>
              </div>
              <p className="text-sm opacity-90">Start sharing tools today - no membership required to browse</p>
            </div>
          </div>
        )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-toolhive-gray flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-construction-amber border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-deep-slate font-medium">Loading ToolHive™...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-toolhive-gray">
        {/* Hero Section for Non-logged-in Users */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <img 
                  src="https://i.imgur.com/2cmzqhj.png" 
                  alt="ToolHive Logo" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h1 className="text-4xl font-bold mb-4">Share Tools, Build Community</h1>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Rent professional tools without the cost of ownership. Join our community of tool sharers and start saving money today.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button 
                  onClick={() => {
                    console.log(' Browse Tools clicked (guest)')
                    router.push('/tools')
                  }}
                  className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Browse Tools
                </button>
                <button 
                  onClick={() => {
                    console.log(' Join Community clicked (guest)')
                    router.push('/membership')
                  }}
                  className="inline-flex items-center gap-3 bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Join Community
                </button>
              </div>
              
              <p className="text-lg opacity-90">No membership required to browse tools</p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-deep-slate mb-2">Save Money</h3>
              <p className="text-gray-600">Access expensive tools for a fraction of purchase cost. No more buying tools you'll only use once.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-deep-slate mb-2">Earn Income</h3>
              <p className="text-gray-600">Monetize your idle tools by lending to community members. Turn your garage into a source of passive income.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-deep-slate mb-2">Build Connections</h3>
              <p className="text-gray-600">Connect with neighbors and strengthen local community through tool sharing and mutual support.</p>
            </div>
          </div>
        </div>

        {/* Sign-in Prompt */}
        <div className="max-w-4xl mx-auto px-6 pb-12">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
            <h2 className="text-2xl font-bold text-deep-slate mb-4">Ready to Start Sharing?</h2>
            <p className="text-gray-600 mb-6">Join thousands of community members who are saving money and building connections through tool sharing.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  console.log(' Sign In clicked')
                  alert('Sign in functionality coming soon! For now, you can browse tools as a guest.')
                }}
                className="btn-primary px-8 py-3"
              >
                Sign In
              </button>
              <button 
                onClick={() => {
                  console.log(' Create Account clicked')
                  router.push('/membership')
                }}
                className="btn-secondary px-8 py-3"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-toolhive-gray">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          tokenBalance={tokenBalance} 
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header title="ToolHive™" subtitle="Community Tool Sharing Platform" />

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  )
}
