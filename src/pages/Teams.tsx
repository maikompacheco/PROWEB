import React, { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import Alert from '../components/Alert'
import TeamEditModal from '../components/TeamEditModal'
import ConfirmDialog from '../components/ConfirmDialog'
import TeamCard from '../components/TeamCard'
import { useTheme } from '../context/ThemeContext'
import { useApp } from '../context/AppContext'
import { Team } from '../types'

export default function Teams() {
    const { theme } = useTheme()
    const { teams: contextTeams, athletes, addTeam: addTeamToContext, updateTeam: updateTeamInContext, deleteTeam: deleteTeamFromContext } = useApp()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [isFormModalOpen, setIsFormModalOpen] = useState(false)
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; teamId: string | null }>({ isOpen: false, teamId: null })
    const [searchTerm, setSearchTerm] = useState('')

    // Get athletes for each team from context - real-time sync
    const teamsWithAthletes = contextTeams
        .map(team => ({
            ...team,
            players: athletes.filter(a => a.teamId === team.id)
        }))
        .filter(t =>
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.category?.toLowerCase().includes(searchTerm.toLowerCase())
        )

    const handleOpenForm = (team: Team | null = null) => {
        setSelectedTeam(team)
        setIsFormModalOpen(true)
    }

    const handleSaveTeam = async (data: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>) => {
        setIsLoading(true)
        setError(null)
        try {
            if (selectedTeam) {
                // Update existing team
                await updateTeamInContext(selectedTeam.id, data as any)
                setSuccess('Equipe atualizada com sucesso!')
            } else {
                // Add new team
                await addTeamToContext(data as any)
                setSuccess('Equipe cadastrada com sucesso!')
            }
            setIsFormModalOpen(false)
            setSelectedTeam(null)
            setTimeout(() => setSuccess(null), 3000)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao salvar equipe')
            console.error('Save team error:', err)
        } finally {
            setIsLoading(false)
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
                setSuccess('Equipe removida com sucesso!')
                setDeleteConfirm({ isOpen: false, teamId: null })
                setTimeout(() => setSuccess(null), 3000)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao deletar equipe')
                console.error('Delete team error:', err)
            } finally {
                setIsLoading(false)
            }
        }
    }

    return (
        <div className={`space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8 ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                        ⚽ Gerenciamento de Equipes
                    </h1>
                    <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                        Total: {contextTeams.length} equipes cadastradas
                    </p>
                </div>
                <Button
                    variant="primary"
                    onClick={() => handleOpenForm()}
                    size="lg"
                    className="w-full sm:w-auto"
                >
                    + Nova Equipe
                </Button>
            </div>

            {/* Alerts */}
            {success && (
                <Alert
                    type="success"
                    message={success}
                    onClose={() => setSuccess(null)}
                />
            )}
            {error && (
                <Alert
                    type="error"
                    message={error}
                    onClose={() => setError(null)}
                />
            )}

            {/* Search */}
            <Card className={`p-3 sm:p-4 border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                <Input
                    placeholder="Pesquisar por nome ou categoria..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Card>

            {/* Teams Grid */}
            {teamsWithAthletes.length === 0 ? (
                <Card className={`text-center py-12 border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                    <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        {searchTerm ? 'Nenhuma equipe encontrada' : 'Nenhuma equipe cadastrada'}
                    </p>
                </Card>
            ) : (
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {teamsWithAthletes.map(team => (
                        <TeamCard
                            key={team.id}
                            team={team}
                            onEdit={handleOpenForm}
                            onDelete={confirmDelete}
                        />
                    ))}
                </div>
            )}

            {/* Form Modal */}
            <TeamEditModal
                isOpen={isFormModalOpen}
                team={selectedTeam}
                isLoading={isLoading}
                onSave={handleSaveTeam}
                onClose={() => {
                    setIsFormModalOpen(false)
                    setSelectedTeam(null)
                }}
            />

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                title="Remover equipe?"
                message="Essa ação removerá a equipe permanentemente."
                confirmText="Remover"
                cancelText="Cancelar"
                isDangerous={true}
                isLoading={isLoading}
                onConfirm={handleDelete}
                onCancel={() => setDeleteConfirm({ isOpen: false, teamId: null })}
            />
        </div>
    )
}
