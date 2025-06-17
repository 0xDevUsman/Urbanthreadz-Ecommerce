"use client"

import type React from "react"

import { createContext, useContext, useReducer, useEffect } from "react"
import type { User } from "@/types/user"

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_USER"; payload: User | null }
  | { type: "UPDATE_USER"; payload: Partial<User> }
  | { type: "LOGOUT" }

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      }
    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      }
    case "LOGOUT":
      return {
        user: null,
        isLoading: false,
        isAuthenticated: false,
      }
    default:
      return state
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem("urbanthreadz-user")
        if (savedUser) {
          const user = JSON.parse(savedUser)
          dispatch({ type: "SET_USER", payload: user })
        } else {
          dispatch({ type: "SET_LOADING", payload: false })
        }
      } catch (error) {
        console.error("Error checking auth:", error)
        dispatch({ type: "SET_LOADING", payload: false })
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Demo credentials
      if (email === "demo@urbanthreadz.com" && password === "demo123") {
        const user: User = {
          id: "user_1",
          name: "John Doe",
          email: "demo@urbanthreadz.com",
          avatar: "",
          createdAt: "2023-01-15",
          totalOrders: 12,
          totalSpent: 1247.89,
          membershipTier: "Premium",
          nextTierThreshold: 2000,
          wishlistCount: 8,
          rewardPoints: 1248,
          recentActivity: [
            { action: "Placed order #ORD-2024-003", date: "2 days ago", amount: "79.99" },
            { action: "Added item to wishlist", date: "1 week ago" },
            { action: "Placed order #ORD-2024-002", date: "2 weeks ago", amount: "199.99" },
            { action: "Updated shipping address", date: "3 weeks ago" },
          ],
        }

        localStorage.setItem("urbanthreadz-user", JSON.stringify(user))
        dispatch({ type: "SET_USER", payload: user })
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false })
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user: User = {
        id: `user_${Date.now()}`,
        name,
        email,
        avatar: "",
        createdAt: new Date().toISOString(),
        totalOrders: 0,
        totalSpent: 0,
        membershipTier: "Standard",
        nextTierThreshold: 500,
        wishlistCount: 0,
        rewardPoints: 100, // Welcome bonus
        recentActivity: [
          { action: "Account created", date: "Just now" },
          { action: "Welcome bonus added", date: "Just now", amount: "100 points" },
        ],
      }

      localStorage.setItem("urbanthreadz-user", JSON.stringify(user))
      dispatch({ type: "SET_USER", payload: user })
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false })
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("urbanthreadz-user")
    dispatch({ type: "LOGOUT" })
  }

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: "UPDATE_USER", payload: userData })
    if (state.user) {
      const updatedUser = { ...state.user, ...userData }
      localStorage.setItem("urbanthreadz-user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
