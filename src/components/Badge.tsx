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
        primary: 'bg-primary-100 text-primary-700 border border-primary-300',
        secondary: 'bg-field-100 text-field-700 border border-field-300',
        success: 'bg-field-100 text-field-700 border border-field-300',
        warning: 'bg-highlight-100 text-highlight-700 border border-highlight-300',
        error: 'bg-red-100 text-red-700 border border-red-300'
    }

    return (
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${variantClasses[variant]} ${className}`}>
            {children}
        </span>
    )
}
