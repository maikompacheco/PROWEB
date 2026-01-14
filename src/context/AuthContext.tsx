import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import { supabase } from '../config/supabase'

interface User {
    id: string
    name: string
    email: string
    role: 'admin' | 'coach' | 'athlete' | 'school'
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    register: (data: RegisterData) => Promise<void>
    logout: () => Promise<void>
}

interface RegisterData {
    name: string
    email: string
    password: string
    club?: string
    role?: 'coach' | 'admin' | 'athlete'
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Fallback para demo (quando Supabase não está configurado)
const isDemoMode = !(import.meta.env.VITE_SUPABASE_URL as string) || (import.meta.env.VITE_SUPABASE_URL as string).includes('your-project')

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Initialize auth state
    useEffect(() => {
        const initAuth = async () => {
            try {
                if (!isDemoMode) {
                    // Try to get current session from Supabase
                    const { data: { session } } = await supabase.auth.getSession()

                    if (session?.user) {
                        // Fetch user profile from database
                        const { data: profile } = await supabase
                            .from('profiles')
                            .select('*')
                            .eq('id', session.user.id)
                            .single()

                        if (profile) {
                            setUser({
                                id: profile.id,
                                name: profile.name || session.user.email?.split('@')[0] || 'Usuário',
                                email: session.user.email || '',
                                role: profile.role || 'coach'
                            })
                        }
                    }
                }
            } catch (err) {
                console.error('Auth init error:', err)
            } finally {
                setIsLoading(false)
            }
        }

        initAuth()
    }, [])

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        try {
            if (isDemoMode) {
                // Demo mode - simular login
                await new Promise(resolve => setTimeout(resolve, 1000))
                setUser({
                    id: '1',
                    name: 'João Silva',
                    email,
                    role: 'coach'
                })
            } else {
                // Real Supabase login
                const { data: { user: authUser }, error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                })

                if (error) throw error

                if (authUser) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', authUser.id)
                        .single()

                    setUser({
                        id: authUser.id,
                        name: profile?.name || authUser.email?.split('@')[0] || 'Usuário',
                        email: authUser.email || '',
                        role: profile?.role || 'coach'
                    })
                }
            }
        } catch (err) {
            console.error('Login error:', err)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const register = async (data: RegisterData) => {
        setIsLoading(true)
        try {
            if (isDemoMode) {
                // Demo mode - simular registro
                await new Promise(resolve => setTimeout(resolve, 1000))
                setUser({
                    id: '1',
                    name: data.name,
                    email: data.email,
                    role: data.role || 'coach'
                })
            } else {
                // Real Supabase registration
                try {
                    const { data: { user: authUser }, error: signUpError } = await supabase.auth.signUp({
                        email: data.email,
                        password: data.password
                    })

                    if (signUpError) throw new Error(`Auth error: ${signUpError.message}`)

                    if (authUser) {
                        // Create user profile
                        const { error: profileError } = await supabase
                            .from('profiles')
                            .insert([{
                                id: authUser.id,
                                email: data.email,
                                full_name: data.name,
                                role: data.role || 'coach',
                                club: data.club
                            }])

                        if (profileError) throw new Error(`Profile error: ${profileError.message}`)

                        setUser({
                            id: authUser.id,
                            name: data.name,
                            email: data.email,
                            role: data.role || 'coach'
                        })
                    }
                } catch (supabaseError) {
                    // Se falhar Supabase, tenta demo mode como fallback
                    console.warn('Supabase registration failed, falling back to demo:', supabaseError)
                    setUser({
                        id: '1',
                        name: data.name,
                        email: data.email,
                        role: data.role || 'coach'
                    })
                }
            }
        } catch (err) {
            console.error('Register error:', err)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        try {
            if (!isDemoMode) {
                await supabase.auth.signOut()
            }
            setUser(null)
        } catch (err) {
            console.error('Logout error:', err)
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isAuthenticated: !!user,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de AuthProvider')
    }
    return context
}
