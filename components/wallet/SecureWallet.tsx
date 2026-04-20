'use client'

import { useState } from 'react'
import { Wallet, Send, TrendingDown, Shield, TrendingUp, ArrowDownLeft } from 'lucide-react'

const SELL_RATE = 0.75
const BUY_RATE = 1.25

export default function SecureWallet() {
  const [tokenBalance, setTokenBalance] = useState(25.00)
  const [activeTab, setActiveTab] = useState<'send' | 'sell'>('send')
  const [recipient, setRecipient] = useState('')
  const [sendAmount, setSendAmount] = useState('')
  const [sellAmount, setSellAmount] = useState('')
  const [sellSuccess, setSellSuccess] = useState(false)
  const [sendSuccess, setSendSuccess] = useState(false)

  const transactions = [
    { id: 1, type: 'deposit', amount: 50.00, date: '2024-01-15', description: 'Initial deposit' },
    { id: 2, type: 'rental', amount: -25.00, date: '2024-01-14', description: 'Tool rental fee' },
    { id: 3, type: 'rental', amount: -15.00, date: '2024-01-13', description: 'Tool rental fee' },
    { id: 4, type: 'deposit', amount: 40.00, date: '2024-01-12', description: 'Token purchase' },
  ]

  const sellAmountNum = parseFloat(sellAmount) || 0
  const sellPayout = (sellAmountNum * SELL_RATE).toFixed(2)

  const handleSend = () => {
    if (!recipient || !sendAmount) return
    const amt = parseFloat(sendAmount)
    if (isNaN(amt) || amt <= 0 || amt > tokenBalance) return
    setTokenBalance(prev => parseFloat((prev - amt).toFixed(2)))
    setSendSuccess(true)
    setRecipient('')
    setSendAmount('')
    setTimeout(() => setSendSuccess(false), 3000)
  }

  const handleSell = () => {
    if (!sellAmount || sellAmountNum <= 0 || sellAmountNum > tokenBalance) return
    setTokenBalance(prev => parseFloat((prev - sellAmountNum).toFixed(2)))
    setSellSuccess(true)
    setSellAmount('')
    setTimeout(() => setSellSuccess(false), 4000)
  }

  return (
    <div className="space-y-6">

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-construction-amber to-yellow-400 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Wallet className="w-6 h-6" />
          <span className="text-sm font-semibold opacity-90 uppercase tracking-wide">ToolToken Balance</span>
        </div>
        <p className="text-5xl font-extrabold mb-1">{tokenBalance.toFixed(2)} TT</p>
        <p className="text-white/80 text-sm">
          Value: <strong>{(tokenBalance * BUY_RATE).toFixed(2)} CAD</strong> at $1.25/TT
        </p>
        <div className="flex gap-4 mt-4 text-xs text-white/70">
          <span>Buy rate: $1.25/TT</span>
          <span>·</span>
          <span>Sell rate: $0.75/TT</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-1" />
          <p className="text-lg font-bold text-deep-slate">90.00</p>
          <p className="text-xs text-gray-400">TT Received</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <TrendingDown className="w-5 h-5 text-red-400 mx-auto mb-1" />
          <p className="text-lg font-bold text-deep-slate">40.00</p>
          <p className="text-xs text-gray-400">TT Spent</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <Shield className="w-5 h-5 text-blue-500 mx-auto mb-1" />
          <p className="text-lg font-bold text-deep-slate">Protected</p>
          <p className="text-xs text-gray-400">Wallet Status</p>
        </div>
      </div>

      {/* Action Panel */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('send')}
            className={[
              'flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors',
              activeTab === 'send' ? 'bg-construction-amber text-white' : 'text-gray-500 hover:bg-gray-50'
            ].join(' ')}
          >
            <Send className="w-4 h-4" />
            Send Tokens
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={[
              'flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors',
              activeTab === 'sell' ? 'bg-red-500 text-white' : 'text-gray-500 hover:bg-gray-50'
            ].join(' ')}
          >
            <ArrowDownLeft className="w-4 h-4" />
            Sell Tokens
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'send' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Transfer ToolTokens to another ToolHive member.</p>
              {sendSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
                  Tokens sent successfully!
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Recipient</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={e => setRecipient(e.target.value)}
                  placeholder="e.g. john@toolhive.ca"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-construction-amber"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Amount (TT)</label>
                <input
                  type="number"
                  value={sendAmount}
                  onChange={e => setSendAmount(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-construction-amber"
                />
                <p className="text-xs text-gray-400 mt-1">Available: {tokenBalance.toFixed(2)} TT</p>
              </div>
              <button
                onClick={handleSend}
                disabled={!recipient || !sendAmount}
                className="w-full bg-construction-amber text-white font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Tokens
              </button>
            </div>
          )}

          {activeTab === 'sell' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                Sell unused ToolTokens at <strong>$0.75 / TT</strong>. Stripe payouts coming soon.
              </div>
              {sellSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
                  Sell request submitted! Payout will be processed when Stripe is live.
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Amount to Sell (TT)</label>
                <input
                  type="number"
                  value={sellAmount}
                  onChange={e => setSellAmount(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <p className="text-xs text-gray-400 mt-1">Available: {tokenBalance.toFixed(2)} TT</p>
              </div>
              {sellAmountNum > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tokens to sell</span>
                    <span className="font-semibold">{sellAmountNum.toFixed(2)} TT</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sell rate</span>
                    <span className="font-semibold">$0.75 / TT</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between">
                    <span className="font-bold text-gray-700">You receive</span>
                    <span className="font-extrabold text-green-600 text-lg">{sellPayout} CAD</span>
                  </div>
                </div>
              )}
              <button
                onClick={handleSell}
                disabled={!sellAmount || sellAmountNum <= 0 || sellAmountNum > tokenBalance}
                className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ArrowDownLeft className="w-4 h-4" />
                Sell Tokens
              </button>
              <p className="text-xs text-center text-gray-400">Stripe coming soon. Sell requests are queued.</p>
            </div>
          )}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-deep-slate">Recent Transactions</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {transactions.map(tx => (
            <div key={tx.id} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={[
                  'w-9 h-9 rounded-full flex items-center justify-center',
                  tx.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                ].join(' ')}>
                  {tx.amount > 0
                    ? <TrendingUp className="w-4 h-4 text-green-600" />
                    : <TrendingDown className="w-4 h-4 text-red-500" />
                  }
                </div>
                <div>
                  <p className="text-sm font-semibold text-deep-slate">{tx.description}</p>
                  <p className="text-xs text-gray-400">{tx.date}</p>
                </div>
              </div>
              <span className={[
                'font-bold text-sm',
                tx.amount > 0 ? 'text-green-600' : 'text-red-500'
              ].join(' ')}>
                {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)} TT
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
