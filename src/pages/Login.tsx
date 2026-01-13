import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'

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
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-md">
                <Card className="border-2 border-slate-700">
                    <div className="mb-8 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-2xl">B</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-50 mb-2">BaseONE</h1>
                        <p className="text-slate-400">Gerenciamento esportivo profissional</p>
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
                            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                                {errors.submit}
                            </div>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            isLoading={isLoading}
                            className="w-full"
                        >
                            Entrar
                        </Button>

                        <div className="pt-4 border-t border-slate-700">
                            <p className="text-center text-slate-400 text-sm mb-4">
                                Não tem conta?{' '}
                                <button
                                    type="button"
                                    onClick={() => navigate('/register')}
                                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                                >
                                    Cadastre-se aqui
                                </button>
                            </p>
                        </div>
                    </form>
                </Card>

                {/* Demo Info */}
                <div className="mt-8 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
                    <p className="text-slate-400 text-xs text-center">
                        <span className="font-semibold text-slate-300">Demo: </span>
                        Use qualquer email e senha (mínimo 6 caracteres)
                    </p>
                </div>
            </div>
        </div>
    )
}
