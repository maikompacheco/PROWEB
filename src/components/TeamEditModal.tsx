import React, { useEffect, useId, useState } from 'react'
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
    { label: 'Sub-7', value: 'sub_7' },
    { label: 'Sub-8', value: 'sub_8' },
    { label: 'Sub-9', value: 'sub_9' },
    { label: 'Sub-10', value: 'sub_10' },
    { label: 'Sub-11', value: 'sub_11' },
    { label: 'Sub-12', value: 'sub_12' },
    { label: 'Sub-13', value: 'sub_13' },
    { label: 'Sub-14', value: 'sub_14' },
    { label: 'Sub-15', value: 'sub_15' },
    { label: 'Sub-16', value: 'sub_16' },
    { label: 'Sub-17', value: 'sub_17' },
    { label: 'Sub-20', value: 'sub_20' },
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
    const formId = useId()
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        coordinator: ''
    })
    const [error, setError] = useState<string | null>(null)
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

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

        const errors: Record<string, string> = {}
        if (!formData.name.trim()) errors.name = 'Campo obrigatório'
        if (!formData.category.trim()) errors.category = 'Campo obrigatório'
        setFieldErrors(errors)

        if (Object.keys(errors).length > 0) {
            setError('Preencha os campos obrigatórios')
            return
        }

        try {
            await onSave({
                name: formData.name.trim(),
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
            description="Defina nome e categoria para organizar os times"
            footer={(
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        className="sm:min-w-[140px]"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        className="sm:min-w-[160px]"
                        isLoading={isLoading}
                        form={formId}
                    >
                        {team ? 'Atualizar equipe' : 'Criar equipe'}
                    </Button>
                </div>
            )}
        >
            <form id={formId} className="space-y-4" onSubmit={handleSubmit}>
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
                    onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value })
                        if (fieldErrors.name) setFieldErrors(prev => ({ ...prev, name: '' }))
                    }}
                    placeholder="Ex: Equipe A, Equipe B"
                    error={fieldErrors.name}
                />

                {/* Category */}
                <div>
                    <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                        Categoria
                    </label>
                    <select
                        value={formData.category}
                        onChange={(e) => {
                            setFormData({ ...formData, category: e.target.value })
                            if (fieldErrors.category) setFieldErrors(prev => ({ ...prev, category: '' }))
                        }}
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
                    {fieldErrors.category && (
                        <p className="text-red-500 text-xs mt-1">{fieldErrors.category}</p>
                    )}
                </div>

                {/* Coordinator (Coach) */}
                <Input
                    label="Coordenador (Opcional)"
                    value={formData.coordinator}
                    onChange={(e) => setFormData({ ...formData, coordinator: e.target.value })}
                    placeholder="Nome do treinador responsável"
                />
            </form>
        </Modal>
    )
}
