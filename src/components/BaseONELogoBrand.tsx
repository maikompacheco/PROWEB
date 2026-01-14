import React from 'react'

interface BaseONELogoBrandProps {
    size?: 'sm' | 'md' | 'lg' | 'xl'
    variant?: 'dark' | 'light'
    showText?: boolean
    className?: string
}

/**
 * BaseONE Logo Brand Component
 * Logo profissional com campo de futebol estilizado e tipografia moderna
 */
export default function BaseONELogoBrand({
    size = 'md',
    variant = 'dark',
    showText = true,
    className = ''
}: BaseONELogoBrandProps) {
    const sizeMap = {
        sm: { width: 24, height: 24, text: 'text-sm', gap: 'gap-2' },
        md: { width: 32, height: 32, text: 'text-lg', gap: 'gap-2.5' },
        lg: { width: 40, height: 40, text: 'text-2xl', gap: 'gap-3' },
        xl: { width: 48, height: 48, text: 'text-3xl', gap: 'gap-3' }
    }

    const { width, height, text: textSize, gap } = sizeMap[size]
    const isDark = variant === 'dark'

    // Cores premium com maior contraste
    const primaryColor = '#3b82f6'
    const secondaryColor = '#06b6d4'
    const accentColor = '#8b5cf6'
    const textColor = isDark ? '#f1f5f9' : '#0f172a'
    const gradientId = `baseone-gradient-${size}`

    return (
        <div className={`flex items-center ${gap} ${className}`}>
            {/* Logo Icon - Campo de Futebol Premium */}
            <div className={`relative flex-shrink-0 ${isDark ? 'group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]' : 'group-hover:drop-shadow-[0_0_12px_rgba(37,99,235,0.3)]'} transition-all duration-200`}>
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
                        <filter id={`glow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Background arredondado com gradiente */}
                    <rect
                        width="48"
                        height="48"
                        rx="10"
                        fill={`url(#${gradientId})`}
                        opacity="0.15"
                    />

                    {/* Campo de futebol com efeito premium */}
                    <g>
                        {/* Contorno principal do campo com destaque */}
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

                        {/* Círculo central com gradiente */}
                        <circle
                            cx="24"
                            cy="24"
                            r="4"
                            fill={accentColor}
                            opacity="0.75"
                        />

                        {/* Ponto central destacado */}
                        <circle
                            cx="24"
                            cy="24"
                            r="1.5"
                            fill={textColor}
                            opacity="0.9"
                        />

                        {/* Áreas técnicas com efeito */}
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

                    {/* Bola de futebol com destaque */}
                    <circle
                        cx="28"
                        cy="18"
                        r="2.5"
                        fill={accentColor}
                        opacity="0.85"
                        filter={`url(#glow-${size})`}
                    />
                </svg>
            </div>

            {/* Texto do logo - Premium Typography */}
            {showText && (
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
