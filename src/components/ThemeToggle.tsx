import React from 'react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
    const { themeMode, setThemeMode, theme } = useTheme()

    const isDark = theme === 'dark'

    return (
        <div className={`flex items-center rounded-lg border transition-colors ${isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-white'
            }`}>
            <button
                onClick={() => setThemeMode('light')}
                className={`px-3 py-2 rounded-l-lg text-xs font-medium transition-all ${themeMode === 'light'
                        ? isDark
                            ? 'bg-primary-600/20 text-primary-400'
                            : 'bg-primary-50 text-primary-600'
                        : isDark
                            ? 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800'
                            : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50'
                    }`}
                aria-label="Tema claro"
                title="Claro"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5" strokeWidth="2" />
                    <path strokeWidth="2" strokeLinecap="round" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
            </button>

            <button
                onClick={() => setThemeMode('dark')}
                className={`px-3 py-2 text-xs font-medium transition-all border-x ${isDark ? 'border-neutral-800' : 'border-neutral-200'
                    } ${themeMode === 'dark'
                        ? isDark
                            ? 'bg-primary-600/20 text-primary-400'
                            : 'bg-primary-50 text-primary-600'
                        : isDark
                            ? 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800'
                            : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50'
                    }`}
                aria-label="Tema escuro"
                title="Escuro"
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
            </button>

            <button
                onClick={() => setThemeMode('system')}
                className={`px-3 py-2 rounded-r-lg text-xs font-medium transition-all ${themeMode === 'system'
                        ? isDark
                            ? 'bg-primary-600/20 text-primary-400'
                            : 'bg-primary-50 text-primary-600'
                        : isDark
                            ? 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800'
                            : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50'
                    }`}
                aria-label="Tema do sistema"
                title="Sistema"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" strokeLinecap="round" />
                </svg>
            </button>
        </div>
    )
}
