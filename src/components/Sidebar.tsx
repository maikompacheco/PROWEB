import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

interface NavItem {
    label: string
    path: string
    icon: string
}

export default function Sidebar() {
    const { user } = useAuth()
    const { theme } = useTheme()
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)

    const navItems: NavItem[] = [
        { label: 'Dashboard', path: '/dashboard', icon: '📊' },
        { label: 'Atletas', path: '/athletes', icon: '🏃' },
        { label: 'Equipes', path: '/teams', icon: '👥' }
    ]

    if (!user) return null

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-20 left-4 z-30 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                aria-label="Toggle sidebar"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Sidebar */}
            <aside
                className={`${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 fixed md:static top-0 left-0 h-screen w-64 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'} border-r transition-transform duration-300 z-20 pt-20 md:pt-0`}
            >
                <nav className="p-4 sm:p-6 space-y-2">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 rounded-lg transition-colors font-medium text-sm ${location.pathname === item.path
                                ? 'bg-blue-600 text-white shadow-lg'
                                : theme === 'dark'
                                    ? 'text-slate-400 hover:text-cyan-400 hover:bg-slate-800'
                                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-200'
                                }`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* User Info */}
                <div className={`absolute bottom-6 left-6 right-6 p-4 rounded-lg border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <p className={`font-semibold text-sm ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>{user.name}</p>
                    <p className={`text-xs capitalize ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>{user.role}</p>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-10 pt-20"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    )
}
