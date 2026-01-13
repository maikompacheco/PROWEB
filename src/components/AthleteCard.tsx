import React from 'react'
import Card from './Card'
import Button from './Button'
import Badge from './Badge'
import OnlineOfflineBadge from './OnlineOfflineBadge'
import { Athlete } from '../types'
import { useTheme } from '../context/ThemeContext'

interface AthleteCardProps {
    athlete: Athlete
    onEdit: (athlete: Athlete) => void
    onDelete: (athleteId: string) => void
    showTeam?: boolean
}

export default function AthleteCard({
    athlete,
    onEdit,
    onDelete,
    showTeam = true
}: AthleteCardProps) {
    const { theme } = useTheme()

    return (
        <Card fullHeight className={`card-hover border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                        {athlete.name}
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        {athlete.school}
                    </p>
                </div>
                <Badge variant="secondary">{athlete.position}</Badge>
            </div>

            {/* Body - Grows to fill available space */}
            <div className={`space-y-3 py-3 border-t flex-grow ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                {/* Age */}
                <div className="flex justify-between text-sm">
                    <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}>
                        Idade:
                    </span>
                    <span className={`font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-950'}`}>
                        {athlete.age} anos
                    </span>
                </div>

                {/* Category */}
                {athlete.category && (
                    <div className="flex justify-between text-sm">
                        <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}>
                            Categoria:
                        </span>
                        <span className={`font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-950'}`}>
                            {athlete.category}
                        </span>
                    </div>
                )}

                {/* Team */}
                {showTeam && athlete.teamId && (
                    <div className="flex justify-between text-sm">
                        <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}>
                            Equipe:
                        </span>
                        <span className={`font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-950'}`}>
                            {/* Will be integrated with team context */}
                            -
                        </span>
                    </div>
                )}

                {/* Online/Offline Status */}
                <div className="flex justify-between text-sm items-center">
                    <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}>
                        Status:
                    </span>
                    <OnlineOfflineBadge lastSeen={athlete.tracking?.lastSeen} />
                </div>

                {/* Heart Rate */}
                {athlete.tracking?.heartRate && (
                    <div className="flex justify-between text-sm">
                        <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}>
                            FC:
                        </span>
                        <span className={`font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-950'}`}>
                            {athlete.tracking.heartRate} bpm
                        </span>
                    </div>
                )}
            </div>

            {/* Footer - Always at bottom */}
            <div className="flex gap-2 mt-4">
                <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                    onClick={() => onEdit(athlete)}
                >
                    Editar
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => onDelete(athlete.id)}
                >
                    Remover
                </Button>
            </div>
        </Card>
    )
}
