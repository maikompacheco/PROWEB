import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import Badge from '../components/Badge'
import Input from '../components/Input'
import { useTheme } from '../context/ThemeContext'
import { useApp } from '../context/AppContext'
import { teamService } from '../services/teamService'
import { Team } from '../types'

export default function Teams() {
    const { theme } = useTheme()
    const { teams: contextTeams, athletes, addTeam: addTeamToContext, deleteTeam: deleteTeamFromContext } = useApp()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; teamId: string | null }>({ isOpen: false, teamId: null })
    const [formData, setFormData] = useState({ name: '', school: '' })

    // Get athletes for each team from context - real-time sync
    const teamsWithAthletes = contextTeams.map(team => ({
        ...team,
        players: athletes.filter(a => a.teamId === team.id)
    }))

    const handleAddTeam = async () => {
        if (formData.name && formData.school) {
            setIsLoading(true)
            setError(null)
            try {
                await addTeamToContext({
                    name: formData.name,
                    school: formData.school,
                    players: []
                })
                setFormData({ name: '', school: '' })
                setIsModalOpen(false)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao adicionar equipe')
                console.error('Add team error:', err)
            } finally {
                setIsLoading(false)
            }
        }
    }

    const confirmDelete = (id: string) => {
        setDeleteConfirm({ isOpen: true, teamId: id })
    }

    const handleDelete = async () => {
        if (deleteConfirm.teamId) {
            setIsLoading(true)
            setError(null)
            try {
                await deleteTeamFromContext(deleteConfirm.teamId)
                setDeleteConfirm({ isOpen: false, teamId: null })
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao deletar equipe')
                console.error('Delete team error:', err)
            } finally {
                setIsLoading(false)
            }
        }
    }

    const teamToDelete = teamsWithAthletes.find(t => t.id === deleteConfirm.teamId)

    return (
        <div className={`space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8 ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                        Gerenciamento de Equipes
                    </h1>
                    <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                        Total: {teamsWithAthletes.length} equipes cadastradas
                    </p>
                </div>
                <Button variant="primary" onClick={() => setIsModalOpen(true)} size="lg" className="w-full sm:w-auto">
                    + Nova Equipe
                </Button>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {teamsWithAthletes.map(team => (
                    <Card key={team.id} className={`card-hover border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                                    {team.name}
                                </h3>
                                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {team.school}
                                </p>
                            </div>
                            <Badge variant="primary">Ativa</Badge>
                        </div>

                        <div className={`py-3 border-t mb-4 ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                            <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                                <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}>
                                    Jogadores:
                                </span>{' '}
                                {team.players.length}
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm" className="flex-1">
                                Editar
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => confirmDelete(team.id)}
                            >
                                Remover
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Cadastrar Nova Equipe"
            >
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAddTeam() }}>
                    <Input
                        label="Nome da Equipe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Time Escolar A"
                    />
                    <Input
                        label="Escola"
                        value={formData.school}
                        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                        placeholder="Escola A"
                    />
                    <div className="flex gap-3 mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="flex-1"
                            onClick={handleAddTeam}
                        >
                            Cadastrar
                        </Button>
                    </div>
                </form>
            </Modal>

            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                title="Remover Equipe"
                message={`Tem certeza que deseja remover a equipe "${teamToDelete?.name}"? Esta ação não pode ser desfeita.`}
                confirmText="Remover"
                cancelText="Cancelar"
                isDangerous={true}
                onConfirm={handleDelete}
                onCancel={() => setDeleteConfirm({ isOpen: false, teamId: null })}
            />
        </div>
    )
}
