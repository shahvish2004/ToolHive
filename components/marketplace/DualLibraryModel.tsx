'use client'

import { useState } from 'react'
import { Package, Users, Search, Filter } from 'lucide-react'

interface Tool {
  id: string
  name: string
  category: string
  dailyRate: number
  availability: 'available' | 'rented' | 'maintenance'
  owner?: string
  rating?: number
  image?: string
  description?: string
}

export default function DualLibraryModel({ defaultModel }: { defaultModel?: string }) {
  const [activeModel, setActiveModel] = useState(defaultModel || 'hive-hub')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'power-tools', name: 'Power Tools' },
    { id: 'hand-tools', name: 'Hand Tools' },
    { id: 'garden', name: 'Garden & Outdoor' },
    { id: 'automotive', name: 'Automotive' },
    { id: 'cleaning', name: 'Cleaning' },
  ]

  const hiveHubTools: Tool[] = [
    {
      id: 'drill-1',
      name: 'Heavy Duty Drill',
      category: 'power-tools',
      dailyRate: 25,
      availability: 'available',
      image: 'https://images.unsplash.com/photo-1584294445092-9e20cf383e4d8b?auto=format&fit=crop&w=800',
      description: 'Professional grade drill for all your heavy-duty projects'
    },
    {
      id: 'circular-saw-1',
      name: 'Circular Saw',
      category: 'power-tools',
      dailyRate: 30,
      availability: 'available',
      image: 'https://images.unsplash.com/photo-1595393516750-3336c9e4d8b?auto=format&fit=crop&w=800',
      description: 'High-performance circular saw for precise cuts'
    },
    {
      id: 'sander-1',
      name: 'Orbital Sander',
      category: 'power-tools',
      dailyRate: 20,
      availability: 'available',
      image: 'https://images.unsplash.com/photo-1579533475345-2b5d4d5b8b?auto=format&fit=crop&w=800',
      description: 'Versatile sander for smoothing and finishing'
    }
  ]

  const p2pTools: Tool[] = [
    {
      id: 'mower-1',
      name: 'Lawn Mower',
      category: 'garden',
      dailyRate: 15,
      availability: 'available',
      owner: 'John D.',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1568613264225-ebd1d0b7a?auto=format&fit=crop&w=800',
      description: 'Well-maintained lawn mower, perfect for regular yard work'
    },
    {
      id: 'pressure-washer-1',
      name: 'Pressure Washer',
      category: 'cleaning',
      dailyRate: 35,
      availability: 'rented',
      owner: 'Sarah M.',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1605030432893-e3988c6d4d5b8b?auto=format&fit=crop&w=800',
      description: 'Heavy-duty pressure washer for tough cleaning jobs'
    }
  ]

  const allTools = activeModel === 'hive-hub' ? hiveHubTools : p2pTools
  const filteredTools = allTools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || tool.category === selectedCategory)
  )

  const handleRentTool = (toolId: string) => {
    console.log(`Renting tool: ${toolId}`)
    alert(`Rental request for ${toolId} has been sent to the tool owner!`)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-deep-slate">Tools Library</h2>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-construction-amber focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
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

            <Filter className="text-gray-600 hover:text-construction-amber" size={20} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveModel(activeModel === 'hive-hub' ? 'p2p-marketplace' : 'hive-hub')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeModel === 'hive-hub' 
                ? 'bg-construction-amber text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {activeModel === 'hive-hub' ? 'P2P Marketplace' : 'Library Hub'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div key={tool.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-deep-slate">{tool.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{tool.category}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    tool.availability === 'available' 
                      ? 'bg-green-100 text-green-800' 
                      : tool.availability === 'rented' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {tool.availability === 'available' ? 'Available' : 
                     tool.availability === 'rented' ? 'Rented' : 'Maintenance'}
                  </span>
                  {tool.rating && (
                    <div className="flex items-center">
                      <span className="text-yellow-500">?</span>
                      <span className="ml-1 text-sm text-gray-600">{tool.rating}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600">${tool.dailyRate}/day</p>
              </div>
            </div>
            
            <img 
              src={tool.image} 
              alt={tool.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
            {tool.owner && (
              <p className="text-xs text-gray-500 mb-4">Owner: {tool.owner}</p>
            )}
            
            <button
              onClick={() => handleRentTool(tool.id)}
              disabled={tool.availability !== 'available'}
              className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                tool.availability === 'available'
                  ? 'bg-construction-amber text-white hover:bg-construction-amber-light'
                  : 'bg-gray-300 text-gray-700 cursor-not-allowed'
              }`}
            >
              {tool.availability === 'available' ? 'Rent Now' : 'Currently Rented'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
