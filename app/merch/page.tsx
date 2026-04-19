'use client'

import { useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { ShoppingBag, Star, Truck, Shield, Gift, Zap, CheckCircle } from 'lucide-react'

interface MerchItem {
  id: string
  name: string
  price: number
  description: string
  category: string
  image: string
  features: string[]
  popular?: boolean
}

export default function MerchPage() {
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cartItems, setCartItems] = useState<string[]>([])

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'apparel', name: 'Apparel' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'tools', name: 'Tool Gear' },
    { id: 'premium', name: 'Premium Items' }
  ]

  const merchItems: MerchItem[] = [
    {
      id: 'tshirt-basic',
      name: 'ToolHive Basic T-Shirt',
      price: 24.99,
      description: 'Classic cotton t-shirt with ToolHive logo',
      category: 'apparel',
      image: 'https://images.unsplash.com/photo-1521572166977-1fb02c7b415?auto=format&fit=crop&w=800',
      features: ['100% cotton', 'Machine washable', 'Classic fit'],
      popular: true
    },
    {
      id: 'tshirt-premium',
      name: 'ToolHive Pro T-Shirt',
      price: 34.99,
      description: 'Premium quality t-shirt with embroidered logo',
      category: 'apparel',
      image: 'https://images.unsplash.com/photo-1521572166977-1fb02c7b415?auto=format&fit=crop&w=800',
      features: ['Premium cotton', 'Embroidered logo', 'Limited edition']
    },
    {
      id: 'work-gloves',
      name: 'Heavy Duty Work Gloves',
      price: 19.99,
      description: 'Professional grade work gloves for all projects',
      category: 'tools',
      image: 'https://images.unsplash.com/photo-1558618047-b29c2c4a0c6?auto=format&fit=crop&w=800',
      features: ['Leather palms', 'Reinforced stitching', 'Breathable fabric']
    },
    {
      id: 'tool-belt',
      name: 'ToolHive Tool Belt',
      price: 39.99,
      description: 'Multi-pocket tool belt with ToolHive branding',
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1596462502278-27d52b8df4?auto=format&fit=crop&w=800',
      features: ['8 pockets', 'Adjustable fit', 'Heavy duty buckle']
    },
    {
      id: 'safety-glasses',
      name: 'Safety Glasses Pack',
      price: 14.99,
      description: 'UV protection safety glasses with carrying case',
      category: 'tools',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c479b96?auto=format&fit=crop&w=800',
      features: ['UV protection', 'Anti-fog coating', 'Hard case included']
    },
    {
      id: 'mug-premium',
      name: 'ToolHive Premium Mug',
      price: 12.99,
      description: 'Ceramic mug with ToolHive logo and construction theme',
      category: 'premium',
      image: 'https://images.unsplash.com/photo-1514228182545-6142027c49f4?auto=format&fit=crop&w=800',
      features: ['Ceramic material', 'Dishwasher safe', 'Construction yellow']
    }
  ]

  const filteredItems = selectedCategory === 'all' 
    ? merchItems 
    : merchItems.filter(item => item.category === selectedCategory)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(price)
  }

  const addToCart = (itemId: string) => {
    if (!user) {
      alert('Please sign in to add items to cart')
      return
    }

    if (!cartItems.includes(itemId)) {
      setCartItems([...cartItems, itemId])
      alert('Item added to cart!')
    }
  }

  const removeFromCart = (itemId: string) => {
    setCartItems(cartItems.filter(id => id !== itemId))
  }

  const isInCart = (itemId: string) => cartItems.includes(itemId)

  const merchContent = (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">ToolHive Merchandise</h1>
            <p className="text-lg opacity-90">Premium gear for the modern tool enthusiast</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <ShoppingBag size={32} />
          </div>
        </div>
      </div>

      {/* Shopping Cart Summary */}
      {cartItems.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-construction-amber" size={20} />
              <span className="font-medium text-deep-slate">
                {cartItems.length} item{cartItems.length > 1 ? 's' : ''} in cart
              </span>
            </div>
            <button className="bg-construction-amber text-white px-4 py-2 rounded-lg font-medium hover:bg-construction-amber-light">
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-construction-amber text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Merch Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square bg-gray-100 relative">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {item.popular && (
                <div className="absolute top-2 right-2 bg-construction-amber text-white px-2 py-1 rounded text-xs font-medium">
                  Popular
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-deep-slate text-lg mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              
              <div className="text-2xl font-bold text-construction-amber mb-4">
                {formatPrice(item.price)}
              </div>
              
              <ul className="space-y-2 mb-6">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex gap-3">
                <button
                  onClick={() => addToCart(item.id)}
                  disabled={isInCart(item.id)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    isInCart(item.id)
                      ? 'bg-green-600 text-white'
                      : 'bg-construction-amber text-white hover:bg-construction-amber-light'
                  }`}
                >
                  {isInCart(item.id) ? 'In Cart ✓' : 'Add to Cart'}
                </button>
                
                {isInCart(item.id) && (
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-deep-slate mb-6">Why Choose ToolHive Merch?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="text-blue-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-deep-slate mb-1">Quality Materials</h4>
              <p className="text-sm text-gray-600">Premium materials built to last through tough projects.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Truck className="text-green-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-deep-slate mb-1">Fast Shipping</h4>
              <p className="text-sm text-gray-600">Free shipping on orders over $50 with tracking included.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Gift className="text-purple-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-deep-slate mb-1">Community Support</h4>
              <p className="text-sm text-gray-600">Every purchase supports the ToolHive community.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <DashboardLayout title="Merchandise" subtitle="Premium gear for the modern tool enthusiast">
      {merchContent}
    </DashboardLayout>
  )
}
