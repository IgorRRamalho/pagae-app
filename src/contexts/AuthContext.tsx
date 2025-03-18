// contexts/AuthContext.tsx
import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

interface AuthContextType {
  currentUser: any // Substitua por seu tipo de usuário
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Aqui você pode adicionar a lógica para verificar autenticação persistente
    const unsubscribe = () => {
      setCurrentUser(null)
      setLoading(false)
    }
    return unsubscribe
  }, [])

  async function login(email: string, password: string) {
    // Adicione sua lógica de login aqui
  }

  async function logout() {
    // Adicione sua lógica de logout aqui
  }

  const value = {
    currentUser,
    loading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}