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

    const categories = [
        { name: 'Sub 7', icon: '👶', color: 'from-pink-500 to-rose-500' },
        { name: 'Sub 8', icon: '👦', color: 'from-purple-500 to-pink-500' },
        { name: 'Sub 9', icon: '👦', color: 'from-blue-500 to-purple-500' },
        { name: 'Sub 10', icon: '🧒', color: 'from-cyan-500 to-blue-500' },
        { name: 'Sub 11', icon: '🧒', color: 'from-green-500 to-cyan-500' },
        { name: 'Sub 12', icon: '👦‍🦱', color: 'from-yellow-500 to-green-500' },
        { name: 'Sub 13', icon: '👨‍🦱', color: 'from-orange-500 to-yellow-500' },
        { name: 'Sub 14', icon: '👨', color: 'from-red-500 to-orange-500' },
        { name: 'Sub 15', icon: '👨', color: 'from-indigo-500 to-red-500' },
        { name: 'Sub 16', icon: '👨', color: 'from-violet-500 to-indigo-500' },
        { name: 'Sub 17', icon: '👨‍🔬', color: 'from-teal-500 to-violet-500' },
        { name: 'Sub 20', icon: '👨‍💼', color: 'from-slate-400 to-teal-500' },
    ]

    const features = [
        {
            icon: '📊',
            title: 'Análise Avançada',
            description: 'Acompanhamento detalhado de desempenho com gráficos em tempo real',
            highlight: true
        },
        {
            icon: '🎥',
            title: 'Vídeo-Análise',
            description: 'Ferramenta de análise de vídeos para estudar técnicas e jogadas',
            highlight: true
        },
        {
            icon: '📱',
            title: 'App Mobile',
            description: 'Acesso completo via smartphone - sincronização automática',
            highlight: false
        },
        {
            icon: '🏆',
            title: 'Ranking Atletas',
            description: 'Competição saudável com ranking interno e certificações',
            highlight: false
        },
        {
            icon: '⚽',
            title: 'Planejamento',
            description: 'Calendário de treinos e competições integrado',
            highlight: false
        },
        {
            icon: '🤝',
            title: 'Integração Social',
            description: 'Comunidade de técnicos e trocas de experiências',
            highlight: false
        },
        {
            icon: '💾',
            title: 'Backup Automático',
            description: 'Seus dados sempre seguros na nuvem',
            highlight: false
        },
        {
            icon: '🌍',
            title: 'Multibase',
            description: 'Gerencie múltiplas bases de treinamento em uma conta',
            highlight: false
        },
    ]

    return (
        <div className={`w-full ${theme === 'dark' ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50'}`}>
            {/* Hero Section */}
            <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-xl">
                        <span className="text-4xl font-bold text-white">B1</span>
                    </div>

                    <div className="space-y-3">
                        <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                            BaseOne
                        </h1>
                        <p className={`text-lg sm:text-xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                            Gestão Profissional de Base de Futebol
                        </p>
                    </div>

                    <p className={`max-w-2xl mx-auto text-base sm:text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        Transforme sua base de treinamento com ferramentas inteligentes de análise, planejamento e desenvolvimento de atletas. Do Sub-7 ao profissional.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => user ? navigate('/dashboard') : navigate('/register')}
                            className="w-full sm:w-auto"
                        >
                            {user ? 'Ir ao Dashboard' : 'Começar Agora'}
                        </Button>
                        {!user && (
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => navigate('/login')}
                                className="w-full sm:w-auto"
                            >
                                Já tem conta?
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            {/* Categorias Section */}
            <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                        Categorias Disponíveis
                    </h2>
                    <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        Gerenciar atletas em todas as faixas etárias com programas adaptados
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                    {categories.map((cat) => (
                        <div
                            key={cat.name}
                            className={`p-4 rounded-xl text-center cursor-pointer transition-transform hover:scale-105 ${theme === 'dark'
                                    ? 'bg-slate-800/50 border border-slate-700 hover:border-blue-500'
                                    : 'bg-white/50 border border-slate-200 hover:border-blue-500'
                                }`}
                        >
                            <div className={`text-4xl mb-2 bg-gradient-to-br ${cat.color} rounded-lg p-3 inline-block`}>
                                {cat.icon}
                            </div>
                            <h3 className={`font-bold text-sm sm:text-base ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                                {cat.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                        Recursos Diferenciais
                    </h2>
                    <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        Tudo o que você precisa para gerenciar uma base de excelência
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {features.map((feature, idx) => (
                        <Card
                            key={idx}
                            className={`border-2 transition-all hover:shadow-lg ${feature.highlight
                                    ? theme === 'dark'
                                        ? 'border-cyan-500 bg-cyan-500/10'
                                        : 'border-cyan-400 bg-cyan-50'
                                    : theme === 'dark'
                                        ? 'border-slate-700 bg-slate-800/50'
                                        : 'border-slate-200 bg-white/50'
                                }`}
                        >
                            <div className="text-4xl mb-3">{feature.icon}</div>
                            <h3 className={`font-bold text-lg mb-2 ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                                {feature.title}
                            </h3>
                            <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                {feature.description}
                            </p>
                            {feature.highlight && (
                                <div className="mt-3 inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold">
                                    ⭐ Exclusivo
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className={`w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-100/50'}`}>
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className={`text-3xl sm:text-4xl font-bold ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                        Pronto para transformar sua base?
                    </h2>
                    <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        Junte-se a centenas de bases que já confiam na BaseOne para desenvolver talentos
                    </p>
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => user ? navigate('/dashboard') : navigate('/register')}
                    >
                        {user ? 'Acessar Plataforma' : 'Criar Minha Conta Gratuita'}
                    </Button>
                </div>
            </section>
        </div>
    )
}
