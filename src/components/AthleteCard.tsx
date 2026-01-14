import React from 'react'
import Button from './Button'
import Badge from './Badge'
import Avatar from './Avatar'
import { Athlete } from '../types'
import { useTheme } from '../context/ThemeContext'

interface AthleteCardProps {
    athlete: Athlete
    onEdit: (id: string) => void
    onDelete: (id: string) => void
    onView: (id: string) => void
    variant?: 'grid' | 'list'
}

export default function AthleteCard({
    athlete,
    onEdit,
    onDelete,
    onView,
    variant = 'grid'
}: AthleteCardProps) {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    // List variant - Horizontal layout
    if (variant === 'list') {
        return (
            <div className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${isDark
                ? 'bg-neutral-900 border-neutral-800 hover:border-primary-600'
                : 'bg-neutral-50 border-neutral-200 hover:border-primary-600'
                }`}>
                <div className="flex-shrink-0">
                    <Avatar name={athlete.name} size="md" />
                </div>

                <div className="flex-grow grid grid-cols-4 gap-4 items-center">
                    <div>
                        <p className={`font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                            {athlete.name}
                        </p>
                    </div>

                    <div>
                        <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            {athlete.position || '—'}
                        </p>
                    </div>

                    <div>
                        <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            {athlete.club || '—'}
                        </p>
                    </div>

                    <div>
                        <Badge variant={athlete.teamId ? 'success' : 'warning'}>
                            {athlete.teamId ? '✓ Vinculado' : 'Sem equipe'}
                        </Badge>
                    </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                    <Button variant="outline" size="sm" onClick={() => onView(athlete.id)}>
                        Ver
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => onEdit(athlete.id)}>
                        Editar
                    </Button>
                    <button
                        onClick={() => onDelete(athlete.id)}
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
            <div className={`p-6 border-b ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
                <div className="flex justify-center mb-4">
                    <Avatar name={athlete.name} size="lg" />
                </div>
                <h3 className={`text-center font-semibold text-lg ${isDark ? 'text-neutral-100' : 'text-neutral-900'
                    }`}>
                    {athlete.name}
                </h3>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-3">
                {athlete.position && (
                    <div className="flex items-center gap-2">
                        <span className="text-lg">👥</span>
                        <span className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            {athlete.position}
                        </span>
                    </div>
                )}

                {athlete.club && (
                    <div className="flex items-center gap-2">
                        <span className="text-lg">📍</span>
                        <span className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            {athlete.club}
                        </span>
                    </div>
                )}

                {athlete.age && (
                    <div className="flex items-center gap-2">
                        <span className="text-lg">📅</span>
                        <span className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            {athlete.age} anos
                        </span>
                    </div>
                )}

                <div className="pt-3">
                    <Badge variant={athlete.teamId ? 'success' : 'warning'}>
                        {athlete.teamId ? '✓ Vinculado' : 'Sem equipe'}
                    </Badge>
                </div>
            </div>

            {/* Card Footer */}
            <div className={`p-4 border-t flex gap-2 ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
                <Button variant="secondary" size="sm" onClick={() => onView(athlete.id)} className="flex-1">
                    Ver
                </Button>
                <Button variant="primary" size="sm" onClick={() => onEdit(athlete.id)} className="flex-1">
                    Editar
                </Button>
                <button
                    onClick={() => onDelete(athlete.id)}
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
