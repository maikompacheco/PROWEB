import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import Button from './Button'

interface UserProfileMenuProps {
    userName?: string
    userRole?: string
    onLogout: () => void
}

export default function UserProfileMenu({ userName = 'User', userRole = 'Coordenador', onLogout }: UserProfileMenuProps) {
    const { theme } = useTheme()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const menuItems = [
        { label: 'Meu Perfil', action: () => { navigate('/profile'); setIsOpen(false) } },
        { label: 'Gerenciar Treinadores', action: () => { navigate('/coaches'); setIsOpen(false) } },
        { label: 'Configurações', action: () => { navigate('/settings'); setIsOpen(false) } },
        { label: 'Sair', action: () => { onLogout(); setIsOpen(false) } }
    ]

    return (
        <div className="relative">
            {/* Avatar Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${theme === 'dark'
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-100'
                        : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                    }`}
            >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${theme === 'dark'
                        ? 'bg-accent-500/20 text-accent-400'
                        : 'bg-accent-500/20 text-accent-600'
                    }`}>
                    {userName.charAt(0).toUpperCase()}
                </div>

                {/* Text (hidden on mobile) */}
                <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold">{userName}</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        {userRole}
                    </p>
                </div>

                {/* Chevron */}
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className={`absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg z-50 ${theme === 'dark'
                            ? 'bg-slate-800 border border-slate-700'
                            : 'bg-white border border-slate-200'
                        }`}
                >
                    {menuItems.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={item.action}
                            className={`w-full text-left px-4 py-3 transition-colors ${idx === menuItems.length - 1 ? 'border-t' : ''
                                } ${theme === 'dark'
                                    ? `${idx === menuItems.length - 1 ? 'border-slate-700' : ''} hover:bg-slate-700 text-slate-100`
                                    : `${idx === menuItems.length - 1 ? 'border-slate-200' : ''} hover:bg-slate-100 text-slate-900`
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Backdrop to close menu */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    )
}
