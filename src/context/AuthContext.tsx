import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { type User } from '../data/users'
import { getSession, saveSession, clearSession } from '../utils/auth'

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const session = getSession()
    if (session) setUser(session)
  }, [])

  function login(loggedInUser: User) {
    saveSession(loggedInUser)
    setUser(loggedInUser)
  }

  function logout() {
    clearSession()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
