import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'
import Alert from '../components/Alert'
import AthleteFormModal from '../components/AthleteFormModal'
import ConfirmDialog from '../components/ConfirmDialog'
import AthleteCard from '../components/AthleteCard'
import { useTheme } from '../context/ThemeContext'
import { useApp } from '../context/AppContext'
import { Athlete } from '../types'

export default function Athletes() {
  const { theme } = useTheme()
  const { athletes: contextAthletes, addAthlete: addToContext, updateAthlete: updateInContext, deleteAthlete: deleteFromContext } = useApp()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; athleteId: string | null }>({ isOpen: false, athleteId: null })
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAthletes = contextAthletes.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.school?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenForm = (athlete: Athlete | null = null) => {
    setSelectedAthlete(athlete)
    setIsFormModalOpen(true)
  }

  const handleSaveAthlete = async (data: Omit<Athlete, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true)
    setError(null)
    try {
      if (selectedAthlete) {
        // Update existing athlete
        await updateInContext(selectedAthlete.id, data as any)
        setSuccess('Atleta atualizado com sucesso!')
      } else {
        // Add new athlete
        await addToContext(data as any)
        setSuccess('Atleta cadastrado com sucesso!')
      }
      setIsFormModalOpen(false)
      setSelectedAthlete(null)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar atleta')
      console.error('Save athlete error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const confirmDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, athleteId: id })
  }

  const handleDelete = async () => {
    if (deleteConfirm.athleteId) {
      setIsLoading(true)
      setError(null)
      try {
        await deleteFromContext(deleteConfirm.athleteId)
        setSuccess('Atleta removido com sucesso!')
        setDeleteConfirm({ isOpen: false, athleteId: null })
        setTimeout(() => setSuccess(null), 3000)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao deletar atleta')
        console.error('Delete athlete error:', err)
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
            Gerenciamento de Atletas
          </h1>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
            Total: {contextAthletes.length} atletas cadastrados
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => handleOpenForm()}
          size="lg"
          className="w-full sm:w-auto"
        >
          + Novo Atleta
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
          placeholder="Pesquisar por nome ou escola..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Card>

      {/* Athletes Grid */}
      {filteredAthletes.length === 0 ? (
        <Card className={`text-center py-12 border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
          <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            {searchTerm ? 'Nenhum atleta encontrado' : 'Nenhum atleta cadastrado'}
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAthletes.map(athlete => (
            <AthleteCard
              key={athlete.id}
              athlete={athlete}
              onEdit={handleOpenForm}
              onDelete={confirmDelete}
            />
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
  )
}
