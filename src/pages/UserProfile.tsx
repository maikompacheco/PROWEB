import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'
import Alert from '../components/Alert'

export default function UserProfile() {
    const { user } = useAuth()
    const { theme } = useTheme()
    const [isEditing, setIsEditing] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: ''
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const isDark = theme === 'dark'

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) newErrors.name = 'Nome obrigatório'
        if (!formData.email.includes('@')) newErrors.email = 'Email inválido'
        if (formData.password && formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Simular salvamento
        await new Promise(resolve => setTimeout(resolve, 800))
        setIsEditing(false)
        setFormData(prev => ({ ...prev, password: '' }))
        setSuccessMessage('Perfil atualizado com sucesso!')
        setTimeout(() => setSuccessMessage(''), 3000)
    }

    return (
        <div className={`min-h-screen ${isDark ? 'bg-neutral-950' : 'bg-white'}`}>
            {/* Header */}
            <div
                className={`${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                    } border-b px-8 py-6 sticky top-16 z-30`}
            >
                <h1 className="text-3xl font-bold text-primary-600 tracking-tight">Meu Perfil</h1>
                <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Gerencie suas informações e preferências pessoais
                </p>
            </div>

            {/* Content */}
            <div className="flex-1 px-8 py-8 max-w-2xl">
                {successMessage && (
                    <div className="mb-6 animate-in fade-in">
                        <Alert
                            type="success"
                            message={successMessage}
                            onClose={() => setSuccessMessage('')}
                        />
                    </div>
                )}

                {/* Avatar Section */}
                <Card
                    hover
                    className={`border mb-6 p-6 ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white flex items-center justify-center font-bold text-2xl">
                                {user?.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm font-semibold">{user?.name}</p>
                                <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Editable Form */}
                <Card className="p-6 space-y-6">
                    <form onSubmit={handleSave} className="space-y-5">
                        {/* Nome */}
                        <div>
                            <label
                                className={`block text-sm font-semibold mb-2 ${isDark ? 'text-neutral-200' : 'text-neutral-900'
                                    }`}
                            >
                                Nome Completo
                            </label>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                error={errors.name}
                                placeholder="Seu nome"
                                className={!isEditing ? 'opacity-70 cursor-not-allowed' : ''}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                className={`block text-sm font-semibold mb-2 ${isDark ? 'text-neutral-200' : 'text-neutral-900'
                                    }`}
                            >
                                Email
                            </label>
                            <Input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                error={errors.email}
                                placeholder="seu@email.com"
                                className={!isEditing ? 'opacity-70 cursor-not-allowed' : ''}
                            />
                        </div>

                        {/* Senha (apenas ao editar) */}
                        {isEditing && (
                            <div>
                                <label
                                    className={`block text-sm font-semibold mb-2 ${isDark ? 'text-neutral-200' : 'text-neutral-900'
                                        }`}
                                >
                                    Alterar Senha (Opcional)
                                </label>
                                <Input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                    placeholder="Deixe em branco para manter a atual"
                                />
                                <p className={`text-xs mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                    Mínimo de 6 caracteres
                                </p>
                            </div>
                        )}

                        {/* Divider */}
                        <div className={`h-px ${isDark ? 'bg-neutral-800' : 'bg-neutral-300'}`} />

                        {/* Actions */}
                        <div className="flex gap-3">
                            {isEditing ? (
                                <>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="flex-1"
                                    >
                                        💾 Salvar Alterações
                                    </Button>
                                    <Button
                                        variant="outline"
                                        type="button"
                                        className="flex-1"
                                        onClick={() => {
                                            setIsEditing(false)
                                            setFormData({
                                                name: user?.name || '',
                                                email: user?.email || '',
                                                password: ''
                                            })
                                            setErrors({})
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="primary"
                                    type="button"
                                    className="w-full"
                                    onClick={() => setIsEditing(true)}
                                >
                                    ✎ Editar Perfil
                                </Button>
                            )}
                        </div>
                    </form>
                </Card>

                {/* Informações Adicionais */}
                <Card className="p-6 mt-6">
                    <h3 className="font-semibold mb-4">Sobre sua conta</h3>
                    <div className={`space-y-3 text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        <div>
                            <p className="font-semibold text-neutral-700 dark:text-neutral-300">Tipo de Conta</p>
                            <p>BaseONE Professional - Acesso Completo</p>
                        </div>
                        <div>
                            <p className="font-semibold text-neutral-700 dark:text-neutral-300">Membro desde</p>
                            <p>{new Date().toLocaleDateString('pt-BR')}</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
