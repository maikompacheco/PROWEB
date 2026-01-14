import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'

type ThemeMode = 'light' | 'dark' | 'system'
type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    themeMode: ThemeMode
    setThemeMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [themeMode, setThemeModeState] = useState<ThemeMode>('system')
    const [theme, setTheme] = useState<Theme>('dark')

    // Carrega tema salvo do localStorage
    useEffect(() => {
        const savedMode = localStorage.getItem('themeMode') as ThemeMode | null
        if (savedMode) {
            setThemeModeState(savedMode)
        }
    }, [])

    // Atualiza tema baseado no modo
    useEffect(() => {
        let resolvedTheme: Theme

        if (themeMode === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            resolvedTheme = prefersDark ? 'dark' : 'light'

            // Listener para mudanças no tema do sistema
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            const handleChange = (e: MediaQueryListEvent) => {
                setTheme(e.matches ? 'dark' : 'light')
            }
            mediaQuery.addEventListener('change', handleChange)
            return () => mediaQuery.removeEventListener('change', handleChange)
        } else {
            resolvedTheme = themeMode
        }

        setTheme(resolvedTheme)
    }, [themeMode])

    // Atualiza o atributo data-theme do document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('themeMode', themeMode)
    }, [theme, themeMode])

    const setThemeMode = (mode: ThemeMode) => {
        setThemeModeState(mode)
    }

    return (
        <ThemeContext.Provider value={{ theme, themeMode, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme deve ser usado dentro de ThemeProvider')
    }
    return context
}
