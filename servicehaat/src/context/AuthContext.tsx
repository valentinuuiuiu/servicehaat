

'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '@/lib/firebase'
import { User, onAuthStateChanged } from 'firebase/auth'

type UserRole = 'customer' | 'provider' | 'admin'

interface AppUser extends User {
  role?: UserRole
  businessName?: string
}

interface AuthContextType {
  user: AppUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, role: UserRole) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email: string, password: string, role: UserRole) => {
    setLoading(true)
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password)
      setUser({ ...userCredential.user, role } as AppUser)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await auth.signOut()
      setUser(null)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user as AppUser | null)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

