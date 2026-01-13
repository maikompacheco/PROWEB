import React from 'react'

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error'

interface BadgeProps {
    children: React.ReactNode
    variant?: BadgeVariant
    className?: string
}

export default function Badge({
    children,
    variant = 'primary',
    className = ''
}: BadgeProps) {
    const variantClasses = {
        primary: 'bg-blue-900/50 text-blue-300 border border-blue-700',
        secondary: 'bg-cyan-900/50 text-cyan-300 border border-cyan-700',
        success: 'bg-green-900/50 text-green-300 border border-green-700',
        warning: 'bg-yellow-900/50 text-yellow-300 border border-yellow-700',
        error: 'bg-red-900/50 text-red-300 border border-red-700'
    }

    return (
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${variantClasses[variant]} ${className}`}>
            {children}
        </span>
    )
}
