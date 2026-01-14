import React from 'react'
import { useTheme } from '../context/ThemeContext'

interface BaseOneLogoProps {
    size?: 'sm' | 'md' | 'lg'
    variant?: 'icon' | 'full'
    className?: string
}

/**
 * BaseONE Logo Component - Versão simplificada
 * Usa o mesmo design premium do BaseONELogoBrand
 */
export default function BaseOneLogo({ size = 'md', variant = 'full', className = '' }: BaseOneLogoProps) {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const sizeMap = {
        sm: { width: 24, height: 24, text: 'text-sm', gap: 'gap-2' },
        md: { width: 32, height: 32, text: 'text-lg', gap: 'gap-2.5' },
        lg: { width: 40, height: 40, text: 'text-2xl', gap: 'gap-3' }
    }

    const { width, height, text: textSize, gap } = sizeMap[size]

    // Cores premium
    const primaryColor = '#3b82f6'
    const secondaryColor = '#06b6d4'
    const accentColor = '#8b5cf6'
    const textColor = isDark ? '#f1f5f9' : '#0f172a'
    const gradientId = `baseone-logo-${size}`

    return (
        <div className={`flex items-center ${gap} ${className}`}>
            {/* SVG Icon */}
            <svg
                width={width}
                height={height}
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
            >
                {/* Gradiente premium */}
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={primaryColor} />
                        <stop offset="100%" stopColor={secondaryColor} />
                    </linearGradient>
                </defs>

                {/* Background arredondado com gradiente */}
                <rect
                    width="48"
                    height="48"
                    rx="10"
                    fill={`url(#${gradientId})`}
                    opacity="0.15"
                />

                {/* Campo estilizado */}
                <g>
                    {/* Linha do campo principal */}
                    <path
                        d="M 12 16 L 36 16 L 34 32 L 14 32 Z"
                        stroke={primaryColor}
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.9"
                    />

                    {/* Linha do meio do campo */}
                    <line
                        x1="12"
                        y1="24"
                        x2="36"
                        y2="24"
                        stroke={secondaryColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.85"
                    />

                    {/* Círculo central */}
                    <circle
                        cx="24"
                        cy="24"
                        r="4"
                        fill={accentColor}
                        opacity="0.75"
                    />

                    {/* Ponto central */}
                    <circle
                        cx="24"
                        cy="24"
                        r="1.5"
                        fill={textColor}
                        opacity="0.9"
                    />

                    {/* Áreas técnicas */}
                    <rect
                        x="12"
                        y="12"
                        width="4"
                        height="4"
                        fill={primaryColor}
                        opacity="0.6"
                        rx="1"
                    />
                    <rect
                        x="32"
                        y="28"
                        width="4"
                        height="4"
                        fill={secondaryColor}
                        opacity="0.6"
                        rx="1"
                    />
                </g>

                {/* Bola estilizada */}
                <circle
                    cx="28"
                    cy="18"
                    r="2.5"
                    fill={accentColor}
                    opacity="0.85"
                />
            </svg>

            {/* Text - only in full variant */}
            {variant === 'full' && (
                <div className="flex flex-col leading-none">
                    <span className={`font-black tracking-tighter ${textSize} bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 bg-clip-text text-transparent`}>
                        BaseONE
                    </span>
                    <span className={`text-xs font-bold tracking-widest ${isDark ? 'text-blue-400' : 'text-blue-600'} opacity-85`}>
                        SPORTS
                    </span>
                </div>
            )}
        </div>
    )
}
