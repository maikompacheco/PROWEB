import React from 'react'
import Card from './Card'
import Button from './Button'
import Badge from './Badge'
import { Team } from '../types'
import { useTheme } from '../context/ThemeContext'

interface TeamCardProps {
    team: Team
    onEdit: (team: Team) => void
    onDelete: (teamId: string) => void
}

const getCategoryLabel = (value?: string): string => {
    const categories: Record<string, string> = {
        'sub_14': 'Sub-14',
        'sub_16': 'Sub-16',
        'sub_18': 'Sub-18',
        'profissional': 'Profissional'
    }
    return categories[value || ''] || value || '-'
}

export default function TeamCard({ team, onEdit, onDelete }: TeamCardProps) {
    const { theme } = useTheme()

    return (
        <Card fullHeight className={`card-hover border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                        {team.name}
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        ⚽ {team.players?.length || 0} atletas
                    </p>
                </div>
                <Badge variant="secondary">
                    {getCategoryLabel(team.category)}
                </Badge>
            </div>

            {/* Body - Grows to fill available space */}
            <div className={`space-y-3 py-3 border-t flex-grow ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                {/* Coordinator */}
                {team.coordinator && (
                    <div className="flex justify-between text-sm">
                        <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}>
                            Coordenador:
                        </span>
                        <span className={`font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-950'}`}>
                            {team.coordinator}
                        </span>
                    </div>
                )}

                {/* Coaches */}
                {team.coaches && team.coaches.length > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}>
                            Treinadores:
                        </span>
                        <span className={`font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-950'}`}>
                            {team.coaches.length}
                        </span>
                    </div>
                )}

                {/* Schedule */}
                {team.schedule && (
                    <div className="flex justify-between text-sm">
                        <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}>
                            Local:
                        </span>
                        <span className={`font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-950'}`}>
                            {team.schedule.location || '-'}
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
                    onClick={() => onEdit(team)}
                >
                    Editar
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => onDelete(team.id)}
                >
                    Deletar
                </Button>
            </div>
        </Card>
    )
}
