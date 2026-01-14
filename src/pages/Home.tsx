import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import Button from '../components/Button'
import Card from '../components/Card'

export default function Home() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { theme } = useTheme()

    const benefits = [
        {
            icon: '⚡',
            title: 'Gestão Completa',
            description: 'Controle total de atletas, times e avaliações em uma única plataforma'
        },
        {
            icon: '📊',
            title: 'Análise de Dados',
            description: 'Métricas e estatísticas para decisões baseadas em dados reais'
        },
        {
            icon: '🎯',
            title: 'Acompanhamento Individual',
            description: 'Evolução personalizada de cada atleta com histórico completo'
        },
        {
            icon: '🤖',
            title: 'ProCoach AI',
            description: 'Inteligência artificial para sugerir melhorias e otimizar treinos'
        }
    ]

    const stats = [
        { value: '500+', label: 'Atletas Cadastrados' },
        { value: '50+', label: 'Bases Ativas' },
        { value: '10k+', label: 'Avaliações Realizadas' },
        { value: '95%', label: 'Satisfação' }
    ]

    return (
        <div className="w-full min-h-full bg-gradient-to-br from-neutral-950 via-blue-950/20 to-neutral-950">
            {/* Hero Section - Premium e moderno */}
            <section className={`relative overflow-hidden`}>
                {/* Background effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.08),transparent_50%)]" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Conteúdo */}
                        <div className="space-y-8">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/50 border border-blue-800`}>
                                <span className="text-2xl">⚽</span>
                                <span className={`text-sm font-semibold text-blue-300`}>
                                    BaseONE Sports Platform
                                </span>
                            </div>

                            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-black leading-tight text-white`}>
                                O futuro do
                                <span className="block bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-400 bg-clip-text text-transparent"> gerenciamento </span>
                                esportivo
                            </h1>

                            <p className={`text-lg sm:text-xl text-neutral-300`}>
                                Plataforma completa para gestão de atletas de base. Rastreamento em tempo real, análises com IA, avaliações técnicas e muito mais.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => user ? navigate('/dashboard') : navigate('/register')}
                                    className="text-lg px-8 py-4 shadow-lg shadow-blue-500/30 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-700"
                                >
                                    {user ? '🚀 Ir ao Dashboard' : '✨ Começar Grátis'}
                                </Button>
                                {!user && (
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => navigate('/login')}
                                        className="text-lg px-8 py-4 border-blue-500/50 text-blue-300 hover:bg-blue-950/40"
                                    >
                                        Já tenho conta →
                                    </Button>
                                )}
                            </div>

                            {/* Stats rápidos */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                                {stats.map((stat, idx) => (
                                    <div key={idx}>
                                        <div className={`text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent`}>
                                            {stat.value}
                                        </div>
                                        <div className={`text-sm text-neutral-400`}>
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Ilustração/Preview - Premium */}
                        <div className="relative hidden lg:block">
                            <div className={`absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 blur-3xl`} />
                            <Card className="relative backdrop-blur-sm border border-blue-500/20">
                                <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-blue-500/30 to-cyan-500/30 flex items-center justify-center border border-blue-400/20">
                                    <span className="text-8xl">⚽</span>
                                </div>
                                <div className="mt-4 space-y-2">
                                    <div className={`h-4 rounded bg-neutral-700 w-3/4`} />
                                    <div className={`h-4 rounded bg-neutral-700 w-1/2`} />
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefícios - Grid moderno com estilo premium */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className={`text-4xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent`}>
                        Tudo que você precisa
                    </h2>
                    <p className={`text-lg text-neutral-300`}>
                        Ferramentas profissionais para gestão completa da sua base
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((benefit, idx) => (
                        <Card
                            key={idx}
                            className={`text-center group hover:scale-105 transition-all duration-300 border border-blue-500/20 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20 bg-neutral-900/50`}
                        >
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl bg-blue-950/50 group-hover:scale-110 transition-transform`}>
                                {benefit.icon}
                            </div>
                            <h3 className={`text-lg font-bold mb-2 text-white`}>
                                {benefit.title}
                            </h3>
                            <p className={`text-sm text-neutral-400`}>
                                {benefit.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA Final - Premium e elegante */}
            <section className={`bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-blue-600/10 border-t border-blue-500/20`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent mb-6">
                        Comece sua jornada hoje
                    </h2>
                    <p className="text-lg text-blue-100 mb-8">
                        Junte-se a centenas de bases que já usam BaseONE para formar campeões
                    </p>
                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => user ? navigate('/dashboard') : navigate('/register')}
                        className="text-lg px-10 py-4 bg-gradient-to-r from-white to-neutral-100 hover:from-neutral-50 hover:to-neutral-100 text-blue-600 font-bold shadow-xl"
                    >
                        {user ? '🚀 Acessar Plataforma' : '✨ Criar Conta Grátis'}
                    </Button>
                </div>
            </section>
        </div>
    )
}
