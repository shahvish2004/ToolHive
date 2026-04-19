export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          created_at: string
          updated_at: string
          is_founding_member: boolean
          avatar_url: string | null
        }
        Insert: {
          id?: string
          email: string
          name: string
          created_at?: string
          updated_at?: string
          is_founding_member?: boolean
          avatar_url?: string | null
        }
        Update: {
          id?: string
          email?: string
          name?: string
          created_at?: string
          updated_at?: string
          is_founding_member?: boolean
          avatar_url?: string | null
        }
      }
      tool_balances: {
        Row: {
          id: string
          user_id: string
          balance: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          balance: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          balance?: number
          created_at?: string
          updated_at?: string
        }
      }
      tools: {
        Row: {
          id: string
          name: string
          description: string
          category: string
          icon: string | null
          daily_rate_tt: number
          owner_id: string | null
          is_hive_hub: boolean
          available_count: number
          total_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          category: string
          icon?: string | null
          daily_rate_tt: number
          owner_id?: string | null
          is_hive_hub: boolean
          available_count: number
          total_count: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          category?: string
          icon?: string | null
          daily_rate_tt?: number
          owner_id?: string | null
          is_hive_hub?: boolean
          available_count?: number
          total_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      rentals: {
        Row: {
          id: string
          tool_id: string
          renter_id: string
          owner_id: string | null
          start_date: string
          end_date: string
          deposit_held: number
          rental_cost_tt: number
          status: 'pending' | 'active' | 'completed' | 'cancelled'
          deposit_released: boolean
          photo_verification_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          renter_id: string
          owner_id?: string | null
          start_date: string
          end_date: string
          deposit_held: number
          rental_cost_tt: number
          status?: 'pending' | 'active' | 'completed' | 'cancelled'
          deposit_released?: boolean
          photo_verification_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          renter_id?: string
          owner_id?: string | null
          start_date?: string
          end_date?: string
          deposit_held?: number
          rental_cost_tt?: number
          status?: 'pending' | 'active' | 'completed' | 'cancelled'
          deposit_released?: boolean
          photo_verification_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          rental_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          rental_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          rental_id?: string
          reviewer_id?: string
          reviewee_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
      maintenance_logs: {
        Row: {
          id: string
          tool_id: string
          user_id: string
          description: string
          photo_url: string | null
          tokens_earned: number
          verified: boolean
          created_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          user_id: string
          description: string
          photo_url?: string | null
          tokens_earned: number
          verified?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          user_id?: string
          description?: string
          photo_url?: string | null
          tokens_earned?: number
          verified?: boolean
          created_at?: string
        }
      }
      token_transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          type: 'purchase' | 'reward' | 'rental_payment' | 'deposit_refund'
          description: string
          reference_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          type: 'purchase' | 'reward' | 'rental_payment' | 'deposit_refund'
          description: string
          reference_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          type?: 'purchase' | 'reward' | 'rental_payment' | 'deposit_refund'
          description?: string
          reference_id?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
