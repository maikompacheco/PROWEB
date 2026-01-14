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

    const isDark = theme === 'dark'

    // Calcular métricas reais
    const totalAthletes = athletes.length
    const totalTeams = teams.length
    const athletesWithTeam = athletes.filter(a => a.teamId).length
    const unassignedAthletes = totalAthletes - athletesWithTeam
    const percentageComplete = totalAthletes > 0 ? Math.round((athletesWithTeam / totalAthletes) * 100) : 0

    // Detecção de oportunidades geradas pela IA
    const aiOpportunities = [
        unassignedAthletes > 0 && { type: 'warning', message: `${unassignedAthletes} atleta(s) sem equipe. Distribua para melhorar análise.` },
        totalAthletes > 20 && { type: 'info', message: 'Você tem muitos atletas. Use filtros avançados para organizar.' },
        totalAthletes === 0 && { type: 'prompt', message: 'Comece importando atletas para usar o sistema.' }
    ].filter(Boolean)

    return (
        <div className="min-h-full">
            {/* Header - Elegante e premium */}
            <div className="w-full px-8 py-6 border-b border-neutral-700/50 backdrop-blur-sm">
                <div>
                    <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent tracking-tight">Dashboard</h1>
                    <p className={`text-sm mt-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        👋 Bem-vindo, <span className="font-semibold">{user?.name}</span> • {new Date().toLocaleDateString('pt-BR', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 px-8 pb-8 space-y-8">
                {/* 3 KPIs Principais - Premium Style */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                    <DashboardCard
                        icon="👥"
                        label="Total de Atletas"
                        value={totalAthletes}
                        description={`${athletesWithTeam} vinculados`}
                        variant="primary"
                        onClick={() => navigate('/athletes')}
                    />
                    <DashboardCard
                        icon="⚽"
                        label="Equipes Ativas"
                        value={totalTeams}
                        description={totalTeams > 0 ? `${totalTeams} categoria(s)` : 'Nenhuma configurada'}
                        variant="secondary"
                        onClick={() => navigate('/teams')}
                    />
                    <DashboardCard
                        icon="📈"
                        label="Taxa de Preenchimento"
                        value={`${percentageComplete}%`}
                        description={`${athletesWithTeam}/${totalAthletes} atletas`}
                        variant="success"
                    />
                </div>

                {/* Oportunidades Geradas pela IA - Seção Discreta */}
                {aiOpportunities.length > 0 && (
                    <div className={`rounded-lg border p-4 ${isDark
                        ? 'bg-neutral-900 border-neutral-800'
                        : 'bg-neutral-50 border-neutral-200'
                        }`}>
                        <div className="flex items-start gap-3">
                            <span className="text-xl mt-1">💡</span>
                            <div className="flex-1">
                                <p className="font-semibold text-sm mb-3 text-primary-600">Insights - Baseado em IA</p>
                                <div className="space-y-2">
                                    {aiOpportunities.map((opp, idx) => (
                                        <div
                                            key={idx}
                                            className={`text-sm px-3 py-2 rounded-md ${opp.type === 'warning'
                                                ? isDark ? 'bg-warning-500/10 text-warning-400' : 'bg-warning-50 text-warning-700'
                                                : opp.type === 'info' ? isDark ? 'bg-primary-500/10 text-primary-400' : 'bg-primary-50 text-primary-700'
                                                    : isDark ? 'bg-success-500/10 text-success-400' : 'bg-success-50 text-success-700'
                                                }`}
                                        >
                                            {opp.message}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Info Box - Informativo sem poluição */}
                <div
                    className={`rounded-lg border p-6 text-center ${isDark
                        ? 'bg-gradient-to-r from-neutral-900 to-neutral-900 border-neutral-800'
                        : 'bg-gradient-to-r from-primary-50 to-accent-50 border-neutral-200'
                        }`}
                >
                    <h3 className="font-semibold mb-2">Bem-vindo, {user?.name}! 👋</h3>
                    <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        BaseONE Professional - Organize atletas, equipes e decisões técnicas em um só lugar.
                    </p>
                </div>
            </div>
        </div>
    )
}
