import React, { useState } from 'react'
import Card from './Card'
import Input from './Input'
import Button from './Button'
import { useTheme } from '../context/ThemeContext'

export const POSITIONS = ['Atacante', 'Meia', 'Defesa', 'Lateral', 'Goleiro', 'Zagueiro', 'Volante', 'Meia-Volante', 'Ponta', 'Lateral-Esquerda', 'Goleira', 'Meia-Direita']

interface AthleteFilters {
    search: string
    position?: string
    withTeam?: 'all' | 'assigned' | 'unassigned'
}

interface SearchFiltersProps {
    onFiltersChange: (filters: AthleteFilters) => void
    initialFilters?: AthleteFilters
    showAdvanced?: boolean
}

export default function SearchFilters({
    onFiltersChange,
    initialFilters = { search: '' },
    showAdvanced = true
}: SearchFiltersProps) {
    const { theme } = useTheme()
    const [isExpanded, setIsExpanded] = useState(false)
    const [filters, setFilters] = useState<AthleteFilters>(initialFilters)

    const handleChange = (newFilters: Partial<AthleteFilters>) => {
        const updated = { ...filters, ...newFilters }
        setFilters(updated)
        onFiltersChange(updated)
    }

    const handleReset = () => {
        const reset = { search: '' }
        setFilters(reset)
        onFiltersChange(reset)
        setIsExpanded(false)
    }

    const activeFilters = Object.values(filters).filter(v => v && v !== 'all').length

    return (
        <div className="space-y-3">
            {/* Main Search */}
            <Card className={`p-4 sm:p-5 border transition-all duration-300 ${theme === 'dark' ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-white/50'
                }`}>
                <div className="flex items-center gap-3">
                    <span className="text-xl">🔍</span>
                    <Input
                        placeholder="Pesquisar por nome..."
                        value={filters.search}
                        onChange={(e) => handleChange({ search: e.target.value })}
                    />
                    {showAdvanced && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${isExpanded
                                ? theme === 'dark'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-blue-500 text-white'
                                : theme === 'dark'
                                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                        >
                            ⚙️ {activeFilters > 0 ? `Filtros (${activeFilters})` : 'Filtros'}
                        </button>
                    )}
                </div>
            </Card>

            {/* Advanced Filters */}
            {showAdvanced && isExpanded && (
                <Card className={`p-4 sm:p-5 border animate-in fade-in slide-in-from-top-2 transition-all duration-200 ${theme === 'dark' ? 'border-slate-700 bg-slate-900/30' : 'border-slate-200 bg-slate-50/50'
                    }`}>
                    <div className="space-y-4">
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                            {/* Position Filter */}
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                                    }`}>
                                    Posição
                                </label>
                                <select
                                    value={filters.position || ''}
                                    onChange={(e) => handleChange({ position: e.target.value || undefined })}
                                    className={`w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${theme === 'dark'
                                        ? 'bg-slate-900 border-slate-700 text-slate-200 focus:border-primary-500 focus:ring-primary-500/20'
                                        : 'bg-white border-slate-300 text-slate-900 focus:border-primary-500 focus:ring-primary-500/20'
                                        }`}
                                >
                                    <option value="">Todas as posições</option>
                                    {POSITIONS.map(pos => (
                                        <option key={pos} value={pos}>{pos}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Team Status Filter */}
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                                    }`}>
                                    Status do Time
                                </label>
                                <select
                                    value={filters.withTeam || 'all'}
                                    onChange={(e) => handleChange({ withTeam: e.target.value as any })}
                                    className={`w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${theme === 'dark'
                                        ? 'bg-slate-900 border-slate-700 text-slate-200 focus:border-primary-500 focus:ring-primary-500/20'
                                        : 'bg-white border-slate-300 text-slate-900 focus:border-primary-500 focus:ring-primary-500/20'
                                        }`}
                                >
                                    <option value="all">Todos</option>
                                    <option value="assigned">Com Time</option>
                                    <option value="unassigned">Sem Time</option>
                                </select>
                            </div>
                        </div>

                        {/* Reset Button */}
                        <div className="flex justify-end">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleReset}
                            >
                                🔄 Limpar Filtros
                            </Button>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    )
}
