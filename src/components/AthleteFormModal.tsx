import React, { useEffect, useId, useState } from 'react'
import Modal from './Modal'
import Button from './Button'
import Input from './Input'

import { uploadAvatar } from '../services/avatarService'
import { Athlete } from '../types'
import { useTheme } from '../context/ThemeContext'

interface AthleteFormModalProps {
    isOpen: boolean
    athlete: Athlete | null
    isLoading?: boolean
    onSave: (athlete: Omit<Athlete, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
    onClose: () => void
    title?: string
}

export default function AthleteFormModal({
    isOpen,
    athlete,
    isLoading = false,
    onSave,
    onClose,
    title
}: AthleteFormModalProps) {
    const { theme } = useTheme()
    const formId = useId()
    const [formData, setFormData] = useState({
        name: '',
        club: '',
        position: '',
        age: '',
        category: '',
        secondaryPosition: '',
        dominantFoot: '',
        avatarUrl: ''
    })
    const [avatarLoading, setAvatarLoading] = useState(false)

    const [error, setError] = useState<string | null>(null)
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    // Populate form when athlete changes
    useEffect(() => {
        if (athlete) {
            setFormData({
                name: athlete.name || '',
                club: athlete.club || '',
                position: athlete.position || '',
                age: athlete.age?.toString() || '',
                category: athlete.category || '',
                secondaryPosition: athlete.secondaryPosition || '',
                dominantFoot: athlete.dominantFoot || '',
                avatarUrl: athlete.avatarUrl || ''
            })
        } else {
            setFormData({
                name: '',
                club: '',
                position: '',
                age: '',
                category: '',
                secondaryPosition: '',
                dominantFoot: '',
                avatarUrl: ''
            })
        }
        setError(null)
    }, [athlete, isOpen])

    const validate = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório'
        if (!formData.club.trim()) newErrors.club = 'Clube é obrigatório'
        if (!formData.age) newErrors.age = 'Idade é obrigatória'
        return newErrors
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const newErrors = validate()
        setFieldErrors(newErrors)
        if (Object.keys(newErrors).length > 0) {
            setError('Corrija os campos obrigatórios antes de continuar')
            return
        }

        try {
            await onSave({
                name: formData.name.trim(),
                club: formData.club.trim(),
                position: formData.position.trim(),
                age: parseInt(formData.age, 10),
                category: formData.category.trim(),
                secondaryPosition: formData.secondaryPosition.trim(),
                dominantFoot: formData.dominantFoot as Athlete['dominantFoot'],
                avatarUrl: formData.avatarUrl,
                tracking: athlete?.tracking || { lastSeen: new Date().toISOString(), gps: null, heartRate: null }
            })
            onClose()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao salvar atleta')
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title || (athlete ? 'Editar Atleta' : 'Novo Atleta')}
            description="Preencha os dados básicos para manter o cadastro consistente"
            footer={(
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        className="sm:min-w-[140px]"
                        onClick={onClose}
                        disabled={isLoading || avatarLoading}
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
                        {athlete ? 'Salvar alterações' : 'Cadastrar atleta'}
                    </Button>
                </div>
            )}
        >
            <form id={formId} className="space-y-5" onSubmit={handleSubmit}>
                {error && (
                    <div className={`p-3 rounded-lg border text-sm ${theme === 'dark'
                        ? 'bg-red-950/30 border-red-500/40 text-red-200'
                        : 'bg-red-50 border-red-200 text-red-700'
                        }`} role="alert">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Nome Completo *"
                        value={formData.name}
                        onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value })
                            if (fieldErrors.name) setFieldErrors(prev => ({ ...prev, name: '' }))
                        }}
                        placeholder="João Silva"
                        disabled={isLoading}
                        error={fieldErrors.name}
                    />

                    <Input
                        label="Idade *"
                        type="number"
                        value={formData.age}
                        onChange={(e) => {
                            setFormData({ ...formData, age: e.target.value })
                            if (fieldErrors.age) setFieldErrors(prev => ({ ...prev, age: '' }))
                        }}
                        placeholder="17"
                        disabled={isLoading}
                        error={fieldErrors.age}
                    />
                </div>

                <Input
                    label="Clube *"
                    value={formData.club}
                    onChange={(e) => {
                        setFormData({ ...formData, club: e.target.value })
                        if (fieldErrors.club) setFieldErrors(prev => ({ ...prev, club: '' }))
                    }}
                    placeholder="Clube do Atleta"
                    disabled={isLoading}
                    error={fieldErrors.club}
                />

                {/* Upload de Avatar */}
                <div className={`flex flex-col gap-3 rounded-xl border p-4 ${theme === 'dark' ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'}`}>
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-sm font-semibold">Foto do Atleta</p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Use uma imagem quadrada para melhor resultado</p>
                        </div>
                        {formData.avatarUrl && (
                            <img src={formData.avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full object-cover border" />
                        )}
                    </div>
                    <label htmlFor="athlete-avatar-upload" className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg border transition-colors cursor-pointer ${theme === 'dark'
                        ? 'border-slate-700 text-slate-100 hover:bg-slate-800'
                        : 'border-slate-300 text-slate-800 hover:bg-slate-100'
                        }`}>
                        {avatarLoading ? 'Enviando...' : 'Selecionar foto'}
                        <input
                            id="athlete-avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={avatarLoading}
                            onChange={async e => {
                                const file = e.target.files?.[0]
                                if (!file) return
                                setAvatarLoading(true)
                                try {
                                    const id = athlete?.id || formData.name.replace(/\s/g, '').toLowerCase() + Date.now()
                                    const url = await uploadAvatar(id, file)
                                    setFormData(prev => ({ ...prev, avatarUrl: url }))
                                } catch (err: any) {
                                    setError('Erro ao enviar foto: ' + (err.message || err))
                                } finally {
                                    setAvatarLoading(false)
                                }
                            }}
                        />
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Posição Principal"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        placeholder="Atacante"
                        disabled={isLoading}
                    />

                    <Input
                        label="Posição Secundária"
                        value={formData.secondaryPosition}
                        onChange={(e) => setFormData({ ...formData, secondaryPosition: e.target.value })}
                        placeholder="Ala"
                        disabled={isLoading}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Categoria"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="Sub-14"
                        disabled={isLoading}
                    />

                    <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Pé Dominante</label>
                        <select
                            value={formData.dominantFoot}
                            onChange={(e) => setFormData({ ...formData, dominantFoot: e.target.value })}
                            disabled={isLoading}
                            className={`w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${theme === 'dark'
                                ? 'bg-slate-900 border-slate-700 text-slate-100 focus:border-primary-500 focus:ring-primary-500/20'
                                : 'bg-white border-slate-300 text-slate-900 focus:border-primary-500 focus:ring-primary-500/20'
                                }`}
                        >
                            <option value="">Selecione...</option>
                            <option value="direito">Direito</option>
                            <option value="esquerdo">Esquerdo</option>
                            <option value="ambidestro">Ambidestro</option>
                        </select>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
