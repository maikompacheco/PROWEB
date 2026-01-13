import React from 'react'
import { useTheme } from '../context/ThemeContext'

interface BaseOneLogoProps {
    size?: 'sm' | 'md' | 'lg'
    variant?: 'icon' | 'full'
}

export default function BaseOneLogo({ size = 'md', variant = 'full' }: BaseOneLogoProps) {
    const { theme } = useTheme()

    const sizeMap = {
        sm: { icon: 'w-8 h-8', text: 'text-lg' },
        md: { icon: 'w-10 h-10', text: 'text-2xl' },
        lg: { icon: 'w-12 h-12', text: 'text-3xl' }
    }

    const colors = {
        primary: theme === 'dark' ? '#3b82f6' : '#2563eb',
        secondary: theme === 'dark' ? '#06b6d4' : '#0891b2',
        accent: theme === 'dark' ? '#8b5cf6' : '#7c3aed',
        text: theme === 'dark' ? '#f1f5f9' : '#0f172a'
    }

    const iconSize = size === 'sm' ? '40' : size === 'lg' ? '48' : '40'

    return (
        <div className="flex items-center gap-2">
            {/* SVG Icon */}
            <svg
                width={iconSize}
                height={iconSize}
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={sizeMap[size].icon}
            >
                {/* Campo de futebol estilizado */}
                <defs>
                    <linearGradient id="baseone-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={colors.primary} />
                        <stop offset="100%" stopColor={colors.secondary} />
                    </linearGradient>
                </defs>

                {/* Background arredondado */}
                <rect width="48" height="48" rx="10" fill="url(#baseone-gradient)" opacity="0.15" />

                {/* Campo estilizado - forme de trapézio futebolístico */}
                <g>
                    {/* Linha do campo principal */}
                    <path
                        d="M 12 16 L 36 16 L 34 32 L 14 32 Z"
                        stroke={colors.primary}
                        strokeWidth="1.5"
                        fill="none"
                    />

                    {/* Linha do meio do campo */}
                    <line
                        x1="12"
                        y1="24"
                        x2="36"
                        y2="24"
                        stroke={colors.secondary}
                        strokeWidth="1.5"
                    />

                    {/* Círculo central (meia-lua estilizada) */}
                    <circle
                        cx="24"
                        cy="24"
                        r="4"
                        fill={colors.accent}
                        opacity="0.7"
                    />

                    {/* Ponto técnico */}
                    <circle
                        cx="24"
                        cy="24"
                        r="1.5"
                        fill={colors.text}
                    />

                    {/* Áreas estilizadas - pequenos retângulos */}
                    <rect x="12" y="12" width="4" height="4" fill={colors.primary} opacity="0.5" rx="1" />
                    <rect x="32" y="28" width="4" height="4" fill={colors.secondary} opacity="0.5" rx="1" />
                </g>

                {/* Bola estilizada */}
                <circle
                    cx="28"
                    cy="18"
                    r="2.5"
                    fill={colors.accent}
                />
            </svg>

            {/* Text - only in full variant */}
            {variant === 'full' && (
                <div>
                    <p
                        className={`font-bold ${sizeMap[size].text} ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'
                            }`}
                    >
                        Base
                        <span className={`bg-gradient-to-r ${theme === 'dark'
                            ? 'from-blue-500 to-cyan-500'
                            : 'from-blue-600 to-cyan-600'
                            } bg-clip-text text-transparent`}>
                            ONE
                        </span>
                    </p>
                    <p
                        className={`text-xs font-semibold tracking-widest ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                            }`}
                    >
                        FOOTBALL
                    </p>
                </div>
            )}
        </div>
    )
}
