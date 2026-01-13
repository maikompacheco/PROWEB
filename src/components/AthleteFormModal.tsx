import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import Button from './Button'
import Input from './Input'
import { Athlete } from '../types'

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
    const [formData, setFormData] = useState({
        name: '',
        school: '',
        position: '',
        age: '',
        category: '',
        secondaryPosition: '',
        dominantFoot: ''
    })

    const [error, setError] = useState<string | null>(null)

    // Populate form when athlete changes
    useEffect(() => {
        if (athlete) {
            setFormData({
                name: athlete.name || '',
                school: athlete.school || '',
                position: athlete.position || '',
                age: athlete.age?.toString() || '',
                category: athlete.category || '',
                secondaryPosition: athlete.secondaryPosition || '',
                dominantFoot: athlete.dominantFoot || ''
            })
        } else {
            setFormData({
                name: '',
                school: '',
                position: '',
                age: '',
                category: '',
                secondaryPosition: '',
                dominantFoot: ''
            })
        }
        setError(null)
    }, [athlete, isOpen])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        // Validation
        if (!formData.name.trim()) {
            setError('Nome é obrigatório')
            return
        }
        if (!formData.school.trim()) {
            setError('Escola é obrigatória')
            return
        }
        if (!formData.age) {
            setError('Idade é obrigatória')
            return
        }

        try {
            await onSave({
                name: formData.name,
                school: formData.school,
                position: formData.position,
                age: parseInt(formData.age),
                category: formData.category,
                secondaryPosition: formData.secondaryPosition,
                dominantFoot: formData.dominantFoot as any,
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
        >
            <form className="space-y-4" onSubmit={handleSubmit}>
                {error && (
                    <div className="p-3 bg-red-500/20 border border-red-500/30 rounded text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <Input
                    label="Nome Completo *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="João Silva"
                    disabled={isLoading}
                />

                <Input
                    label="Idade *"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="17"
                    disabled={isLoading}
                />

                <Input
                    label="Escola *"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    placeholder="Escola A"
                    disabled={isLoading}
                />

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

                <Input
                    label="Categoria"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Sub-14"
                    disabled={isLoading}
                />

                <div>
                    <label className="block text-sm font-semibold mb-2">Pé Dominante</label>
                    <select
                        value={formData.dominantFoot}
                        onChange={(e) => setFormData({ ...formData, dominantFoot: e.target.value })}
                        disabled={isLoading}
                        className="w-full px-3 py-2 rounded-lg border input-field"
                    >
                        <option value="">Selecione...</option>
                        <option value="direito">Direito</option>
                        <option value="esquerdo">Esquerdo</option>
                        <option value="ambidestro">Ambidestro</option>
                    </select>
                </div>

                <div className="flex gap-3 mt-6">
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
                        {athlete ? 'Salvar Alterações' : 'Cadastrar'}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
