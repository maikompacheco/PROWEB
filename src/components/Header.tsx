import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import BaseONELogoBrand from './BaseONELogoBrand'
import NotificationBell from './NotificationBell'
import ThemeToggle from './ThemeToggle'
import { useNotifications } from '../context/NotificationContext'

export default function Header() {
    const { user, logout } = useAuth()
    const { theme } = useTheme()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const { notifications, markAllAsRead } = useNotifications()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const isDark = theme === 'dark'

    return (
        <header
            className={`sticky top-0 z-40 h-16 border-b transition-all duration-200 backdrop-blur-md ${isDark
                ? 'bg-gradient-to-r from-neutral-950 via-blue-950/30 to-neutral-950 border-blue-500/20 shadow-lg shadow-blue-500/10'
                : 'bg-gradient-to-r from-neutral-50 via-blue-50/30 to-neutral-50 border-blue-200/50 shadow-lg shadow-blue-200/10'
                }`}
        >
            <div className="h-full max-w-[1920px] mx-auto px-4 sm:px-6 flex items-center justify-between">
                {/* Logo - Premium Style */}
                <Link
                    to="/"
                    className={`group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 flex-shrink-0 ${isDark
                        ? 'hover:bg-blue-950/40 hover:shadow-lg hover:shadow-blue-500/20'
                        : 'hover:bg-blue-100/50 hover:shadow-lg hover:shadow-blue-400/20'
                        }`}
                >
                    <BaseONELogoBrand size="md" variant={isDark ? 'light' : 'dark'} showText={true} />
                </Link>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Actions - Aligned Right */}
                <div className="flex items-center gap-1 sm:gap-3">
                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {/* Notifications */}
                    {user && (
                        <NotificationBell notifications={notifications} onClear={markAllAsRead} />
                    )}

                    {/* Separator */}
                    {user && <div className={`w-px h-6 ${isDark ? 'bg-neutral-700' : 'bg-neutral-300'}`} />}

                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${isDark
                                    ? 'hover:bg-blue-950/40 text-neutral-100'
                                    : 'hover:bg-blue-100/50 text-neutral-900'
                                    }`}
                                aria-label="Menu do usuário"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400 text-white flex items-center justify-center font-bold text-sm">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <svg
                                    className={`w-4 h-4 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {menuOpen && (
                                <div
                                    className={`absolute right-0 top-12 w-48 border rounded-lg shadow-lg z-50 overflow-hidden backdrop-blur-sm ${isDark
                                        ? 'bg-neutral-900/95 border-neutral-800'
                                        : 'bg-white/95 border-neutral-200'
                                        }`}
                                >
                                    <Link
                                        to="/profile"
                                        onClick={() => setMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${isDark
                                            ? 'text-neutral-200 hover:bg-blue-950/50'
                                            : 'text-neutral-700 hover:bg-blue-50/50'
                                            }`}
                                    >
                                        <span>👤</span>
                                        Perfil
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-medium transition-colors ${isDark
                                            ? 'text-red-400 hover:bg-red-950/30'
                                            : 'text-red-600 hover:bg-red-50'
                                            }`}
                                    >
                                        <span>🚪</span>
                                        Sair
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link
                                to="/login"
                                className={`px-4 py-2 text-sm font-medium transition-colors ${isDark ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-600 hover:text-neutral-900'
                                    }`}
                            >
                                Entrar
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all"
                            >
                                Criar conta
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
