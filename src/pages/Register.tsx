import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'
import BaseOneLogo from '../components/BaseOneLogo'

export default function Register() {
    const navigate = useNavigate()
    const { register, isLoading } = useAuth()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        club: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) newErrors.name = 'Nome obrigatório'
        if (!formData.email.trim()) newErrors.email = 'Email obrigatório'
        if (!formData.password) newErrors.password = 'Senha obrigatória'
        if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres'
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Senhas não correspondem'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                club: formData.club
            })
            navigate('/dashboard')
        } catch (error) {
            console.error('Erro no registro:', error)
            const errorMsg = error instanceof Error ? error.message : 'Erro ao cadastrar. Tente novamente.'
            setErrors({ submit: errorMsg })
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-blue-950/20 to-neutral-950 relative overflow-hidden">
            {/* Background Effects Premium */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.08),transparent_50%)]" />
            <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
                <div className="w-full max-w-md">
                    <Card className="border border-blue-500/20 shadow-2xl backdrop-blur-xl bg-neutral-900/95">
                        <div className="mb-8 text-center flex flex-col items-center justify-center">
                            <div className="mb-4">
                                <BaseOneLogo size="lg" variant="full" />
                            </div>
                            <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent mb-2">Cadastre-se</h1>
                            <p className="text-slate-400 text-sm">Comece sua jornada gratuitamente</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Input
                                label="Nome Completo"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={errors.name}
                                placeholder="Seu nome"
                            />

                            <Input
                                label="E-mail"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                                placeholder="seu@email.com"
                            />

                            <Input
                                label="Clube/Instituição"
                                name="club"
                                value={formData.club}
                                onChange={handleChange}
                                placeholder="Nome do clube (opcional)"
                            />

                            <Input
                                label="Senha"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password}
                                placeholder="Mínimo 6 caracteres"
                            />

                            <Input
                                label="Confirmar Senha"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={errors.confirmPassword}
                                placeholder="••••••••"
                            />

                            {errors.submit && (
                                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium">
                                    {errors.submit}
                                </div>
                            )}

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                isLoading={isLoading}
                                className="w-full mt-6 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-700 shadow-lg shadow-blue-500/40"
                            >
                                {isLoading ? '⏳ Criando conta...' : '✨ Criar Conta Grátis'}
                            </Button>

                            <div className="pt-6 border-t border-neutral-700/50">
                                <p className="text-center text-slate-400 text-sm">
                                    Já tem conta?{' '}
                                    <button
                                        type="button"
                                        onClick={() => navigate('/login')}
                                        className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                                    >
                                        Faça login aqui
                                    </button>
                                </p>
                            </div>
                        </form>
                    </Card>

                    {/* Demo Info - Premium */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl backdrop-blur-sm">
                        <p className="text-blue-300 text-sm text-center font-medium">
                            <span className="inline-block mr-2">🎯</span>
                            Todos os campos são válidos para teste
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
