'use client'

import { useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Shield, Users, TrendingUp, Lock, CheckCircle, Star, Zap, Crown } from 'lucide-react'

export default function MembershipPage() {
  const { user } = useAuth()
  const [selectedTier, setSelectedTier] = useState<'basic' | 'pro'>('basic')
  const [agreementChecked, setAgreementChecked] = useState(false)
  const [membershipSuccess, setMembershipSuccess] = useState(false)

  const membershipTiers = [
    {
      id: 'basic',
      name: 'Basic Member',
      price: 'Free',
      description: 'Perfect for getting started with community tool sharing',
      features: [
        'Browse and rent tools',
        'Basic tool library access',
        'Community forum access',
        'Monthly tool rental limit: 5',
        'Basic support'
      ],
      icon: Shield,
      color: 'from-blue-600 to-blue-700'
    },
    {
      id: 'pro',
      name: 'Pro Member',
      price: '$9.99/month',
      description: 'Maximum value for frequent tool users',
      features: [
        'Unlimited tool rentals',
        'Priority booking access',
        'Advanced search filters',
        'Tool maintenance requests',
        'Premium support',
        'Monthly ToolToken bonus: 50 TT',
        'Early access to new tools'
      ],
      icon: Crown,
      color: 'from-purple-600 to-purple-700'
    }
  ]

  const handleMembershipUpgrade = () => {
    if (!agreementChecked) {
      alert('Please accept the membership agreement')
      return
    }
    
    // In real app, this would update user's membership status in database
    alert('Welcome to Basic Membership! You now have access to P2P Marketplace and all basic features.')
    
    // Reset success message after 3 seconds
    setTimeout(() => setMembershipSuccess(false), 3000)
  }

  const membershipContent = (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-deep-slate to-deep-slate-light rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Membership</h1>
            <p className="text-lg opacity-90">Choose your ToolHive membership tier</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Crown size={32} />
          </div>
        </div>
      </div>

      {/* Membership Success Message */}
      {membershipSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <h3 className="font-medium text-green-900">Membership Updated!</h3>
              <p className="text-sm text-green-700">Your membership has been successfully updated.</p>
            </div>
          </div>
        </div>
      )}

      {/* Membership Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {membershipTiers.map((tier) => {
          const Icon = tier.icon
          const isSelected = selectedTier === tier.id
          
          return (
            <div
              key={tier.id}
              className={`bg-white rounded-xl shadow-sm border-2 transition-all cursor-pointer ${
                isSelected 
                  ? 'border-construction-amber shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTier(tier.id as 'basic' | 'pro')}
            >
              <div className={`bg-gradient-to-r ${tier.color} rounded-t-xl p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <Icon size={32} />
                  <div className="text-2xl font-bold">{tier.price}</div>
                </div>
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <p className="opacity-90">{tier.description}</p>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    isSelected
                      ? 'bg-construction-amber text-white hover:bg-construction-amber-light'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {isSelected ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Membership Agreement */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-deep-slate mb-4">Membership Agreement</h3>
        <div className="space-y-4 text-sm text-gray-600">
          <p>By joining ToolHive, you agree to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Return tools in the same condition as received</li>
            <li>Report any damages or issues immediately</li>
            <li>Pay rental fees on time</li>
            <li>Respect community guidelines and other members</li>
            <li>Maintain a positive reputation in the community</li>
          </ul>
        </div>
        
        <div className="mt-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={agreementChecked}
              onChange={(e) => setAgreementChecked(e.target.checked)}
              className="w-4 h-4 text-construction-amber border-gray-300 rounded focus:ring-construction-amber"
            />
            <span className="text-sm text-gray-700">
              I agree to the membership terms and conditions
            </span>
          </label>
        </div>
        
        <button
          onClick={handleMembershipUpgrade}
          disabled={!agreementChecked}
          className={`mt-4 w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            agreementChecked
              ? 'bg-construction-amber text-white hover:bg-construction-amber-light'
              : 'bg-gray-300 text-gray-700 cursor-not-allowed'
          }`}
        >
          Complete Membership
        </button>
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <TrendingUp className="text-blue-600" size={24} />
          </div>
          <h3 className="font-bold text-deep-slate mb-2">Save Money</h3>
          <p className="text-sm text-gray-600">Access expensive tools for a fraction of the purchase cost.</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Users className="text-green-600" size={24} />
          </div>
          <h3 className="font-bold text-deep-slate mb-2">Build Community</h3>
          <p className="text-sm text-gray-600">Connect with neighbors and strengthen local relationships.</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Zap className="text-purple-600" size={24} />
          </div>
          <h3 className="font-bold text-deep-slate mb-2">Earn Rewards</h3>
          <p className="text-sm text-gray-600">Get ToolTokens and exclusive benefits as an active member.</p>
        </div>
      </div>
    </div>
  )

  return (
    <DashboardLayout title="Membership" subtitle="Choose your ToolHive membership tier">
      {membershipContent}
    </DashboardLayout>
  )
}
