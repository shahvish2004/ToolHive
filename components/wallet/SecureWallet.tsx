'use client'

import { useState } from 'react'
import { Wallet, Send, Download, Shield, TrendingUp } from 'lucide-react'

export default function SecureWallet() {
  const [tokenBalance, setTokenBalance] = useState(25.00)
  const [showTransactionForm, setShowTransactionForm] = useState(false)
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')

  const transactions = [
    { id: 1, type: 'deposit', amount: 50.00, date: '2024-01-15', description: 'Initial deposit' },
    { id: 2, type: 'rental', amount: -25.00, date: '2024-01-14', description: 'Tool rental fee' },
    { id: 3, type: 'rental', amount: -15.00, date: '2024-01-13', description: 'Tool rental fee' },
    { id: 4, type: 'deposit', amount: 40.00, date: '2024-01-12', description: 'Token purchase' },
  ]

  const handleTransaction = () => {
    if (!recipient || !amount) return
    
    console.log('Processing transaction:', { recipient, amount })
    alert(`Transaction of ${amount} ToolTokens to ${recipient} processed!`)
    setRecipient('')
    setAmount('')
    setShowTransactionForm(false)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-deep-slate mb-2">Secure Wallet</h2>
        <p className="text-gray-600">Manage your ToolTokens and transaction history</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-construction-amber to-construction-amber-light rounded-xl p-6 text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">Current Balance</p>
            <p className="text-3xl font-bold">${tokenBalance.toFixed(2)}</p>
            <p className="text-sm opacity-90 mt-1">ToolTokens</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Wallet size={32} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => setShowTransactionForm(true)}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <Send className="text-construction-amber mb-2" size={24} />
          <p className="font-medium text-deep-slate">Send Tokens</p>
          <p className="text-sm text-gray-600">Transfer tokens to other users</p>
        </button>

        <button className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <Download className="text-construction-amber mb-2" size={24} />
          <p className="font-medium text-deep-slate">Receive Tokens</p>
          <p className="text-sm text-gray-600">Get tokens from other users</p>
        </button>

        <button className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <TrendingUp className="text-construction-amber mb-2" size={24} />
          <p className="font-medium text-deep-slate">Buy Tokens</p>
          <p className="text-sm text-gray-600">Purchase more ToolTokens</p>
        </button>
      </div>

      {/* Transaction Form */}
      {showTransactionForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-deep-slate mb-4">Send ToolTokens</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Email</label>
              <input
                type="email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="user@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-construction-amber focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0.01"
                max={tokenBalance}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-construction-amber focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleTransaction}
                disabled={!recipient || !amount || parseFloat(amount) > tokenBalance}
                className="bg-construction-amber text-white px-6 py-2 rounded-lg font-medium hover:bg-construction-amber-light disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Send Tokens
              </button>
              <button
                onClick={() => setShowTransactionForm(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction History */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-deep-slate">Transaction History</h3>
          <Shield className="text-construction-amber" size={20} />
        </div>
        
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'deposit' ? (
                    <Download className="text-green-600" size={16} />
                  ) : (
                    <Send className="text-red-600" size={16} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-deep-slate">{transaction.description}</p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
              </div>
              <div className={`font-medium ${
                transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'deposit' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
