'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useSupabase } from './SupabaseProvider'

// Mock User type for development
interface User {
  id: string
  email?: string
  user_metadata?: {
    name?: string
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { supabase } = useSupabase()

  useEffect(() => {
    // Simulate user session for demo
    const mockUser: User = {
      id: 'demo-user',
      email: 'demo@toolhive.com',
      user_metadata: {
        name: 'Demo User'
      }
    }
    
    setTimeout(() => {
      setUser(mockUser)
      setLoading(false)
    }, 1000)
  }, [supabase])

  const signOut = async () => {
    setUser(null)
  }

  const signIn = async (email: string, password: string) => {
    // Mock sign in
    const mockUser: User = {
      id: 'demo-user',
      email: email,
      user_metadata: {
        name: email.split('@')[0]
      }
    }
    setUser(mockUser)
    return { error: null }
  }

  const signUp = async (email: string, password: string, name: string) => {
    // Mock sign up
    const mockUser: User = {
      id: 'demo-user',
      email: email,
      user_metadata: {
        name: name
      }
    }
    setUser(mockUser)
    return { error: null }
  }

  const value = {
    user,
    loading,
    signOut,
    signIn,
    signUp,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
