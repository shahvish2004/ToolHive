'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import SecureWallet from '@/components/wallet/SecureWallet'

export default function WalletPage() {
  return (
    <DashboardLayout title="Secure Wallet" subtitle="Manage your ToolTokens">
      <SecureWallet />
    </DashboardLayout>
  )
}
