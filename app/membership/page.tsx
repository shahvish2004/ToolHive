'use client'

import { useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Shield, Star, Zap, Crown, CheckCircle } from 'lucide-react'

const tiers = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '',
    tagline: 'Get started, no commitment',
    features: [
      'Browse tool listings',
      'Community forum access',
      'Up to 2 tool rentals/month',
      'Basic support',
    ],
    icon: Shield,
    card: 'bg-white border border-gray-200',
    header: 'bg-gray-100',
    headerText: 'text-deep-slate',
    iconBg: 'bg-gray-200',
    iconColor: 'text-gray-600',
    priceColor: 'text-gray-700',
    btn: 'border border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200',
    recommended: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '$4.99',
    period: '/month',
    tagline: 'Perfect for casual tool sharers',
    features: [
      'Everything in Free',
      'Up to 10 tool rentals/month',
      'Priority search results',
      'HiveMatch access',
      'Email support',
    ],
    icon: Star,
    card: 'bg-slate-50 border border-slate-200',
    header: 'bg-gradient-to-r from-slate-600 to-slate-700',
    headerText: 'text-white',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
    priceColor: 'text-white',
    btn: 'bg-slate-600 text-white hover:bg-slate-700 active:bg-slate-800 shadow-sm hover:shadow',
    recommended: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9.99',
    period: '/month',
    tagline: 'Most popular for active members',
    features: [
      'Everything in Standard',
      'Unlimited tool rentals',
      'Priority booking access',
      '50 ToolTokens bonus/month',
      'Advanced search filters',
      'Maintenance request access',
      'Premium support',
    ],
    icon: Zap,
    card: 'bg-amber-50 border-2 border-construction-amber shadow-lg shadow-amber-100',
    header: 'bg-gradient-to-r from-construction-amber to-yellow-400',
    headerText: 'text-white',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
    priceColor: 'text-white',
    btn: 'bg-construction-amber text-white hover:bg-yellow-500 active:bg-yellow-600 shadow-md hover:shadow-lg',
    recommended: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '$19.99',
    period: '/month',
    tagline: 'The full ToolHive experience',
    features: [
      'Everything in Pro',
      'Unlimited ToolTokens bonus',
      'Dedicated account manager',
      'Early access to new features',
      'Elite badge on profile',
      'Partner tool discounts',
      'API access',
    ],
    icon: Crown,
    card: 'bg-deep-slate border-2 border-deep-slate-light shadow-xl',
    header: 'bg-gradient-to-r from-deep-slate to-deep-slate-light',
    headerText: 'text-construction-amber',
    iconBg: 'bg-construction-amber/20',
    iconColor: 'text-construction-amber',
    priceColor: 'text-construction-amber',
    btn: 'bg-construction-amber text-deep-slate font-bold hover:bg-yellow-400 active:bg-yellow-500 shadow-md hover:shadow-lg',
    recommended: false,
  },
]

export default function MembershipPage() {
  const { user } = useAuth()
  const [activeTier, setActiveTier] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSelect = (id: string) => {
    setActiveTier(id)
    if (id !== 'free') {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3500)
    }
  }

  return (
    <DashboardLayout title="Membership" subtitle="Choose your ToolHive plan">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Page Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-deep-slate mb-2">Pick Your Plan</h2>
          <p className="text-gray-500">Start free, upgrade anytime. No hidden fees.</p>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-5 py-4 flex items-center gap-3">
            <CheckCircle size={18} />
            Plan selected! Payment integration coming soon via Stripe.
          </div>
        )}

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {tiers.map(tier => {
            const Icon = tier.icon
            const isActive = activeTier === tier.id
            return (
              <div
                key={tier.id}
                className={[
                  'relative rounded-2xl overflow-hidden flex flex-col transition-transform duration-200',
                  tier.card,
                  tier.recommended ? 'scale-105 z-10' : 'hover:scale-102',
                  isActive ? 'ring-4 ring-construction-amber ring-offset-2' : '',
                ].join(' ')}
              >
                {/* Recommended Badge */}
                {tier.recommended && (
                  <div className="absolute top-0 left-0 right-0 text-center py-1 bg-construction-amber text-white text-xs font-bold uppercase tracking-widest">
                    Recommended
                  </div>
                )}

                {/* Card Header */}
                <div className={['p-6 flex flex-col items-center text-center', tier.header, tier.recommended ? 'pt-8' : ''].join(' ')}>
                  <div className={['w-14 h-14 rounded-full flex items-center justify-center mb-3', tier.iconBg].join(' ')}>
                    <Icon size={28} className={tier.iconColor} />
                  </div>
                  <h3 className={['text-xl font-extrabold mb-1', tier.headerText].join(' ')}>{tier.name}</h3>
                  <div className={['flex items-baseline gap-0.5', tier.priceColor].join(' ')}>
                    <span className="text-4xl font-extrabold">{tier.price}</span>
                    <span className="text-sm opacity-80">{tier.period}</span>
                  </div>
                  <p className={['text-xs mt-2 opacity-80', tier.headerText].join(' ')}>{tier.tagline}</p>
                </div>

                {/* Features */}
                <div className="p-6 flex-1 flex flex-col">
                  <ul className="space-y-2 flex-1 mb-6">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle size={15} className={tier.recommended ? 'text-construction-amber mt-0.5 flex-shrink-0' : 'text-green-500 mt-0.5 flex-shrink-0'} />
                        <span className={tier.id === 'elite' ? 'text-gray-300' : 'text-gray-600'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSelect(tier.id)}
                    className={[
                      'w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-construction-amber',
                      isActive ? 'ring-2 ring-construction-amber' : '',
                      tier.btn,
                    ].join(' ')}
                  >
                    {isActive ? 'Current Plan' : tier.id === 'free' ? 'Get Started Free' : 'Select ' + tier.name}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Compare note */}
        <p className="text-center text-xs text-gray-400">All plans include access to the ToolHive community. Prices in CAD. Cancel anytime.</p>

      </div>
    </DashboardLayout>
  )
}
