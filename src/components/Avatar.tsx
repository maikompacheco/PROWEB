import React from 'react'
import { useTheme } from '../context/ThemeContext'

interface AvatarProps {
    name: string
    imageUrl?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    variant?: 'default' | 'gradient' | 'initials'
    status?: 'online' | 'offline' | 'busy'
    className?: string
}

export default function Avatar({
    name,
    imageUrl,
    size = 'md',
    variant = 'default',
    status,
    className = ''
}: AvatarProps) {
    const { theme } = useTheme()

    const sizeClasses = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-14 h-14 text-lg',
        xl: 'w-20 h-20 text-2xl'
    }

    const gradients = [
        'from-blue-500 to-cyan-500',
        'from-purple-500 to-pink-500',
        'from-green-500 to-emerald-500',
        'from-orange-500 to-red-500',
        'from-yellow-500 to-amber-500',
        'from-indigo-500 to-purple-500'
    ]

    // Select gradient based on first letter (deterministic)
    const gradientIndex = name.charCodeAt(0) % gradients.length
    const gradient = gradients[gradientIndex]

    const initials = name
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase()

    const statusColors = {
        online: 'bg-green-500',
        offline: `bg-${theme === 'dark' ? 'slate-600' : 'slate-400'}`,
        busy: 'bg-red-500'
    }

    return (
        <div className={`relative ${sizeClasses[size]} inline-flex ${className}`}>
            {/* Avatar Container */}
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={name}
                    className={`${sizeClasses[size]} rounded-full object-cover shadow-md border-2 ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}
                />
            ) : variant === 'gradient' ? (
                <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold shadow-md border-2 ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                    {initials}
                </div>
            ) : (
                <div className={`${sizeClasses[size]} rounded-full ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'} flex items-center justify-center ${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-bold shadow-md border-2 ${theme === 'dark' ? 'border-slate-600' : 'border-slate-200'}`}>
                    {initials}
                </div>
            )}

            {/* Status Indicator */}
            {status && (
                <div className={`absolute bottom-0 right-0 ${statusColors[status]} rounded-full border-2 ${theme === 'dark' ? 'border-slate-900' : 'border-white'} ${size === 'sm' ? 'w-2 h-2' :
                        size === 'md' ? 'w-3 h-3' :
                            size === 'lg' ? 'w-4 h-4' :
                                'w-5 h-5'
                    }`} />
            )}
        </div>
    )
}
