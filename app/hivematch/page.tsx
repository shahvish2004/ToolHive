'use client'

import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Users, PlusCircle, Search, Shield, Camera, Zap } from 'lucide-react'

export default function HiveMatchPage() {
  const router = useRouter()

  return (
    <DashboardLayout title="HiveMatch™" subtitle="Neighbour-to-Neighbour Tool Sharing">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Hero */}
        <div className="bg-gradient-to-r from-deep-slate to-slate-700 rounded-xl p-8 text-white text-center">
          <div className="w-16 h-16 bg-construction-amber/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={32} className="text-construction-amber" />
          </div>
          <h2 className="text-3xl font-bold mb-2">HiveMatch™</h2>
          <p className="text-sm opacity-80 max-w-xl mx-auto">
            ToolHive™ connects neighbours directly. List your idle tools and earn, or find tools nearby — all protected by our Secure Deposit Loop™.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-8 max-w-sm mx-auto">
            {[
              { value: '47', label: 'Active Lenders' },
              { value: '2.1km', label: 'Avg. Distance' },
              { value: '4.8★', label: 'Avg. Rating' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/10 rounded-lg p-3">
                <p className="text-xl font-bold text-construction-amber">{stat.value}</p>
                <p className="text-xs opacity-70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Two main actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* List a Tool */}
          <div
            onClick={() => router.push('/hivematch/list')}
            className="bg-white rounded-xl border-2 border-construction-amber shadow-sm p-8 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all group"
          >
            <div className="w-14 h-14 bg-construction-amber/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-construction-amber/20 transition-colors">
              <PlusCircle size={28} className="text-construction-amber" />
            </div>
            <h3 className="text-xl font-bold text-deep-slate mb-2">List Your Tool 🐝</h3>
            <p className="text-sm text-gray-500 mb-6">
              Turn your idle tools into income. Set your daily rate, upload photos, and let neighbours find you.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                'Upload up to 5 photos',
                'Set your daily ToolToken rate',
                'Vicinity only — address stays private',
                'You approve every rental request',
              ].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-construction-amber rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 bg-construction-amber text-white rounded-lg font-medium hover:opacity-90">
              List a Tool →
            </button>
          </div>

          {/* Browse Tools */}
          <div
            onClick={() => router.push('/hivematch/browse')}
            className="bg-white rounded-xl border-2 border-gray-200 shadow-sm p-8 cursor-pointer hover:border-construction-amber hover:shadow-lg hover:scale-[1.02] transition-all group"
          >
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
              <Search size={28} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-deep-slate mb-2">Find a Tool Nearby</h3>
            <p className="text-sm text-gray-500 mb-6">
              Browse tools listed by your neighbours. Request, deposit, pickup — all in one flow.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                'Search by tool, category, or neighbourhood',
                'See vicinity — exact address after deposit',
                'Deposit held securely via Stripe',
                'Photo condition check on pickup & return',
              ].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 bg-deep-slate text-white rounded-lg font-medium hover:opacity-90">
              Browse Tools →
            </button>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-deep-slate mb-6 text-center">How HiveMatch™ Works</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: PlusCircle, label: 'List',    desc: 'Owner lists tool with photos & vicinity',  color: 'bg-amber-100 text-amber-600' },
              { icon: Zap,        label: 'Match',   desc: 'Platform matches renter with nearby tool', color: 'bg-blue-100 text-blue-600' },
              { icon: Shield,     label: 'Deposit', desc: 'Secure hold placed, address revealed',     color: 'bg-green-100 text-green-600' },
              { icon: Camera,     label: 'Photos',  desc: 'Condition photos on pickup & return',      color: 'bg-purple-100 text-purple-600' },
            ].map(step => (
              <div key={step.label} className="text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${step.color}`}>
                  <step.icon size={20} />
                </div>
                <p className="font-semibold text-deep-slate text-sm">{step.label}</p>
                <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust banner */}
        <div className="bg-construction-amber/10 border border-construction-amber/20 rounded-xl p-4 flex items-start gap-3">
          <Shield className="text-construction-amber flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-semibold text-deep-slate">Protected by Secure Deposit Loop™</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Every HiveMatch™ transaction is backed by our automated credit card hold system. Powered by Stripe.
            </p>
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}