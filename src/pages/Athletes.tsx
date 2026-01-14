import React, { useState, useMemo } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import Alert from '../components/Alert'
import AthleteFormModal from '../components/AthleteFormModal'
import ConfirmDialog from '../components/ConfirmDialog'
import AthleteCard from '../components/AthleteCard'
import EmptyState from '../components/EmptyState'
import SearchFilters, { POSITIONS } from '../components/SearchFilters'
import { useTheme } from '../context/ThemeContext'
import { useApp } from '../context/AppContext'
import { Athlete } from '../types'

interface AthleteFilters {
  search: string
  position?: string
  withTeam?: 'all' | 'assigned' | 'unassigned'
}

export default function Athletes() {
  const { theme } = useTheme()
  const { athletes, isLoading, error, addAthlete, updateAthlete, deleteAthlete } = useApp()
  const [success, setSuccess] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; athleteId: string | null }>({ isOpen: false, athleteId: null })
  const [filters, setFilters] = useState<AthleteFilters>({ search: '' })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [sortBy, setSortBy] = useState<'name' | 'position'>('name')

  // Filtros otimizados com useMemo e ordenação
  const filteredAndSortedAthletes = useMemo(() => {
    let result = athletes.filter(a => {
      // Search filter
      if (filters.search && !a.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !a.club?.toLowerCase().includes(filters.search.toLowerCase()) &&
        !a.position?.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }

      // Position filter
      if (filters.position && a.position !== filters.position) {
        return false
      }

      // Team status filter
      if (filters.withTeam === 'assigned' && !a.teamId) {
        return false
      }
      if (filters.withTeam === 'unassigned' && a.teamId) {
        return false
      }

      return true
    })

    // Aplicar ordenação
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortBy === 'position') {
        return (a.position || '').localeCompare(b.position || '')
      }
      return 0
    })

    return result
  }, [athletes, filters, sortBy])

  const handleOpenForm = (athleteId: string | null = null) => {
    if (athleteId) {
      const athlete = athletes.find(a => a.id === athleteId)
      setSelectedAthlete(athlete || null)
    } else {
      setSelectedAthlete(null)
    }
    setIsFormModalOpen(true)
  }

  const handleSaveAthlete = async (athleteData: any) => {
    try {
      if (selectedAthlete?.id) {
        await updateAthlete(selectedAthlete.id, athleteData)
        setSuccess('✅ Atleta atualizado com sucesso!')
      } else {
        await addAthlete(athleteData)
        setSuccess('✅ Atleta adicionado com sucesso!')
      }
      setIsFormModalOpen(false)
      setSelectedAthlete(null)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Erro ao salvar atleta')
      setTimeout(() => setErrorMsg(null), 3000)
    }
  }

  const confirmDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, athleteId: id })
  }

  const handleViewAthlete = (id: string) => {
    handleOpenForm(id)
  }

  const handleDelete = async () => {
    if (!deleteConfirm.athleteId) return
    try {
      await deleteAthlete(deleteConfirm.athleteId)
      setSuccess('✅ Atleta removido com sucesso!')
      setDeleteConfirm({ isOpen: false, athleteId: null })
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Erro ao remover atleta')
      setDeleteConfirm({ isOpen: false, athleteId: null })
      setTimeout(() => setErrorMsg(null), 3000)
    }
  }

  // Stats
  const stats = useMemo(() => ({
    total: athletes.length,
    withTeam: athletes.filter(a => a.teamId).length,
    unassigned: athletes.filter(a => !a.teamId).length
  }), [athletes])

  return (
    <div className="min-h-full flex flex-col">
      {/* Header - Premium Minimal */}
      <div className="px-6 sm:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${theme === 'dark' ? 'text-neutral-50' : 'text-neutral-950'}`}>
              Atletas
            </h1>
            <p className={`text-sm mt-1.5 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
              {filteredAndSortedAthletes.length} de {athletes.length} atleta{athletes.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => handleOpenForm()}
            className="px-6 py-2.5 whitespace-nowrap"
          >
            ➕ Novo Atleta
          </Button>
        </div>
      </div>

      {/* Controls - Fixed sticky bar */}
      <div className="px-6 sm:px-8 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-[280px]">
            <SearchFilters
              onFiltersChange={setFilters}
              initialFilters={filters}
              showAdvanced={true}
            />
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* View Toggle */}
            <div className="flex rounded-lg border" style={{
              borderColor: theme === 'dark' ? 'rgb(38, 38, 38)' : 'rgb(229, 231, 235)'
            }}>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-l-lg ${viewMode === 'grid'
                  ? theme === 'dark' ? 'bg-primary-600/20 text-primary-400' : 'bg-primary-50 text-primary-600'
                  : theme === 'dark' ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
              >
                ⊞ Grid
              </button>
              <div className={`w-px ${theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-200'}`} />
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-r-lg ${viewMode === 'list'
                  ? theme === 'dark' ? 'bg-primary-600/20 text-primary-400' : 'bg-primary-50 text-primary-600'
                  : theme === 'dark' ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
              >
                ≡ Lista
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors focus:outline-none focus:ring-2 ${theme === 'dark'
                ? 'bg-neutral-900 border-neutral-700 text-neutral-100 focus:border-primary-500 focus:ring-primary-500/20'
                : 'bg-white border-neutral-300 text-neutral-900 focus:border-primary-500 focus:ring-primary-500/20'
                }`}
            >
              <option value="name">Ordenar: Nome</option>
              <option value="position">Ordenar: Posição</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
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
        {(error || errorMsg) && (
          <Alert
            type="error"
            message={errorMsg || (typeof error === 'string' ? error : 'Erro ao carregar atletas')}
            onClose={() => setErrorMsg(null)}
          />
        )}

        {/* Athletes Grid or List */}
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
        ) : filteredAndSortedAthletes.length === 0 ? (
          <Card className={`border ${theme === 'dark' ? 'border-neutral-800 bg-neutral-900/50' : 'border-neutral-200 bg-neutral-50'} p-12`}>
            <EmptyState
              icon={filters.search || filters.position ? '🔍' : '👥'}
              title={filters.search || filters.position ? 'Nenhum atleta encontrado' : 'Nenhum atleta cadastrado'}
              description={filters.search || filters.position
                ? 'Tente ajustar os filtros'
                : 'Comece adicionando seu primeiro atleta'}
              actionLabel={filters.search || filters.position ? undefined : '➕ Cadastrar Atleta'}
              onAction={filters.search || filters.position ? undefined : () => handleOpenForm()}
            />
          </Card>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300">
            {filteredAndSortedAthletes.map((athlete, idx) => (
              <div key={athlete.id} style={{ animationDelay: `${idx * 30}ms` }} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <AthleteCard
                  athlete={athlete}
                  onEdit={handleOpenForm}
                  onDelete={confirmDelete}
                  onView={handleViewAthlete}
                  variant="grid"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2 animate-in fade-in duration-300">
            {filteredAndSortedAthletes.map((athlete, idx) => (
              <div key={athlete.id} style={{ animationDelay: `${idx * 30}ms` }} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <AthleteCard
                  athlete={athlete}
                  onEdit={handleOpenForm}
                  onDelete={confirmDelete}
                  onView={handleViewAthlete}
                  variant="list"
                />
              </div>
            ))}
          </div>
        )}

        {/* Form Modal */}
        <AthleteFormModal
          isOpen={isFormModalOpen}
          athlete={selectedAthlete}
          isLoading={isLoading}
          onSave={handleSaveAthlete}
          onClose={() => {
            setIsFormModalOpen(false)
            setSelectedAthlete(null)
          }}
        />

        {/* Delete Confirmation */}
        <ConfirmDialog
          isOpen={deleteConfirm.isOpen}
          title="Remover atleta?"
          message="Essa ação removerá o atleta permanentemente."
          confirmText="Remover"
          cancelText="Cancelar"
          isDangerous={true}
          isLoading={isLoading}
          onConfirm={handleDelete}
          onCancel={() => setDeleteConfirm({ isOpen: false, athleteId: null })}
        />
      </div>
    </div>
  )
}
