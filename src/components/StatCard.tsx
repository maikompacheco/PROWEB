import React from 'react'
import { useTheme } from '../context/ThemeContext'

interface StatCardProps {
    title: string
    value: string | number
    change?: number
    icon?: React.ReactNode
    trend?: 'up' | 'down' | 'neutral'
    backgroundColor?: 'default' | 'blue' | 'green' | 'purple' | 'orange'
    className?: string
}

export default function StatCard({
    title,
    value,
    change,
    icon,
    trend = 'neutral',
    backgroundColor = 'default',
    className = ''
}: StatCardProps) {
    const { theme } = useTheme()

    const bgClasses = {
        default: theme === 'dark' ? 'bg-slate-800' : 'bg-white',
        blue: theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50',
        green: theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50',
        purple: theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50',
        orange: theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-50'
    }

    const borderClasses = {
        default: theme === 'dark' ? 'border-slate-700' : 'border-slate-200',
        blue: 'border-blue-200',
        green: 'border-green-200',
        purple: 'border-purple-200',
        orange: 'border-orange-200'
    }

    const trendColors = {
        up: 'text-green-500',
        down: 'text-red-500',
        neutral: 'text-slate-500'
    }

    const trendIcons = {
        up: '↑',
        down: '↓',
        neutral: '→'
    }

    return (
        <div className={`${bgClasses[backgroundColor]} border ${borderClasses[backgroundColor]} rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow ${className}`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        {title}
                    </p>
                    <p className={`text-2xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {value}
                    </p>

                    {change !== undefined && (
                        <div className={`flex items-center mt-2 text-sm font-medium ${trendColors[trend]}`}>
                            <span>{trendIcons[trend]}</span>
                            <span className="ml-1">{Math.abs(change)}%</span>
                        </div>
                    )}
                </div>

                {icon && (
                    <div className={`text-3xl opacity-50`}>
                        {icon}
                    </div>
                )}
            </div>
        </div>
    )
}
