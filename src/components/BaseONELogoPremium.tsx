import React from 'react'

interface BaseONELogoPremiumProps {
    size?: 'sm' | 'md' | 'lg'
    variant?: 'light' | 'dark'
    className?: string
}

/**
 * BaseONE Logo Premium Component
 * Versão premium com estilo sofisticado e moderno
 */
export default function BaseONELogoPremium({ size = 'md', variant = 'dark', className = '' }: BaseONELogoPremiumProps) {
    const sizeMap = {
        sm: { width: 24, height: 24, text: 'text-sm', gap: 'gap-2' },
        md: { width: 32, height: 32, text: 'text-lg', gap: 'gap-2.5' },
        lg: { width: 40, height: 40, text: 'text-2xl', gap: 'gap-3' }
    }

    const { width, height, text: textSize, gap } = sizeMap[size]
    const isDark = variant === 'dark'

    // Cores premium
    const primaryColor = '#3b82f6'
    const secondaryColor = '#06b6d4'
    const accentColor = '#8b5cf6'
    const textColor = isDark ? '#f1f5f9' : '#0f172a'
    const gradientId = `baseone-premium-${size}`

    return (
        <div className={`flex items-center ${gap} ${className}`}>
            {/* Logo Icon - Premium Style */}
            <svg
                width={width}
                height={height}
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
            >
                {/* Gradiente premium com efeito dual */}
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={primaryColor} />
                        <stop offset="100%" stopColor={secondaryColor} />
                    </linearGradient>
                </defs>

                {/* Background arredondado com gradiente premium */}
                <rect
                    width="48"
                    height="48"
                    rx="10"
                    fill={`url(#${gradientId})`}
                    opacity="0.15"
                />

                {/* Campo de futebol com estilo premium */}
                <g>
                    {/* Contorno principal com stroke destacado */}
                    <path
                        d="M 12 16 L 36 16 L 34 32 L 14 32 Z"
                        stroke={primaryColor}
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.95"
                    />

                    {/* Linha central com gradiente visual */}
                    <line
                        x1="12"
                        y1="24"
                        x2="36"
                        y2="24"
                        stroke={secondaryColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.9"
                    />

                    {/* Círculo central com destaque */}
                    <circle
                        cx="24"
                        cy="24"
                        r="4"
                        fill={accentColor}
                        opacity="0.8"
                    />

                    {/* Ponto central */}
                    <circle
                        cx="24"
                        cy="24"
                        r="1.5"
                        fill={textColor}
                        opacity="0.95"
                    />

                    {/* Áreas técnicas premium */}
                    <rect
                        x="12"
                        y="12"
                        width="4"
                        height="4"
                        fill={primaryColor}
                        opacity="0.65"
                        rx="1"
                    />
                    <rect
                        x="32"
                        y="28"
                        width="4"
                        height="4"
                        fill={secondaryColor}
                        opacity="0.65"
                        rx="1"
                    />
                </g>

                {/* Bola com destaque premium */}
                <circle
                    cx="28"
                    cy="18"
                    r="2.5"
                    fill={accentColor}
                    opacity="0.9"
                />
            </svg>

            {/* Logo Text - Premium Typography */}
            <span className={`font-black tracking-tighter ${textSize} bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 bg-clip-text text-transparent`}>
                BaseONE
            </span>
        </div>
    )
}
