import { AuthError, User } from '@supabase/supabase-js'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { supabase } from './supabase-client'

type AuthContextParams = {
  user: User | null
  signOut: () => Promise<{ error: AuthError | null }>
}

const AuthContext = createContext<AuthContextParams | undefined>(undefined)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null)
        setLoading(false)
      },
    )
    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (!error) {
      setUser(null)
    }

    return { error }
  }

  const values = {
    user,
    signOut,
  }
  return (
    <AuthContext.Provider value={values}>
      {!loading ? children : 'loading...'}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export default AuthProvider
