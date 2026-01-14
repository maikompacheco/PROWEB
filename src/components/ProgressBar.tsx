import React from 'react'
import { useTheme } from '../context/ThemeContext'

interface ProgressBarProps {
    value: number
    max?: number
    label?: string
    showValue?: boolean
    color?: 'blue' | 'green' | 'orange' | 'red' | 'purple'
    size?: 'sm' | 'md' | 'lg'
    animated?: boolean
    className?: string
}

export default function ProgressBar({
    value,
    max = 100,
    label,
    showValue = false,
    color = 'blue',
    size = 'md',
    animated = true,
    className = ''
}: ProgressBarProps) {
    const { theme } = useTheme()

    const percentage = Math.min((value / max) * 100, 100)

    const bgClasses = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        orange: 'bg-orange-500',
        red: 'bg-red-500',
        purple: 'bg-purple-500'
    }

    const containerBgClasses = {
        blue: theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200',
        green: theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200',
        orange: theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200',
        red: theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200',
        purple: theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'
    }

    const sizeClasses = {
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-3.5'
    }

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <div className="flex justify-between items-center mb-2">
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        {label}
                    </p>
                    {showValue && (
                        <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                            {value} / {max}
                        </p>
                    )}
                </div>
            )}

            <div className={`w-full ${containerBgClasses[color]} rounded-full overflow-hidden`}>
                <div
                    className={`${sizeClasses[size]} ${bgClasses[color]} rounded-full transition-all duration-300 ${animated ? 'ease-out' : ''}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}
