import React from 'react'

interface ScoreDisplayProps {
    score: number
    max?: number
    label?: string
    size?: 'sm' | 'md' | 'lg'
    showPercentage?: boolean
}

export default function ScoreDisplay({
    score,
    max = 10,
    label,
    size = 'md',
    showPercentage = false
}: ScoreDisplayProps) {
    const percentage = (score / max) * 100
    const displayScore = showPercentage ? Math.round(percentage) : score

    const sizeClasses = {
        sm: 'w-12 h-12 text-sm',
        md: 'w-16 h-16 text-xl',
        lg: 'w-20 h-20 text-3xl'
    }

    const getColor = () => {
        if (percentage >= 80) return 'from-green-500 to-emerald-600'
        if (percentage >= 60) return 'from-blue-500 to-cyan-600'
        if (percentage >= 40) return 'from-yellow-500 to-orange-600'
        return 'from-red-500 to-rose-600'
    }

    return (
        <div className="flex flex-col items-center gap-2">
            <div
                className={`flex items-center justify-center rounded-full bg-gradient-to-br ${getColor()} ring-2 ring-slate-700 font-bold text-white ${sizeClasses[size]}`}
            >
                {displayScore}
                {showPercentage && <span className="text-xs ml-1">%</span>}
            </div>
            {label && <p className="text-xs text-slate-400">{label}</p>}
        </div>
    )
}
