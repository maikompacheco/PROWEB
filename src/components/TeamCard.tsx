import React from 'react'
import Button from './Button'
import Badge from './Badge'
import { Team } from '../types'
import { useTheme } from '../context/ThemeContext'

interface TeamCardProps {
    team: Team
    athleteCount: number
    onEdit: (id: string) => void
    onDelete: (id: string) => void
    onView: (id: string) => void
    variant?: 'grid' | 'list'
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

export default function TeamCard({
    team,
    athleteCount,
    onEdit,
    onDelete,
    onView,
    variant = 'grid'
}: TeamCardProps) {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    // List variant
    if (variant === 'list') {
        return (
            <div className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${isDark
                ? 'bg-neutral-900 border-neutral-800 hover:border-primary-600'
                : 'bg-neutral-50 border-neutral-200 hover:border-primary-600'
                }`}>
                <div className="text-2xl">⚽</div>

                <div className="flex-grow grid grid-cols-4 gap-4 items-center">
                    <div>
                        <p className={`font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                            {team.name}
                        </p>
                    </div>

                    <div>
                        <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            {getCategoryLabel(team.category)}
                        </p>
                    </div>

                    <div>
                        <Badge variant="secondary">{athleteCount} atletas</Badge>
                    </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                    <Button variant="outline" size="sm" onClick={() => onView(team.id)}>
                        Ver
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => onEdit(team.id)}>
                        Editar
                    </Button>
                    <button
                        onClick={() => onDelete(team.id)}
                        className={`px-3 py-2 rounded text-sm font-medium transition-colors ${isDark
                            ? 'hover:bg-error-600/10 text-error-500'
                            : 'hover:bg-error-100 text-error-600'
                            }`}
                    >
                        ✕
                    </button>
                </div>
            </div>
        )
    }

    // Grid variant (default)
    return (
        <div className={`rounded-lg border overflow-hidden transition-all hover:shadow-lg ${isDark
            ? 'bg-neutral-900 border-neutral-800'
            : 'bg-neutral-50 border-neutral-200'
            }`}>
            {/* Card Header */}
            <div className={`p-6 border-b text-center ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
                <div className="text-4xl mb-3">⚽</div>
                <h3 className={`font-semibold text-lg ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                    {team.name}
                </h3>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4">
                {/* Category */}
                <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Categoria</span>
                    <Badge variant="secondary">{getCategoryLabel(team.category)}</Badge>
                </div>

                {/* Athletes */}
                <div className="flex items-center gap-2">
                    <span className="text-lg">👥</span>
                    <span className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        {athleteCount} atleta{athleteCount !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            {/* Card Footer */}
            <div className={`p-4 border-t flex gap-2 ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
                <Button variant="secondary" size="sm" onClick={() => onView(team.id)} className="flex-1">
                    Ver
                </Button>
                <Button variant="primary" size="sm" onClick={() => onEdit(team.id)} className="flex-1">
                    Editar
                </Button>
                <button
                    onClick={() => onDelete(team.id)}
                    className={`px-3 py-2 rounded text-sm font-medium transition-colors ${isDark
                        ? 'hover:bg-error-600/10 text-error-500'
                        : 'hover:bg-error-100 text-error-600'
                        }`}
                >
                    🗑
                </button>
            </div>
        </div>
    )
}
