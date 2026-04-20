'use client'

import { useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Gift, Zap, Crown, Star, CheckCircle, ArrowDownLeft } from 'lucide-react'

const SELL_RATE = 0.75

const packages = [
  {
    id: 'starter',
    name: 'Starter',
    amount: 10,
    price: 12.50,
    tagline: 'Try it out',
    features: ['10 ToolTokens', 'Valid 30 days', 'Basic tool access', 'Community support'],
    icon: Gift,
    card: 'bg-white border border-gray-200',
    header: 'bg-gray-100',
    headerText: 'text-deep-slate',
    iconBg: 'bg-gray-200',
    iconColor: 'text-gray-600',
    btn: 'border border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-300',
    popular: false,
  },
  {
    id: 'regular',
    name: 'Regular',
    amount: 40,
    price: 50.00,
    tagline: 'Best for regular users',
    features: ['40 ToolTokens', 'Valid 60 days', 'Priority booking', 'Advanced filters'],
    icon: Star,
    card: 'bg-slate-50 border border-slate-200',
    header: 'bg-gradient-to-r from-slate-600 to-slate-700',
    headerText: 'text-white',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
    btn: 'bg-slate-600 text-white hover:bg-slate-700 active:bg-slate-800 shadow-sm hover:shadow focus:ring-slate-400',
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    amount: 100,
    price: 125.00,
    tagline: 'Most popular choice',
    features: ['100 ToolTokens', 'Valid 90 days', 'Exclusive tool access', 'Priority support', 'HiveMatch boost'],
    icon: Zap,
    card: 'bg-amber-50 border-2 border-construction-amber shadow-lg shadow-amber-100',
    header: 'bg-gradient-to-r from-construction-amber to-yellow-400',
    headerText: 'text-white',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
    btn: 'bg-construction-amber text-white hover:bg-yellow-500 active:bg-yellow-600 shadow-md hover:shadow-lg focus:ring-yellow-400',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    amount: 250,
    price: 312.50,
    tagline: 'Maximum value',
    features: ['250 ToolTokens', 'Valid 180 days', 'Unlimited access', 'Dedicated support', 'API access', 'Partner discounts'],
    icon: Crown,
    card: 'bg-deep-slate border-2 border-deep-slate-light shadow-xl',
    header: 'bg-gradient-to-r from-deep-slate to-deep-slate-light',
    headerText: 'text-construction-amber',
    iconBg: 'bg-construction-amber/20',
    iconColor: 'text-construction-amber',
    btn: 'bg-construction-amber text-deep-slate font-bold hover:bg-yellow-400 active:bg-yellow-500 shadow-md hover:shadow-lg focus:ring-yellow-300',
    popular: false,
  },
]

export default function ShopPage() {
  const { user } = useAuth()
  const [activePkg, setActivePkg] = useState<string | null>(null)
  const [tokenBalance, setTokenBalance] = useState(25.00)
  const [buySuccess, setBuySuccess] = useState<string | null>(null)
  const [sellAmount, setSellAmount] = useState('')
  const [sellSuccess, setSellSuccess] = useState(false)

  const sellAmountNum = parseFloat(sellAmount) || 0
  const sellPayout = (sellAmountNum * SELL_RATE).toFixed(2)

  const handleBuy = (pkg: typeof packages[0]) => {
    setActivePkg(pkg.id)
    setTokenBalance(prev => parseFloat((prev + pkg.amount).toFixed(2)))
    setBuySuccess(pkg.name)
    setTimeout(() => { setBuySuccess(null); setActivePkg(null) }, 3500)
  }

  const handleSell = () => {
    if (sellAmountNum <= 0 || sellAmountNum > tokenBalance) return
    setTokenBalance(prev => parseFloat((prev - sellAmountNum).toFixed(2)))
    setSellSuccess(true)
    setSellAmount('')
    setTimeout(() => setSellSuccess(false), 4000)
  }

  return (
    <DashboardLayout title="Token Shop" subtitle="Buy or sell ToolTokens">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Balance bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Your Balance</p>
            <p className="text-2xl font-extrabold text-construction-amber">{tokenBalance.toFixed(2)} TT</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Buy at <strong>$1.25/TT</strong></p>
            <p className="text-xs text-gray-400">Sell at <strong>$0.75/TT</strong></p>
          </div>
        </div>

        {buySuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-5 py-4 flex items-center gap-3">
            <CheckCircle size={18} />
            {buySuccess} purchased! Tokens added to your wallet.
          </div>
        )}

        {/* Buy Cards */}
        <div>
          <h2 className="text-xl font-bold text-deep-slate mb-4">Buy ToolTokens</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {packages.map(pkg => {
              const Icon = pkg.icon
              const isActive = activePkg === pkg.id
              return (
                <div
                  key={pkg.id}
                  className={[
                    'relative rounded-2xl overflow-hidden flex flex-col transition-transform duration-200',
                    pkg.card,
                    pkg.popular ? 'scale-105 z-10' : 'hover:scale-102',
                    isActive ? 'ring-4 ring-construction-amber ring-offset-2' : '',
                  ].join(' ')}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 left-0 right-0 text-center py-1 bg-construction-amber text-white text-xs font-bold uppercase tracking-widest">
                      Most Popular
                    </div>
                  )}
                  <div className={['p-5 flex flex-col items-center text-center', pkg.header, pkg.popular ? 'pt-8' : ''].join(' ')}>
                    <div className={['w-12 h-12 rounded-full flex items-center justify-center mb-2', pkg.iconBg].join(' ')}>
                      <Icon size={24} className={pkg.iconColor} />
                    </div>
                    <h3 className={['text-lg font-extrabold mb-1', pkg.headerText].join(' ')}>{pkg.name}</h3>
                    <div className={['flex items-baseline gap-0.5', pkg.headerText].join(' ')}>
                      <span className="text-3xl font-extrabold">{pkg.amount}</span>
                      <span className="text-sm opacity-80 ml-1">TT</span>
                    </div>
                    <p className={['text-xl font-bold mt-1', pkg.headerText].join(' ')}>${pkg.price.toFixed(2)}</p>
                    <p className={['text-xs opacity-70 mt-1', pkg.headerText].join(' ')}>{pkg.tagline}</p>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <ul className="space-y-2 flex-1 mb-4">
                      {pkg.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle size={14} className={pkg.popular ? 'text-construction-amber mt-0.5 flex-shrink-0' : 'text-green-500 mt-0.5 flex-shrink-0'} />
                          <span className={pkg.id === 'enterprise' ? 'text-gray-300' : 'text-gray-600'}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handleBuy(pkg)}
                      disabled={isActive}
                      className={[
                        'w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2',
                        isActive ? 'bg-green-500 text-white cursor-default' : pkg.btn,
                      ].join(' ')}
                    >
                      {isActive ? 'Purchased!' : 'Buy ' + pkg.name}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Sell Back Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-400 to-yellow-300 px-6 py-4 flex items-center gap-3">
            <ArrowDownLeft size={20} className="text-white" />
            <div>
              <h3 className="font-bold text-white">Sell Back ToolTokens</h3>
              <p className="text-white/80 text-xs">Sell unused tokens at $0.75/TT · Stripe coming soon</p>
            </div>
          </div>
          <div className="p-6 flex flex-col sm:flex-row gap-6 items-end">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Amount to Sell (TT)</label>
              <input
                type="number"
                value={sellAmount}
                onChange={e => setSellAmount(e.target.value)}
                placeholder="0.00"
                min="0"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-construction-amber"
              />
              <p className="text-xs text-gray-400 mt-1">Available: {tokenBalance.toFixed(2)} TT</p>
            </div>
            {sellAmountNum > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-sm min-w-44">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-500">Tokens</span>
                  <span className="font-semibold">{sellAmountNum.toFixed(2)} TT</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-500">Rate</span>
                  <span className="font-semibold">$0.75/TT</span>
                </div>
                <div className="flex justify-between border-t pt-1">
                  <span className="font-bold">You get</span>
                  <span className="font-extrabold text-green-600">${sellPayout} CAD</span>
                </div>
              </div>
            )}
            <button
              onClick={handleSell}
              disabled={!sellAmount || sellAmountNum <= 0 || sellAmountNum > tokenBalance}
              className="bg-red-500 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-red-600 active:bg-red-700 transition-colors shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 whitespace-nowrap"
            >
              Sell Tokens
            </button>
          </div>
          {sellSuccess && (
            <div className="mx-6 mb-6 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
              Sell request queued. Payout of ${sellPayout} CAD will be processed when Stripe is live.
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-400">Prices in CAD. Stripe payment integration coming soon.</p>

      </div>
    </DashboardLayout>
  )
}
