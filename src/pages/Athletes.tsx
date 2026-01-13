import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import Badge from '../components/Badge'
import { useTheme } from '../context/ThemeContext'
import { useApp } from '../context/AppContext'
import { athleteService } from '../services/athleteService'
import { Athlete } from '../types'

export default function Athletes() {
  const { theme } = useTheme()
  const { athletes: contextAthletes, addAthlete: addToContext, deleteAthlete: deleteFromContext } = useApp()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; athleteId: string | null }>({ isOpen: false, athleteId: null })
  const [formData, setFormData] = useState({ name: '', school: '', position: '', age: '' })
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAthletes = contextAthletes.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.school?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddAthlete = async () => {
    if (formData.name && formData.school) {
      setIsLoading(true)
      setError(null)
      try {
        await addToContext({
          name: formData.name,
          age: parseInt(formData.age),
          school: formData.school,
          position: formData.position,
          tracking: { lastSeen: new Date().toISOString(), gps: null, heartRate: null }
        })
        setFormData({ name: '', school: '', position: '', age: '' })
        setIsModalOpen(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao adicionar atleta')
        console.error('Add athlete error:', err)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const confirmDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, athleteId: id })
  }

  const getStatusColor = (lastSeen: string | undefined): string => {
    if (!lastSeen) return 'gray'
    const hours = (new Date().getTime() - new Date(lastSeen).getTime()) / (1000 * 60 * 60)
    if (hours < 1) return 'green'
    if (hours < 24) return 'yellow'
    return 'red'
  }

  const handleDelete = async () => {
    if (deleteConfirm.athleteId) {
      setIsLoading(true)
      setError(null)
      try {
        await deleteFromContext(deleteConfirm.athleteId)
        setDeleteConfirm({ isOpen: false, athleteId: null })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao deletar atleta')
        console.error('Delete athlete error:', err)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const athleteToDelete = deleteConfirm.athleteId ? filteredAthletes.find(a => a.id === deleteConfirm.athleteId) : null

  return (
    <div className={`space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8 ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
            Gerenciamento de Atletas
          </h1>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
            Total: {contextAthletes.length} atletas cadastrados
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)} size="lg" className="w-full sm:w-auto">
          + Novo Atleta
        </Button>
      </div>

      <Card className={`p-3 sm:p-4 border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
        <Input
          placeholder="Pesquisar por nome ou escola..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Card>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAthletes.map(athlete => (
          <Card key={athlete.id} fullHeight className={`card-hover border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                  {athlete.name}
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {athlete.school}
                </p>
              </div>
              <Badge variant="secondary">{athlete.position}</Badge>
            </div>

            {/* Body - Grows to fill available space */}
            <div className={`space-y-3 py-3 border-t flex-grow ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
              <div className="flex justify-between text-sm">
                <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}>
                  Idade:
                </span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-950'}`}>
                  {athlete.age} anos
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}>
                  Status:
                </span>
                <Badge variant={getStatusColor(athlete.tracking?.lastSeen) === 'green' ? 'success' : getStatusColor(athlete.tracking?.lastSeen) === 'yellow' ? 'warning' : 'error'}>
                  {getStatusColor(athlete.tracking?.lastSeen) === 'green' ? 'Online' : 'Offline'}
                </Badge>
              </div>
              {athlete.tracking?.heartRate && (
                <div className="flex justify-between text-sm">
                  <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}>
                    FC:
                  </span>
                  <span className={`font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-950'}`}>
                    {athlete.tracking.heartRate} bpm
                  </span>
                </div>
              )}
            </div>

            {/* Footer - Always at bottom */}
            <div className="flex gap-2 mt-4">
              <Button variant="secondary" size="sm" className="flex-1">
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => confirmDelete(athlete.id)}
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
        title="Cadastrar Novo Atleta"
      >
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAddAthlete() }}>
          <Input
            label="Nome Completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="João Silva"
          />
          <Input
            label="Idade"
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            placeholder="17"
          />
          <Input
            label="Escola"
            value={formData.school}
            onChange={(e) => setFormData({ ...formData, school: e.target.value })}
            placeholder="Escola A"
          />
          <Input
            label="Posição"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            placeholder="Atacante"
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
              onClick={handleAddAthlete}
            >
              Cadastrar
            </Button>
          </div>
        </form>
      </Modal>

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
