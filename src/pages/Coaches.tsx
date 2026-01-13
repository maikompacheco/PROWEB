import React, { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useCoach } from '../context/CoachContext'
import { Coach, CoachRole, LicenseStatus } from '../types'
import Header from '../components/Header'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import Badge from '../components/Badge'
import Alert from '../components/Alert'

export default function CoachesPage() {
    const { theme } = useTheme()
    const { coaches, error, isLoading } = useCoach()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null)
    const [confirmDialog, setConfirmDialog] = useState<{
        isOpen: boolean
        type: 'deactivate' | 'suspend' | null
        coachId: string | null
    }>({ isOpen: false, type: null, coachId: null })
    const [successMessage, setSuccessMessage] = useState('')
    const [filterRole, setFilterRole] = useState<CoachRole | 'all'>('all')

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: CoachRole.FIELD_COACH as CoachRole,
        yearsExperience: 0,
        bio: ''
    })

    useEffect(() => {
        // Carrega treinadores quando componente monta
        // TODO: Integrar com autenticação para obter school_id
    }, [])

    const handleOpenModal = (coach: Coach | null = null) => {
        if (coach) {
            setSelectedCoach(coach)
            setFormData({
                name: coach.name,
                email: coach.email,
                phone: coach.phone || '',
                role: coach.role || CoachRole.FIELD_COACH,
                yearsExperience: coach.yearsExperience || 0,
                bio: coach.bio || ''
            })
        } else {
            setSelectedCoach(null)
            setFormData({
                name: '',
                email: '',
                phone: '',
                role: CoachRole.FIELD_COACH,
                yearsExperience: 0,
                bio: ''
            })
        }
        setIsModalOpen(true)
    }

    const handleSaveCoach = async () => {
        if (!formData.name || !formData.email) {
            alert('Preencha todos os campos obrigatórios')
            return
        }

        // TODO: Integrar com serviço de coaches
        // if (selectedCoach) {
        //     await updateCoach(selectedCoach.id, formData)
        //     setSuccessMessage('Treinador atualizado com sucesso!')
        // } else {
        //     await createCoach({
        //         ...formData,
        //         status: 'active'
        //     } as any)
        //     setSuccessMessage('Treinador criado com sucesso!')
        // }

        setSuccessMessage('Funcionalidade em desenvolvimento!')
        setIsModalOpen(false)
        setTimeout(() => setSuccessMessage(''), 3000)
    }

    const handleDeactivate = async () => {
        if (confirmDialog.coachId) {
            // TODO: Integrar com serviço de coaches
            // await deactivateCoach(confirmDialog.coachId)
            setSuccessMessage('Treinador desativado com sucesso!')
            setConfirmDialog({ isOpen: false, type: null, coachId: null })
            setTimeout(() => setSuccessMessage(''), 3000)
        }
    }

    const handleSuspend = async () => {
        if (confirmDialog.coachId) {
            // TODO: Integrar com serviço de coaches
            // await suspendCoach(confirmDialog.coachId)
            setSuccessMessage('Treinador suspenso com sucesso!')
            setConfirmDialog({ isOpen: false, type: null, coachId: null })
            setTimeout(() => setSuccessMessage(''), 3000)
        }
    }

    const filteredCoaches = filterRole === 'all'
        ? coaches
        : coaches.filter(c => c.role === filterRole)

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Título e Ações */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                            Gerenciar Treinadores
                        </h1>
                        <p className={`mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                            Gerencie licenças, roles e permissões dos treinadores
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        onClick={() => handleOpenModal()}
                    >
                        + Novo Treinador
                    </Button>
                </div>

                {/* Mensagens */}
                {successMessage && (
                    <Alert
                        type="success"
                        message={successMessage}
                        onClose={() => setSuccessMessage('')}
                    />
                )}
                {error && (
                    <Alert
                        type="error"
                        message={error}
                        onClose={() => setSuccessMessage('')}
                    />
                )}

                {/* Filtros */}
                <div className="mb-8 flex gap-2">
                    {(['all', 'field_coach', 'goalkeeper_coach', 'physical_trainer', 'director'] as const).map(role => (
                        <Button
                            key={role}
                            variant={filterRole === role ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setFilterRole(role as any)}
                        >
                            {role === 'all' ? 'Todos' : role.replace('_', ' ')}
                        </Button>
                    ))}
                </div>

                {/* Grid de Treinadores */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <Card key={i} className="skeleton h-64">
                                <div className="h-full bg-slate-700 animate-pulse" />
                            </Card>
                        ))}
                    </div>
                ) : filteredCoaches.length === 0 ? (
                    <Card className="text-center py-12">
                        <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                            Nenhum treinador encontrado
                        </p>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCoaches.map(coach => (
                            <Card
                                key={coach.id}
                                className={`relative overflow-hidden transition-all hover:shadow-xl`}
                            >
                                {/* Status Badge */}
                                <div className="absolute top-4 right-4">
                                    <Badge
                                        variant={
                                            coach.status === 'active'
                                                ? 'success'
                                                : coach.status === 'suspended'
                                                    ? 'error'
                                                    : 'secondary'
                                        }
                                    >
                                        {coach.status}
                                    </Badge>
                                </div>

                                {/* Informações */}
                                <div className="mb-4">
                                    <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                                        {coach.name}
                                    </h3>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                        {coach.role?.replace('_', ' ')}
                                    </p>
                                </div>

                                {/* Email e Telefone */}
                                <div className={`text-sm mb-4 space-y-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                    <p>📧 {coach.email}</p>
                                    {coach.phone && <p>📱 {coach.phone}</p>}
                                    {coach.yearsExperience && <p>📅 {coach.yearsExperience} anos</p>}
                                </div>

                                {/* Licenças */}
                                {coach.licenses && coach.licenses.length > 0 && (
                                    <div className="mb-4">
                                        <p className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                            LICENÇAS
                                        </p>
                                        <div className="space-y-1">
                                            {coach.licenses.map(license => (
                                                <div key={license.id} className="flex items-center gap-2 text-xs">
                                                    <Badge
                                                        variant={
                                                            license.status === 'valida'
                                                                ? 'success'
                                                                : license.status === 'expirada'
                                                                    ? 'error'
                                                                    : 'warning'
                                                        }
                                                    >
                                                        {license.licenseType}
                                                    </Badge>
                                                    <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}>
                                                        {new Date(license.expiryDate).toLocaleDateString('pt-BR')}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Bio */}
                                {coach.bio && (
                                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                        "{coach.bio}"
                                    </p>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => handleOpenModal(coach)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => setConfirmDialog({
                                            isOpen: true,
                                            type: coach.status === 'active' ? 'suspend' : 'deactivate',
                                            coachId: coach.id
                                        })}
                                    >
                                        {coach.status === 'active' ? 'Suspender' : 'Desativar'}
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </main>

            {/* Modal de Edição */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedCoach ? 'Editar Treinador' : 'Novo Treinador'}
            >
                <div className="space-y-4">
                    <Input
                        label="Nome *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nome completo"
                    />
                    <Input
                        label="Email *"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@example.com"
                    />
                    <Input
                        label="Telefone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(00) 99999-9999"
                    />
                    <div>
                        <label className="text-sm font-semibold mb-2 block">Role</label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                            className="input-field"
                        >
                            <option value="field_coach">Técnico de Campo</option>
                            <option value="goalkeeper_coach">Técnico de Goleiro</option>
                            <option value="physical_trainer">Preparador Físico</option>
                            <option value="director">Diretor Técnico</option>
                        </select>
                    </div>
                    <Input
                        label="Anos de Experiência"
                        type="number"
                        value={formData.yearsExperience}
                        onChange={(e) => setFormData({ ...formData, yearsExperience: parseInt(e.target.value) })}
                    />
                    <Input
                        label="Bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Descrição breve"
                    />

                    <div className="flex gap-2 mt-6">
                        <Button
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1"
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleSaveCoach}
                            className="flex-1"
                        >
                            Salvar
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Dialog de Confirmação */}
            <ConfirmDialog
                isOpen={confirmDialog.isOpen}
                title={confirmDialog.type === 'suspend' ? 'Suspender Treinador?' : 'Desativar Treinador?'}
                message={
                    confirmDialog.type === 'suspend'
                        ? 'O treinador será suspenso temporariamente. Ele poderá ser reativado depois.'
                        : 'O treinador será desativado permanentemente.'
                }
                confirmText={confirmDialog.type === 'suspend' ? 'Suspender' : 'Desativar'}
                isDangerous={true}
                onConfirm={confirmDialog.type === 'suspend' ? handleSuspend : handleDeactivate}
                onCancel={() => setConfirmDialog({ isOpen: false, type: null, coachId: null })}
            />
        </div>
    )
}
