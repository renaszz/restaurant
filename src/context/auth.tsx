import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'
import { useRouter, useSegments } from 'expo-router'
import { api } from '@/app/server/api'
import { isAxiosError } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthData {
  id: string
  nome?: string
  email: string
  endereco?: string
}

type AuthContextData = {
  user?: AuthData
  admin?: AuthData
  errorMessage: string | null
  signIn(email: string, password: string): Promise<void>
  signUp(nome: string, email: string, password: string): Promise<void>
  signOut(): void
  signInAdmin(email: string, password: string): Promise<void>
  signOutAdmin(): void
  setUser: React.Dispatch<React.SetStateAction<AuthData | undefined>>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthData | undefined>()
  const [admin, setAdmin] = useState<AuthData | undefined>()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    const loadStorageData = async () => {
      const storedUser = await AsyncStorage.getItem('@AuthData')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
      const storedAdmin = await AsyncStorage.getItem('@AdminAuthData')
      if (storedAdmin) {
        setAdmin(JSON.parse(storedAdmin))
      }
    }

    loadStorageData()
  }, [])

  useEffect(() => {
    setErrorMessage(null)
  }, [segments])

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post('/signIn', { email, password })
      const userData = response.data.user
      setUser(userData)
      await AsyncStorage.setItem('@AuthData', JSON.stringify(userData))
      router.replace('(tabs)')
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMessage(error.response?.data.error)
      }
    }
  }

  async function signUp(nome: string, email: string, password: string) {
    try {
      const response = await api.post('/signUp', { nome, email, password })
      const userData = response.data.user
      setUser(userData)
      await AsyncStorage.setItem('@AuthData', JSON.stringify(userData))
      router.replace('(tabs)')
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMessage(error.response?.data.error)
      }
    }
  }

  function signOut() {
    setUser(undefined)
    AsyncStorage.removeItem('@AuthData')
    router.replace('/')
  }

  async function signInAdmin(email: string, password: string) {
    try {
      const response = await api.post('/admin/loginAdmin', { email, password })
      const adminData = response.data.admin
      setAdmin(adminData)
      await AsyncStorage.setItem('@AdminAuthData', JSON.stringify(adminData))
      router.replace('(admin)')
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMessage(error.response?.data.error)
      }
    }
  }
  function signOutAdmin() {
    setAdmin(undefined)
    AsyncStorage.removeItem('@AdminAuthData')
    router.replace('/')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        admin,
        errorMessage,
        signIn,
        signUp,
        signOut,
        signInAdmin,
        signOutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
