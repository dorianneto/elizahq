import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './routes.ts'
import AuthProvider from './auth/auth-context.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
)
