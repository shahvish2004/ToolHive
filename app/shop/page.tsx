'use client'

import { useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { ShoppingCart, CreditCard, Shield, Star, Gift, Zap, Crown, Lock, CheckCircle } from 'lucide-react'

interface TokenPackage {
  id: string
  name: string
  amount: number
  price: number
  originalPrice?: number
  description: string
  features: string[]
  popular?: boolean
}

export default function ShopPage() {
  const { user } = useAuth()
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [tokenBalance, setTokenBalance] = useState(25.00)
  const [purchaseSuccess, setPurchaseSuccess] = useState(false)

  const tokenPackages: TokenPackage[] = [
    {
      id: 'starter',
      name: 'Starter Pack',
      amount: 25,
      price: 9.99,
      originalPrice: 12.99,
      description: 'Perfect for trying out the platform',
      features: [
        '25 ToolTokens',
        'Valid for 30 days',
        'Basic tool access',
        'Community support'
      ]
    },
    {
      id: 'regular',
      name: 'Regular Pack',
      amount: 50,
      price: 19.99,
      originalPrice: 25.99,
      description: 'Great value for regular users',
      features: [
        '50 ToolTokens',
        'Valid for 60 days',
        'Priority booking',
        'Advanced search filters'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Pack',
      amount: 100,
      price: 34.99,
      originalPrice: 49.99,
      description: 'Maximum value for power users',
      features: [
        '100 ToolTokens',
        'Valid for 90 days',
        'Exclusive tool access',
        'Premium support',
        'Monthly bonus tokens'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise Pack',
      amount: 250,
      price: 74.99,
      originalPrice: 99.99,
      description: 'For teams and businesses',
      features: [
        '250 ToolTokens',
        'Valid for 180 days',
        'Team management',
        'API access',
        'Dedicated support',
        'Custom branding'
      ]
    }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(price)
  }

  const handlePurchase = (packageId: string) => {
    if (!user) {
      alert('Please sign in to purchase tokens')
      return
    }

    const selectedPkg = tokenPackages.find(pkg => pkg.id === packageId)
    if (selectedPkg) {
      // In real app, this would process payment via Stripe
      console.log(`Processing purchase: ${selectedPkg.name}`)
      setTokenBalance(tokenBalance + selectedPkg.amount)
      setSelectedPackage(packageId)
      setPurchaseSuccess(true)
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setPurchaseSuccess(false)
        setSelectedPackage(null)
      }, 3000)
    }
  }

  const shopContent = (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-construction-amber to-construction-amber-light rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">ToolToken Shop</h1>
            <p className="text-lg opacity-90">Purchase ToolTokens for tool rentals</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <CreditCard size={32} />
          </div>
        </div>
      </div>

      {/* Current Balance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-deep-slate">Current Balance</h3>
            <p className="text-sm text-gray-600">Your available ToolTokens</p>
          </div>
          <div className="text-3xl font-bold text-construction-amber">
            {tokenBalance.toFixed(2)} TT
          </div>
        </div>
      </div>

      {/* Purchase Success Message */}
      {purchaseSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Gift className="text-green-600" size={24} />
            <div>
              <h3 className="font-medium text-green-900">Purchase Successful!</h3>
              <p className="text-sm text-green-700">Your ToolTokens have been added to your account.</p>
            </div>
          </div>
        </div>
      )}

      {/* Token Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tokenPackages.map((pkg) => {
          const isSelected = selectedPackage === pkg.id
          
          return (
            <div
              key={pkg.id}
              className={`bg-white rounded-xl shadow-sm border-2 transition-all ${
                pkg.popular ? 'border-construction-amber' : 'border-gray-200'
              }`}
            >
              {pkg.popular && (
                <div className="bg-construction-amber text-white text-center py-2 px-4 rounded-t-xl text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-deep-slate mb-2">{pkg.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-construction-amber mb-1">
                    {pkg.amount} TT
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    {pkg.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(pkg.originalPrice)}
                      </span>
                    )}
                    <span className="text-lg font-bold text-deep-slate">
                      {formatPrice(pkg.price)}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handlePurchase(pkg.id)}
                  disabled={isSelected}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    isSelected
                      ? 'bg-green-600 text-white'
                      : pkg.popular
                        ? 'bg-construction-amber text-white hover:bg-construction-amber-light'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {isSelected ? 'Purchased!' : 'Buy Now'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Benefits Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-deep-slate mb-6">Why Choose ToolTokens?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="text-blue-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-deep-slate mb-1">Secure Payments</h4>
              <p className="text-sm text-gray-600">All transactions are encrypted and protected</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="text-green-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-deep-slate mb-1">Instant Access</h4>
              <p className="text-sm text-gray-600">Tokens are available immediately after purchase</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Crown className="text-purple-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-deep-slate mb-1">Best Value</h4>
              <p className="text-sm text-gray-600">Competitive pricing with regular promotions</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-deep-slate mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-deep-slate mb-2">What are ToolTokens?</h4>
            <p className="text-sm text-gray-600">ToolTokens are the digital currency used to rent tools on the ToolHive platform.</p>
          </div>
          <div>
            <h4 className="font-medium text-deep-slate mb-2">How long do tokens last?</h4>
            <p className="text-sm text-gray-600">Token validity depends on the package purchased, ranging from 30 to 180 days.</p>
          </div>
          <div>
            <h4 className="font-medium text-deep-slate mb-2">Can I get a refund?</h4>
            <p className="text-sm text-gray-600">Refunds are available within 7 days of purchase if tokens haven't been used.</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <DashboardLayout title="ToolToken Shop" subtitle="Purchase ToolTokens for tool rentals">
      {shopContent}
    </DashboardLayout>
  )
}
