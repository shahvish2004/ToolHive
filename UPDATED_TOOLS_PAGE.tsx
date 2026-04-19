// UPDATED TOOLS PAGE - Complete Layout Fix Applied
// File: app/tools/page.tsx

'use client'

import { useState } from 'react'
import { Search, Filter, Package, Wrench, Home, Truck, Sparkles } from 'lucide-react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'power-tools', name: 'Power Tools' },
    { id: 'hand-tools', name: 'Hand Tools' },
    { id: 'garden', name: 'Garden Equipment' },
    { id: 'cleaning', name: 'Cleaning Equipment' },
    { id: 'specialty', name: 'Specialty Tools' }
  ]

  const tools = [
    {
      id: '1',
      name: 'Heavy Duty Drill',
      category: 'power-tools',
      dailyRate: 25,
      available: true,
      rating: 4.5,
      description: 'Professional grade drill for all your heavy-duty projects',
      image: 'https://images.unsplash.com/photo-1584294445092-9e20cf383e4d8b?auto=format&fit=crop&w=800'
    },
    {
      id: '2',
      name: 'Circular Saw',
      category: 'power-tools',
      dailyRate: 30,
      available: true,
      rating: 4.8,
      description: 'High-performance circular saw for precise cuts',
      image: 'https://images.unsplash.com/photo-1595393516750-3336c9e4d8b?auto=format&fit=crop&w=800'
    },
    {
      id: '3',
      name: 'Orbital Sander',
      category: 'power-tools',
      dailyRate: 20,
      available: false,
      rating: 4.2,
      description: 'Versatile sander for smoothing and finishing',
      image: 'https://images.unsplash.com/photo-1579533475345-2b5d4d5b8b?auto=format&fit=crop&w=800'
    }
  ]

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || tool.category === selectedCategory)
  )

  const sortedTools = [...filteredTools].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'price':
        return a.dailyRate - b.dailyRate
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-toolhive-gray">
      {/* ✅ CORRECT OUTER WRAPPER - Both changes applied */}
      <div className="flex h-screen overflow-hidden">   // ← outer wrapper with h-screen overflow-hidden
        <Sidebar 
          activeTab="tools" 
          onTabChange={(tab) => console.log(' Navigation to:', tab)} 
          tokenBalance={25.00}
        />
        
        {/* ✅ CORRECT INNER WRAPPER */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">  // ← inner wrapper with flex-1 flex flex-col min-w-0 overflow-hidden
          <Header 
            title="Tools & Equipment" 
            subtitle="Browse and rent from our comprehensive tool library" 
          />
          
          <main className="p-6">
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

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-construction-amber focus:border-transparent"
                    >
                      <option value="name">Sort by Name</option>
                      <option value="price">Sort by Price</option>
                      <option value="rating">Sort by Rating</option>
                    </select>

                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Filter size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedTools.map((tool) => (
                  <div key={tool.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-gray-100 relative">
                      <img 
                        src={tool.image} 
                        alt={tool.name}
                        className="w-full h-full object-cover"
                      />
                      {!tool.available && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Currently Rented
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-deep-slate text-lg">{tool.name}</h3>
                          <p className="text-sm text-gray-600">{tool.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-construction-amber">${tool.dailyRate}</p>
                          <p className="text-sm text-gray-600">/day</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(tool.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.005 1.603.921 1.902 0l1.07-3.292a1 1 0 00-.95-.69h-3.462c-.969 0-1.371-1.24-.588-1.81l2.8-2.034a1 1 0 00.364-1.118L9.049 2.927z" />
                            </svg>
                          ))}
                          <span className="text-sm text-gray-600">({tool.rating})</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                      
                      <button
                        disabled={!tool.available}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                          tool.available
                            ? 'bg-construction-amber text-white hover:bg-construction-amber-light'
                            : 'bg-gray-300 text-gray-700 cursor-not-allowed'
                        }`}
                      >
                        {tool.available ? 'Rent Now' : 'Currently Rented'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {sortedTools.length === 0 && (
                <div className="text-center py-12">
                  <Package className="text-gray-400 mx-auto mb-4" size={48} />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No tools found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
