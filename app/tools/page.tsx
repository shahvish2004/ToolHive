'use client'

import { useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import DashboardLayout from '@/components/layout/DashboardLayout'
import DualLibraryModel from '@/components/marketplace/DualLibraryModel'
import { Package, Users, Search, Filter, Star, MapPin, Calendar, Zap, Shield, CheckCircle } from 'lucide-react'

interface Tool {
  id: string
  name: string
  category: string
  dailyRate: number
  available: boolean
  rating: number
  description: string
  image: string
  owner?: string
  location?: string
  availableCount?: number
}

export default function ToolsPage() {
  const { user } = useAuth()
  const [activeModel, setActiveModel] = useState<'hive-hub' | 'p2p'>('hive-hub')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'power-tools', name: 'Power Tools' },
    { id: 'hand-tools', name: 'Hand Tools' },
    { id: 'garden', name: 'Garden Equipment' },
    { id: 'cleaning', name: 'Cleaning Equipment' },
    { id: 'specialty', name: 'Specialty Tools' }
  ]

  const toolsContent = (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Tools Hero Section */}
      <div className="bg-gradient-to-r from-deep-slate to-deep-slate-light rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tools & Equipment</h1>
            <p className="text-lg opacity-90">Browse our comprehensive library of professional tools</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Package size={32} />
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-construction-amber focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-construction-amber focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Model Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeModel === 'hive-hub' 
                ? 'bg-construction-amber text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveModel('hive-hub')}
          >
            Library Hub
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeModel === 'p2p' 
                ? 'bg-construction-amber text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveModel('p2p')}
          >
            P2P Marketplace
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Shield className="text-construction-amber" size={20} />
          <span className="text-sm text-gray-600">All tools are verified and insured</span>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DualLibraryModel defaultModel={activeModel} />
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Zap className="text-blue-600" size={24} />
          </div>
          <h3 className="font-bold text-deep-slate mb-2">Quick Access</h3>
          <p className="text-sm text-gray-600">Browse and book tools instantly from your device</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="text-green-600" size={24} />
          </div>
          <h3 className="font-bold text-deep-slate mb-2">Verified Owners</h3>
          <p className="text-sm text-gray-600">All tool owners are verified community members</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Star className="text-purple-600" size={24} />
          </div>
          <h3 className="font-bold text-deep-slate mb-2">Best Prices</h3>
          <p className="text-sm text-gray-600">Competitive daily rates with no hidden fees</p>
        </div>
      </div>
    </div>
  )

  return (
    <DashboardLayout title="Tools & Equipment" subtitle="Browse and rent from our comprehensive tool library">
      {toolsContent}
    </DashboardLayout>
  )
}
