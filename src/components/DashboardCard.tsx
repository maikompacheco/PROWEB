import React from 'react'
import Card from './Card'
import { useTheme } from '../context/ThemeContext'

interface DashboardCardProps {
    icon?: string // emoji or icon
    label: string
    value: string | number
    description?: string
    trend?: 'up' | 'down' | 'stable'
    trendValue?: string
    onClick?: () => void
    variant?: 'primary' | 'secondary' | 'success' | 'warning'
}

export default function DashboardCard({
    icon,
    label,
    value,
    description,
    trend,
    trendValue,
    onClick,
    variant = 'primary'
}: DashboardCardProps) {
    const { theme } = useTheme()

    const variantStyles = {
        primary: {
            bg: theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-50',
            border: theme === 'dark' ? 'border-blue-500/30' : 'border-blue-200',
            icon: 'text-blue-500',
            label: 'text-blue-700',
            value: 'text-blue-900'
        },
        secondary: {
            bg: theme === 'dark' ? 'bg-slate-500/10' : 'bg-slate-50',
            border: theme === 'dark' ? 'border-slate-500/30' : 'border-slate-200',
            icon: 'text-slate-500',
            label: 'text-slate-700',
            value: 'text-slate-900'
        },
        success: {
            bg: theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-50',
            border: theme === 'dark' ? 'border-emerald-500/30' : 'border-emerald-200',
            icon: 'text-emerald-500',
            label: 'text-emerald-700',
            value: 'text-emerald-900'
        },
        warning: {
            bg: theme === 'dark' ? 'bg-amber-500/10' : 'bg-amber-50',
            border: theme === 'dark' ? 'border-amber-500/30' : 'border-amber-200',
            icon: 'text-amber-500',
            label: 'text-amber-700',
            value: 'text-amber-900'
        }
    }

    const styles = variantStyles[variant]

    return (
        <Card
            className={`border-2 ${styles.bg} ${styles.border} ${onClick ? 'cursor-pointer hover:shadow-lg transition-all' : ''}`}
            onClick={onClick}
        >
            <div className="flex items-start justify-between">
                {/* Content */}
                <div className="flex-1">
                    {/* Icon + Label */}
                    <div className="flex items-center gap-3 mb-4">
                        {icon && <span className={`text-2xl ${styles.icon}`}>{icon}</span>}
                        <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                            {label}
                        </p>
                    </div>

                    {/* Value */}
                    <p className={`text-3xl sm:text-4xl font-bold mb-2`}>
                        {value}
                    </p>

                    {/* Description */}
                    {description && (
                        <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                            {description}
                        </p>
                    )}
                </div>

                {/* Trend Badge */}
                {trend && (
                    <div className={`text-right`}>
                        <div className={`flex items-center gap-1 ${trend === 'up' ? 'text-emerald-500' :
                                trend === 'down' ? 'text-red-500' :
                                    'text-slate-500'
                            }`}>
                            <span>
                                {trend === 'up' && '↑'}
                                {trend === 'down' && '↓'}
                                {trend === 'stable' && '→'}
                            </span>
                            {trendValue && <span className="text-xs font-semibold">{trendValue}</span>}
                        </div>
                    </div>
                )}
            </div>

            {/* Progress bar (optional) */}
            {variant === 'primary' && (
                <div className={`mt-4 h-1 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600" style={{ width: '75%' }} />
                </div>
            )}
        </Card>
    )
}
