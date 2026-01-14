import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'
import BaseOneLogo from '../components/BaseOneLogo'

export default function Login() {
    const navigate = useNavigate()
    const { login, isLoading } = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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

        if (!formData.email.trim()) newErrors.email = 'Email obrigatório'
        if (!formData.password) newErrors.password = 'Senha obrigatória'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        try {
            await login(formData.email, formData.password)
            navigate('/dashboard')
        } catch (error) {
            console.error('Erro no login:', error)
            setErrors({ submit: 'Erro ao fazer login. Tente novamente.' })
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
                            <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent mb-2">Bem-vindo</h1>
                            <p className="text-slate-400 text-sm">Entre na sua conta para continuar</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
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
                                label="Senha"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password}
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
                                className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-700 shadow-lg shadow-blue-500/40"
                            >
                                {isLoading ? '⏳ Entrando...' : '✨ Entrar na Plataforma'}
                            </Button>

                            <div className="pt-6 border-t border-neutral-700/50">
                                <p className="text-center text-slate-400 text-sm">
                                    Não tem conta?{' '}
                                    <button
                                        type="button"
                                        onClick={() => navigate('/register')}
                                        className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                                    >
                                        Cadastre-se grátis
                                    </button>
                                </p>
                            </div>
                        </form>
                    </Card>

                    {/* Demo Info - Premium */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl backdrop-blur-sm">
                        <p className="text-blue-300 text-sm text-center font-medium">
                            <span className="inline-block mr-2">🎯</span>
                            Use qualquer email e senha (mín. 6 caracteres)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
