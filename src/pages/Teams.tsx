import React, { useState, useMemo } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import Alert from '../components/Alert'
import TeamEditModal from '../components/TeamEditModal'
import ConfirmDialog from '../components/ConfirmDialog'
import TeamCard from '../components/TeamCard'
import TeamAthletesModal from '../components/TeamAthletesModal'
import EmptyState from '../components/EmptyState'
import { useTheme } from '../context/ThemeContext'
import { useApp } from '../context/AppContext'
import { Team } from '../types'

export default function Teams() {
    const { theme } = useTheme()
    const { teams: contextTeams, athletes, addTeam: addTeamToContext, updateTeam: updateTeamInContext, deleteTeam: deleteTeamFromContext, addAthleteToTeam, removeAthleteFromTeam } = useApp()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [isFormModalOpen, setIsFormModalOpen] = useState(false)
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; teamId: string | null }>({ isOpen: false, teamId: null })
    const [searchTerm, setSearchTerm] = useState('')
    const [isAthletesModalOpen, setIsAthletesModalOpen] = useState(false)
    const [selectedTeamForAthletes, setSelectedTeamForAthletes] = useState<Team | null>(null)
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [sortBy, setSortBy] = useState<'name' | 'category' | 'athletes'>('name')

    // Get athletes for each team from context - real-time sync com ordenação
    const teamsWithAthletes = useMemo(() => {
        let result = contextTeams
            .map(team => ({
                ...team,
                players: athletes.filter(a => a.teamId === team.id)
            }))
            .filter(t =>
                t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.category?.toLowerCase().includes(searchTerm.toLowerCase())
            )

        // Aplicar ordenação
        result.sort((a, b) => {
            if (sortBy === 'name') {
                return a.name.localeCompare(b.name)
            } else if (sortBy === 'category') {
                return (a.category || '').localeCompare(b.category || '')
            } else if (sortBy === 'athletes') {
                return (b.players?.length || 0) - (a.players?.length || 0)
            }
            return 0
        })

        return result
    }, [contextTeams, athletes, searchTerm, sortBy])

    const stats = useMemo(() => ({
        total: contextTeams.length,
        withAthletes: contextTeams.filter(t => athletes.some(a => a.teamId === t.id)).length,
        totalAthletes: athletes.length
    }), [contextTeams, athletes])

    const handleOpenForm = (teamId: string | null = null) => {
        if (teamId) {
            const team = contextTeams.find(t => t.id === teamId)
            setSelectedTeam(team || null)
        } else {
            setSelectedTeam(null)
        }
        setIsFormModalOpen(true)
    }

    const handleViewTeam = (teamId: string) => {
        handleOpenForm(teamId)
    }

    const handleSaveTeam = async (data: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>) => {
        setIsLoading(true)
        setError(null)
        try {
            if (selectedTeam) {
                // Update existing team
                await updateTeamInContext(selectedTeam.id, data as any)
                setSuccess('✅ Equipe atualizada com sucesso!')
            } else {
                // Add new team
                await addTeamToContext(data as any)
                setSuccess('✅ Equipe cadastrada com sucesso!')
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
                setSuccess('✅ Equipe removida com sucesso!')
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

    const handleOpenAthletesModal = (team: Team) => {
        setSelectedTeamForAthletes(team)
        setIsAthletesModalOpen(true)
    }

    const handleAddAthleteToTeam = async (athleteId: string, teamId: string) => {
        try {
            setIsLoading(true)
            await addAthleteToTeam(athleteId, teamId)
            const athlete = athletes.find(a => a.id === athleteId)
            if (athlete) {
                setSuccess(`✅ ${athlete.name} adicionado à equipe!`)
                setTimeout(() => setSuccess(null), 3000)
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao adicionar atleta')
            setTimeout(() => setError(null), 3000)
        } finally {
            setIsLoading(false)
        }
    }

    const handleRemoveAthleteFromTeam = async (athleteId: string) => {
        try {
            setIsLoading(true)
            const athlete = athletes.find(a => a.id === athleteId)
            if (athlete && athlete.teamId) {
                await removeAthleteFromTeam(athleteId, athlete.teamId)
                setSuccess(`✅ ${athlete.name} removido da equipe!`)
                setTimeout(() => setSuccess(null), 3000)
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao remover atleta')
            setTimeout(() => setError(null), 3000)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-full">
            {/* Header - Premium Minimal */}
            <div className="px-8 py-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-neutral-50' : 'text-neutral-950'}`}>
                            Equipes
                        </h1>
                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            {teamsWithAthletes.length} de {contextTeams.length} equipe{contextTeams.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        onClick={() => handleOpenForm()}
                        className="px-6 py-2"
                    >
                        ➕ Nova Equipe
                    </Button>
                </div>
            </div>

            {/* Controls - Fixed sticky bar */}
            <div className="px-8 py-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3 px-4 py-2 rounded-lg border" style={{
                        borderColor: theme === 'dark' ? 'rgb(38, 38, 38)' : 'rgb(229, 231, 235)'
                    }}>
                        <span className="text-xl">🔍</span>
                        <Input
                            placeholder="Pesquisar equipes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border-0 focus:ring-0"
                        />
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                        {/* View Toggle */}
                        <div className="flex rounded-lg border" style={{
                            borderColor: theme === 'dark' ? 'rgb(38, 38, 38)' : 'rgb(229, 231, 235)'
                        }}>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`px-3 py-2 text-sm font-medium transition-colors ${viewMode === 'grid'
                                    ? theme === 'dark' ? 'bg-primary-600/20 text-primary-400' : 'bg-primary-50 text-primary-600'
                                    : theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                                    }`}
                            >
                                ⊞ Grid
                            </button>
                            <div className={`w-px ${theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-200'}`} />
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-3 py-2 text-sm font-medium transition-colors ${viewMode === 'list'
                                    ? theme === 'dark' ? 'bg-primary-600/20 text-primary-400' : 'bg-primary-50 text-primary-600'
                                    : theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                                    }`}
                            >
                                ≡ Lista
                            </button>
                        </div>

                        {/* Sort Dropdown */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className={`px-3 py-2 rounded border text-sm font-medium transition-colors ${theme === 'dark'
                                ? 'bg-neutral-800 border-neutral-700 text-neutral-100'
                                : 'bg-white border-neutral-300 text-neutral-900'
                                }`}
                        >
                            <option value="name">Ordenar: Nome</option>
                            <option value="category">Ordenar: Categoria</option>
                            <option value="athletes">Ordenar: # Atletas</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex-1 px-8 py-6 space-y-5 overflow-y-auto">
                {/* Alerts */}
                {success && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <Alert
                            type="success"
                            message={success}
                            onClose={() => setSuccess(null)}
                        />
                    </div>
                )}
                {error && (
                    <Alert
                        type="error"
                        message={error}
                        onClose={() => setError(null)}
                    />
                )}

                {/* Teams Grid or List */}
                {isLoading ? (
                    <div className={viewMode === 'grid'
                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                        : 'space-y-2'
                    }>
                        {[...Array(6)].map((_, i) => (
                            <Card key={i} className={`${viewMode === 'grid' ? 'h-64' : 'h-16'} animate-pulse`}>
                                <div className={`h-full rounded-lg ${theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-200'}`} />
                            </Card>
                        ))}
                    </div>
                ) : teamsWithAthletes.length === 0 ? (
                    <Card className={`border ${theme === 'dark' ? 'border-neutral-800 bg-neutral-900/50' : 'border-neutral-200 bg-neutral-50'} p-12`}>
                        <EmptyState
                            icon={searchTerm ? '🔍' : '⚽'}
                            title={searchTerm ? 'Nenhuma equipe encontrada' : 'Nenhuma equipe cadastrada'}
                            description={searchTerm
                                ? 'Tente ajustar sua busca'
                                : 'Comece criando sua primeira equipe'}
                            actionLabel={searchTerm ? undefined : '➕ Criar Equipe'}
                            onAction={searchTerm ? undefined : () => handleOpenForm()}
                        />
                    </Card>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300">
                        {teamsWithAthletes.map((team, idx) => (
                            <div key={team.id} style={{ animationDelay: `${idx * 30}ms` }} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <TeamCard
                                    team={team}
                                    athleteCount={team.players?.length || 0}
                                    onEdit={handleOpenForm}
                                    onDelete={confirmDelete}
                                    onView={handleViewTeam}
                                    variant="grid"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-2 animate-in fade-in duration-300">
                        {teamsWithAthletes.map((team, idx) => (
                            <div key={team.id} style={{ animationDelay: `${idx * 30}ms` }} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <TeamCard
                                    team={team}
                                    athleteCount={team.players?.length || 0}
                                    onEdit={handleOpenForm}
                                    onDelete={confirmDelete}
                                    onView={handleViewTeam}
                                    variant="list"
                                />
                            </div>
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

                {/* Athletes Management Modal */}
                <TeamAthletesModal
                    isOpen={isAthletesModalOpen}
                    team={selectedTeamForAthletes}
                    allAthletes={athletes}
                    onAddAthlete={handleAddAthleteToTeam}
                    onRemoveAthlete={handleRemoveAthleteFromTeam}
                    onClose={() => {
                        setIsAthletesModalOpen(false)
                        setSelectedTeamForAthletes(null)
                    }}
                />
            </div>
        </div>
    )
}
