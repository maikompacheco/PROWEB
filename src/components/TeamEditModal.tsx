import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import Button from './Button'
import Input from './Input'
import { Team } from '../types'
import { useTheme } from '../context/ThemeContext'

interface TeamEditModalProps {
    isOpen: boolean
    team: Team | null
    isLoading?: boolean
    onSave: (data: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
    onClose: () => void
}

const TEAM_CATEGORIES = [
    { label: 'Sub-14', value: 'sub_14' },
    { label: 'Sub-16', value: 'sub_16' },
    { label: 'Sub-18', value: 'sub_18' },
    { label: 'Profissional', value: 'profissional' }
]

export default function TeamEditModal({
    isOpen,
    team,
    isLoading = false,
    onSave,
    onClose
}: TeamEditModalProps) {
    const { theme } = useTheme()
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        coordinator: ''
    })
    const [error, setError] = useState<string | null>(null)

    // Populate form when team changes
    useEffect(() => {
        if (team) {
            setFormData({
                name: team.name || '',
                category: team.category || '',
                coordinator: team.coordinator || ''
            })
        } else {
            setFormData({
                name: '',
                category: '',
                coordinator: ''
            })
        }
        setError(null)
    }, [team, isOpen])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        // Validation
        if (!formData.name.trim()) {
            setError('Nome da equipe é obrigatório')
            return
        }
        if (!formData.category.trim()) {
            setError('Categoria é obrigatória')
            return
        }

        try {
            await onSave({
                name: formData.name,
                category: formData.category,
                coordinator: formData.coordinator || undefined,
                players: team?.players || [],
                coaches: team?.coaches,
                schedule: team?.schedule
            })
            onClose()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao salvar equipe')
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={team ? `Editar ${team.name}` : 'Nova Equipe'}
        >
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Error Alert */}
                {error && (
                    <div className={`p-3 rounded-lg border ${theme === 'dark'
                            ? 'bg-red-950/20 border-red-500/30 text-red-300'
                            : 'bg-red-50 border-red-200 text-red-700'
                        }`}>
                        {error}
                    </div>
                )}

                {/* Team Name */}
                <Input
                    label="Nome da Equipe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Equipe A, Equipe B"
                    error={error && formData.name === '' ? 'Campo obrigatório' : ''}
                />

                {/* Category */}
                <div>
                    <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                        Categoria
                    </label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg border transition-colors ${theme === 'dark'
                                ? 'bg-slate-900 border-slate-700 text-slate-100 focus:border-accent-500 focus:ring-accent-500/20'
                                : 'bg-white border-slate-300 text-slate-900 focus:border-accent-500 focus:ring-accent-500/20'
                            }`}
                    >
                        <option value="">Selecione uma categoria</option>
                        {TEAM_CATEGORIES.map(cat => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                    {error && formData.category === '' && (
                        <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
                    )}
                </div>

                {/* Coordinator (Coach) */}
                <Input
                    label="Coordenador (Opcional)"
                    value={formData.coordinator}
                    onChange={(e) => setFormData({ ...formData, coordinator: e.target.value })}
                    placeholder="Nome do treinador responsável"
                />

                {/* Actions */}
                <div className="flex gap-3 mt-6 pt-4 border-t border-slate-700">
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        className="flex-1"
                        isLoading={isLoading}
                    >
                        {team ? 'Atualizar' : 'Criar'}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
