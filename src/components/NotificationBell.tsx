import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

interface Notification {
    id: string
    title: string
    message: string
    type: 'success' | 'warning' | 'error' | 'info'
    timestamp: Date
    read: boolean
}

interface NotificationBellProps {
    notifications?: Notification[]
    onClear?: () => void
}

export default function NotificationBell({ notifications = [], onClear }: NotificationBellProps) {
    const { theme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    const unreadCount = notifications.filter(n => !n.read).length

    const typeColors = {
        success: 'bg-green-500/20 text-green-500 border-green-200',
        warning: 'bg-yellow-500/20 text-yellow-500 border-yellow-200',
        error: 'bg-red-500/20 text-red-500 border-red-200',
        info: 'bg-blue-500/20 text-blue-500 border-blue-200'
    }

    const typeIcons = {
        success: '✓',
        warning: '⚠',
        error: '✕',
        info: 'ℹ'
    }

    const formatTime = (date: Date) => {
        const now = new Date()
        const diff = now.getTime() - date.getTime()
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)

        if (minutes < 1) return 'Agora'
        if (minutes < 60) return `${minutes}min`
        if (hours < 24) return `${hours}h`
        return `${days}d`
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative p-2 rounded-lg transition-colors ${theme === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                title="Notificações"
            >
                🔔
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className={`absolute right-0 top-12 w-80 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto ${theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'
                        }`}
                >
                    {notifications.length > 0 ? (
                        <>
                            <div className={`sticky top-0 p-4 border-b ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'} flex items-center justify-between`}>
                                <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                    Notificações
                                </h3>
                                {unreadCount > 0 && (
                                    <button
                                        onClick={onClear}
                                        className={`text-xs px-2 py-1 rounded ${theme === 'dark'
                                            ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        Marcar como lido
                                    </button>
                                )}
                            </div>

                            <div className="space-y-2 p-2">
                                {notifications.map(notification => (
                                    <div
                                        key={notification.id}
                                        className={`p-3 rounded-lg border ${typeColors[notification.type]} ${!notification.read ? 'opacity-100' : 'opacity-60'
                                            }`}
                                    >
                                        <div className="flex items-start gap-2">
                                            <span className="text-lg leading-none">{typeIcons[notification.type]}</span>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm">{notification.title}</p>
                                                <p className="text-xs mt-0.5 opacity-80">{notification.message}</p>
                                                <p className="text-xs mt-1 opacity-60">
                                                    {formatTime(notification.timestamp)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className={`p-8 text-center ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                            <p className="text-sm">Nenhuma notificação</p>
                        </div>
                    )}
                </div>
            )}

            {/* Overlay para fechar dropdown */}
            {isOpen && (
                <div className="fixed inset-0 z-[45]" onClick={() => setIsOpen(false)} />
            )}
        </div>
    )
}
