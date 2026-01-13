import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import DashboardCard from '../components/DashboardCard'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'
import { useCoach } from '../context/CoachContext'

export default function Dashboard() {
    const { user } = useAuth()
    const { theme } = useTheme()
    const { athletes, teams } = useApp()
    const { coaches } = useCoach()
    const navigate = useNavigate()

    // Calcular métricas reais
    const totalAthletes = athletes.length
    const totalTeams = teams.length
    const totalCoaches = coaches.length
    const athletesWithTeam = athletes.filter(a => a.teamId).length
    const percentageWithTeam = totalAthletes > 0 ? Math.round((athletesWithTeam / totalAthletes) * 100) : 0

    return (
        <div className={`space-y-8 p-4 sm:p-6 lg:p-8 ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
            {/* Header */}
            <div>
                <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                    👋 Bem-vindo, {user?.name || 'Usuário'}!
                </h1>
                <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                    Painel de controle do BaseONE Sports
                </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <DashboardCard
                    icon="👥"
                    label="Total de Atletas"
                    value={totalAthletes}
                    description={`${athletesWithTeam} com equipe`}
                    variant="primary"
                />
                <DashboardCard
                    icon="⚽"
                    label="Equipes Ativas"
                    value={totalTeams}
                    description={`${teams.length > 0 ? 'Organizadas' : 'Nenhuma ainda'}`}
                    variant="secondary"
                />
                <DashboardCard
                    icon="🎓"
                    label="Treinadores"
                    value={totalCoaches}
                    description="Coordenadores e especialistas"
                    variant="success"
                />
                <DashboardCard
                    icon="📊"
                    label="Cobertura"
                    value={`${percentageWithTeam}%`}
                    description="Atletas em equipes"
                    variant="warning"
                />
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
                <Card className={`border-2 ${theme === 'dark' ? 'border-blue-600/50 hover:border-blue-500' : 'border-blue-300 hover:border-blue-400'} transition-all cursor-pointer`}
                    onClick={() => navigate('/athletes')}>
                    <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                        📋 Gerenciar Atletas
                    </h3>
                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        Adicionar e gerenciar seus atletas
                    </p>
                    <Button variant="primary" size="sm" className="w-full">
                        Abrir
                    </Button>
                </Card>

                <Card className={`border-2 ${theme === 'dark' ? 'border-cyan-600/50 hover:border-cyan-500' : 'border-cyan-300 hover:border-cyan-400'} transition-all cursor-pointer`}
                    onClick={() => navigate('/teams')}>
                    <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                        ⚽ Gerenciar Equipes
                    </h3>
                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        Organizar equipes e categorias
                    </p>
                    <Button variant="secondary" size="sm" className="w-full">
                        Abrir
                    </Button>
                </Card>

                <Card className={`border-2 ${theme === 'dark' ? 'border-emerald-600/50 hover:border-emerald-500' : 'border-emerald-300 hover:border-emerald-400'} transition-all cursor-pointer`}
                    onClick={() => navigate('/coaches')}>
                    <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                        🎓 Gerenciar Treinadores
                    </h3>
                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        Coordenadores e especialistas
                    </p>
                    <Button variant="secondary" size="sm" className="w-full">
                        Abrir
                    </Button>
                </Card>
            </div>

            {/* Info Alerts */}
            {totalAthletes === 0 && (
                <Card className={`border ${theme === 'dark' ? 'border-blue-600/30 bg-blue-950/20' : 'border-blue-400/30 bg-blue-50'}`}>
                    <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                        💡 <strong>Começar:</strong> Clique em "Gerenciar Atletas" para cadastrar seu primeiro atleta!
                    </p>
                </Card>
            )}

            {totalTeams > 0 && athletesWithTeam === 0 && (
                <Card className={`border ${theme === 'dark' ? 'border-amber-600/30 bg-amber-950/20' : 'border-amber-400/30 bg-amber-50'}`}>
                    <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-amber-300' : 'text-amber-700'}`}>
                        ⚠️ <strong>Atenção:</strong> Você tem equipes mas nenhum atleta associado. Clique em "Gerenciar Atletas" para associar.
                    </p>
                </Card>
            )}
        </div>
    )
}
