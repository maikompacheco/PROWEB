import React, { useState } from 'react'
import Modal from './Modal'
import Button from './Button'
import { Team, Athlete } from '../types'
import { useTheme } from '../context/ThemeContext'
import Avatar from './Avatar'
import Input from './Input'

interface TeamAthletesModalProps {
    isOpen: boolean
    team: Team | null
    allAthletes: Athlete[]
    onAddAthlete: (athleteId: string, teamId: string) => Promise<void>
    onRemoveAthlete: (athleteId: string) => Promise<void>
    onClose: () => void
}

export default function TeamAthletesModal({
    isOpen,
    team,
    allAthletes,
    onAddAthlete,
    onRemoveAthlete,
    onClose
}: TeamAthletesModalProps) {
    const { theme } = useTheme()
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    if (!team || !isOpen) return null

    // Atletas que já estão no time
    const teamAthletes = allAthletes.filter(a => a.teamId === team.id)

    // Atletas disponíveis para adicionar (sem time ou de outro time)
    const availableAthletes = allAthletes
        .filter(a => !a.teamId || a.teamId !== team.id)
        .filter(a =>
            a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.position?.toLowerCase().includes(searchTerm.toLowerCase())
        )

    const handleAddAthlete = async (athleteId: string) => {
        setIsLoading(true)
        try {
            await onAddAthlete(athleteId, team.id)
        } finally {
            setIsLoading(false)
        }
    }

    const handleRemoveAthlete = async (athleteId: string) => {
        setIsLoading(true)
        try {
            await onRemoveAthlete(athleteId)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Gerenciar Atletas - ${team.name}`}
            description="Adicione ou remova atletas vinculados a este time"
            footer={(
                <div className="flex justify-end">
                    <Button variant="outline" onClick={onClose}>
                        Fechar
                    </Button>
                </div>
            )}
        >
            <div className="space-y-6">
                {/* Atletas no Time */}
                <div>
                    <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        Atletas no Time ({teamAthletes.length})
                    </h3>

                    {teamAthletes.length === 0 ? (
                        <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} py-4 text-center`}>
                            Nenhum atleta vinculado ainda
                        </p>
                    ) : (
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {teamAthletes.map(athlete => (
                                <div
                                    key={athlete.id}
                                    className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'
                                        }`}
                                >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <Avatar
                                            name={athlete.name}
                                            size="sm"
                                            variant="gradient"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-medium truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                                {athlete.name}
                                            </p>
                                            <p className={`text-xs truncate ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                                {athlete.position || 'Posição não definida'} • {athlete.age ? `${athlete.age} anos` : 'Idade não definida'}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleRemoveAthlete(athlete.id)}
                                        disabled={isLoading}
                                        className="text-red-500 hover:text-red-600 border-red-500/30 hover:border-red-500"
                                    >
                                        Remover
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Adicionar Atletas */}
                <div className="space-y-3">
                    <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        Adicionar Atletas
                    </h3>

                    <Input
                        label="Buscar atleta por nome ou posição"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Digite para filtrar"
                    />

                    {availableAthletes.length === 0 ? (
                        <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} py-4 text-center`}>
                            {searchTerm ? 'Nenhum atleta encontrado' : 'Todos os atletas já estão vinculados'}
                        </p>
                    ) : (
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {availableAthletes.map(athlete => (
                                <div
                                    key={athlete.id}
                                    className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'
                                        }`}
                                >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <Avatar
                                            name={athlete.name}
                                            size="sm"
                                            variant="gradient"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-medium truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                                {athlete.name}
                                            </p>
                                            <p className={`text-xs truncate ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                                {athlete.position || 'Posição não definida'} • {athlete.age ? `${athlete.age} anos` : 'Idade não definida'}
                                                {athlete.teamId && ' • Outro time'}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => handleAddAthlete(athlete.id)}
                                        disabled={isLoading}
                                    >
                                        + Adicionar
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end pt-4 border-t border-slate-700">
                    <Button variant="outline" onClick={onClose}>
                        Fechar
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
