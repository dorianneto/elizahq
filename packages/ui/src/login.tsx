import '@cloudscape-design/global-styles/index.css'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useEffect } from 'react'

import { useAuth } from './auth/auth-context'
import { supabase } from './auth/supabase-client'
import { Navigate } from 'react-router'

export default function Login() {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/" replace />
  }

  return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
}
