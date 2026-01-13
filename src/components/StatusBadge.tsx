import React from 'react'
import { AthleteStatus } from '../types'

interface StatusBadgeProps {
    status: AthleteStatus
    className?: string
}

const getStatusConfig = (status: AthleteStatus) => {
    const configs = {
        [AthleteStatus.ACTIVE]: {
            icon: '✅',
            label: 'Ativo',
            color: 'bg-green-500/20 text-green-400 border-green-500/30'
        },
        [AthleteStatus.OBSERVATION]: {
            icon: '⚠️',
            label: 'Observação',
            color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
        },
        [AthleteStatus.HIGHLIGHTED]: {
            icon: '⭐',
            label: 'Destaque',
            color: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
        }
    }
    return configs[status]
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
    const config = getStatusConfig(status)

    return (
        <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${config.color} ${className}`}
        >
            <span>{config.icon}</span>
            <span>{config.label}</span>
        </div>
    )
}
