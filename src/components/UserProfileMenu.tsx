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
        { label: '🚺 Sair', action: () => { onLogout(); setIsOpen(false) }, isDanger: true }
    ]

    return (
        <div className="relative flex items-center">
            {/* Avatar Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all border ${theme === 'dark'
                    ? 'bg-dark-900 hover:bg-dark-800 text-white border-dark-700'
                    : 'bg-white hover:bg-slate-100 text-slate-900 border-slate-200'
                    } shadow-sm`}
            >
                {/* Avatar */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg ${theme === 'dark'
                    ? 'bg-accent-500 text-white'
                    : 'bg-accent-500 text-white'
                    }`}>
                    {userName.charAt(0).toUpperCase()}
                </div>
                {/* Text (hidden on mobile) */}
                <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold leading-tight">{userName}</p>
                    <p className={`text-xs leading-tight ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{userRole}</p>
                </div>
                {/* Chevron */}
                <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </button>
            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className={`absolute right-0 top-full mt-2 min-w-[10rem] rounded-lg shadow-lg z-50 ${theme === 'dark'
                        ? 'bg-dark-900 border border-dark-700'
                        : 'bg-white border border-slate-200'
                        }`}
                    style={{ maxWidth: '200px' }}
                >
                    {menuItems.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={item.action}
                            className={`w-full text-left px-4 py-3 transition-colors font-medium rounded-lg ${theme === 'dark'
                                ? 'hover:bg-red-900/30 text-red-400 hover:text-red-300'
                                : 'hover:bg-red-50 text-red-600 hover:text-red-700'
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
