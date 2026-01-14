import React from 'react'
import { useTheme } from '../context/ThemeContext'

interface ChartBarProps {
    label: string
    value: number
    maxValue?: number
    color?: 'blue' | 'green' | 'purple' | 'orange' | 'red'
}

interface BarChartProps {
    title: string
    data: ChartBarProps[]
    height?: 'sm' | 'md' | 'lg'
    className?: string
}

export default function BarChart({ title, data, height = 'md', className = '' }: BarChartProps) {
    const { theme } = useTheme()

    const maxValue = Math.max(...data.map(d => d.maxValue || 100))
    const barHeights = {
        sm: 'h-8',
        md: 'h-12',
        lg: 'h-16'
    }

    const colorMap = {
        blue: `${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'}`,
        green: `${theme === 'dark' ? 'bg-green-600' : 'bg-green-500'}`,
        purple: `${theme === 'dark' ? 'bg-purple-600' : 'bg-purple-500'}`,
        orange: `${theme === 'dark' ? 'bg-orange-600' : 'bg-orange-500'}`,
        red: `${theme === 'dark' ? 'bg-red-600' : 'bg-red-500'}`
    }

    return (
        <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-lg p-6 border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'} ${className}`}>
            <h3 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {title}
            </h3>

            <div className="space-y-4">
                {data.map((item, index) => {
                    const percentage = (item.value / (item.maxValue || 100)) * 100

                    return (
                        <div key={index}>
                            <div className="flex items-end justify-between mb-2">
                                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                                    {item.label}
                                </p>
                                <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                                    {item.value}
                                </p>
                            </div>

                            <div className={`w-full ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded-full overflow-hidden`}>
                                <div
                                    className={`${barHeights[height]} ${colorMap[item.color || 'blue']} rounded-full transition-all duration-300`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
