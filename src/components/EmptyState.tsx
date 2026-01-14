import React from 'react'
import Button from './Button'
import { useTheme } from '../context/ThemeContext'

interface EmptyStateProps {
    icon?: string
    title: string
    description?: string
    actionLabel?: string
    onAction?: () => void
    className?: string
}

export default function EmptyState({
    icon = '📭',
    title,
    description,
    actionLabel,
    onAction,
    className = ''
}: EmptyStateProps) {
    const { theme } = useTheme()

    return (
        <div className={`flex flex-col items-center justify-center py-16 sm:py-24 px-4 ${className}`}>
            <div className="text-6xl sm:text-7xl mb-6 animate-bounce">
                {icon}
            </div>
            <h3 className={`text-2xl sm:text-3xl font-bold text-center mb-3 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'
                }`}>
                {title}
            </h3>
            {description && (
                <p className={`text-center max-w-md mb-8 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                    {description}
                </p>
            )}
            {actionLabel && onAction && (
                <Button
                    variant="primary"
                    size="lg"
                    onClick={onAction}
                    className="transition-all duration-300 hover:scale-105"
                >
                    {actionLabel}
                </Button>
            )}
        </div>
    )
}
