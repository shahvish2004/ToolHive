'use client'

import { useState } from 'react'
import { Shield, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function SecureDepositLoop() {
  const [activeDeposits, setActiveDeposits] = useState([
    { id: 1, toolName: 'Heavy Duty Drill', depositAmount: 50.00, status: 'active', returnDate: '2024-01-20' },
    { id: 2, toolName: 'Circular Saw', depositAmount: 75.00, status: 'pending', returnDate: '2024-01-18' },
  ])

  const depositHistory = [
    { id: 1, toolName: 'Power Washer', depositAmount: 100.00, status: 'completed', completedDate: '2024-01-10' },
    { id: 2, toolName: 'Lawn Mower', depositAmount: 25.00, status: 'completed', completedDate: '2024-01-05' },
    { id: 3, toolName: 'Orbital Sander', depositAmount: 40.00, status: 'completed', completedDate: '2024-01-02' },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="text-blue-600" size={16} />
      case 'pending':
        return <AlertCircle className="text-yellow-600" size={16} />
      case 'completed':
        return <CheckCircle className="text-green-600" size={16} />
      default:
        return <Shield className="text-gray-600" size={16} />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active Rental'
      case 'pending':
        return 'Return Pending'
      case 'completed':
        return 'Completed'
      default:
        return 'Unknown'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-blue-600 bg-blue-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'completed':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-deep-slate mb-2">Secure Deposits</h2>
        <p className="text-gray-600">Manage your tool rental deposits and returns</p>
      </div>

      {/* Active Deposits */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-deep-slate">Active Deposits</h3>
          <Shield className="text-construction-amber" size={20} />
        </div>

        {activeDeposits.length === 0 ? (
          <div className="text-center py-8">
            <Shield className="text-gray-400 mx-auto mb-3" size={48} />
            <p className="text-gray-600">No active deposits</p>
            <p className="text-sm text-gray-500">Your active rental deposits will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeDeposits.map((deposit) => (
              <div key={deposit.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(deposit.status)}`}>
                    {getStatusIcon(deposit.status)}
                  </div>
                  <div>
                    <p className="font-medium text-deep-slate">{deposit.toolName}</p>
                    <p className="text-sm text-gray-600">Return by {deposit.returnDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-deep-slate">${deposit.depositAmount.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">{getStatusText(deposit.status)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Deposit History */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-deep-slate mb-4">Deposit History</h3>

        {depositHistory.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="text-gray-400 mx-auto mb-3" size={48} />
            <p className="text-gray-600">No deposit history</p>
            <p className="text-sm text-gray-500">Your completed deposits will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {depositHistory.map((deposit) => (
              <div key={deposit.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(deposit.status)}`}>
                    {getStatusIcon(deposit.status)}
                  </div>
                  <div>
                    <p className="font-medium text-deep-slate">{deposit.toolName}</p>
                    <p className="text-sm text-gray-600">Completed on {deposit.completedDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">+${deposit.depositAmount.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Refunded</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="text-blue-600 mt-1" size={20} />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">How Deposits Work</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>Deposits are automatically held when you rent tools</li>
              <li>Deposits are refunded upon successful tool return</li>
              <li>Deposits may be deducted for damage or late returns</li>
              <li>All deposits are processed securely through our system</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
