import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import BaseOneLogo from './BaseOneLogo'

export default function Header() {
    const { user, logout } = useAuth()
    const { theme, toggleTheme } = useTheme()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <header className={`${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'} border-b sticky top-0 z-40 shadow-lg transition-colors duration-300`}>
            <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="hover:opacity-80 transition-opacity">
                    <BaseOneLogo size="md" variant="full" />
                </Link>

                {/* Navigation Desktop */}
                {user && (
                    <nav className={`hidden lg:flex items-center space-x-8 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        <Link to="/dashboard" className={`hover:${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} transition-colors text-sm font-medium`}>
                            Dashboard
                        </Link>
                        <Link to="/athletes" className={`hover:${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} transition-colors text-sm font-medium`}>
                            Atletas
                        </Link>
                        <Link to="/teams" className={`hover:${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} transition-colors text-sm font-medium`}>
                            Equipes
                        </Link>
                    </nav>
                )}

                {/* User Section */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-slate-100 hover:bg-slate-200 text-amber-600'}`}
                        title={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>

                    {user ? (
                        <div className="flex items-center gap-2 sm:gap-4">
                            {/* User Info Desktop */}
                            <div className={`hidden md:block text-right ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                                <p className="text-sm font-semibold">{user.name}</p>
                                <p className={`text-xs capitalize ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>{user.role}</p>
                            </div>

                            {/* User Avatar */}
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold hover:shadow-lg transition-shadow"
                            >
                                {user.name.charAt(0).toUpperCase()}
                            </button>

                            {/* Dropdown Menu */}
                            {menuOpen && (
                                <div className={`absolute top-20 right-4 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-lg shadow-lg p-2 z-50 min-w-[200px]`}>
                                    <button
                                        onClick={handleLogout}
                                        className={`w-full text-left px-4 py-2 rounded transition-colors text-sm font-medium ${theme === 'dark' ? 'text-slate-400 hover:text-blue-400 hover:bg-slate-700' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'}`}
                                    >
                                        Sair
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <Link
                                to="/login"
                                className={`px-4 py-2 text-sm font-semibold transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Cadastro
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
