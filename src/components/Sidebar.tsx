import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

interface NavItem {
    label: string
    path: string
    icon: string
    badge?: string
}

export default function Sidebar() {
    const { user } = useAuth()
    const { theme } = useTheme()
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)

    const isDark = theme === 'dark'

    const navItems: NavItem[] = [
        { label: 'Dashboard', path: '/dashboard', icon: '📊' },
        { label: 'Atletas', path: '/athletes', icon: '👥' },
        { label: 'Equipes', path: '/teams', icon: '⚽' },
        { label: 'Insights', path: '/ai-assistant', icon: '💡' }
    ]

    if (!user) return null

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`md:hidden fixed top-20 left-4 z-50 p-3 rounded-lg transition-all duration-300 ${isDark
                    ? 'bg-neutral-800 hover:bg-neutral-700 border border-neutral-700'
                    : 'bg-white hover:bg-neutral-100 border border-neutral-200'
                    }`}
                aria-label="Toggle sidebar"
            >
                <svg
                    className={`w-6 h-6 ${isDark ? 'text-neutral-200' : 'text-neutral-700'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Sidebar */}
            <aside
                className={`${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0 fixed md:static top-0 left-0 h-[calc(100vh-64px)] w-64 
                    ${isDark
                        ? 'bg-gradient-to-b from-neutral-950 via-blue-950/10 to-neutral-950 border-blue-500/20 shadow-lg shadow-blue-500/5'
                        : 'bg-gradient-to-b from-neutral-50 via-blue-50/20 to-neutral-50 border-blue-200/40 shadow-lg shadow-blue-200/5'
                    } 
                    border-r transition-all duration-300 z-40 pt-20 md:pt-0 flex flex-col`}
            >
                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map(item => {
                        const isActive = location.pathname === item.path
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${isActive
                                    ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 scale-105'
                                    : isDark
                                        ? 'text-neutral-400 hover:text-neutral-100 hover:bg-blue-950/40 hover:shadow-lg hover:shadow-blue-500/10'
                                        : 'text-neutral-600 hover:text-blue-600 hover:bg-blue-100/50 hover:shadow-lg hover:shadow-blue-200/20'
                                    }`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span className="flex-1">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Footer */}
                <div
                    className={`px-4 py-4 border-t text-xs text-center backdrop-blur-sm ${isDark
                        ? 'border-blue-500/20 bg-blue-950/10'
                        : 'border-blue-200/40 bg-blue-100/20'
                        }`}
                >
                    <p className={`font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent`}>BaseONE Sports</p>
                    <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-600'} mt-1`}>Professional v1.0</p>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30 pt-20"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    )
}
