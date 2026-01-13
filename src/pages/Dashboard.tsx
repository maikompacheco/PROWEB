import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'

export default function Dashboard() {
    const { user } = useAuth()
    const { theme } = useTheme()
    const { athletes, teams } = useApp()
    const navigate = useNavigate()
    const [statsData, setStatsData] = useState({
        totalAthletes: 0,
        activeTeams: 0,
        averageAttendance: 0
    })

    useEffect(() => {
        setStatsData({
            totalAthletes: athletes.length,
            activeTeams: teams.length,
            averageAttendance: Math.round(Math.random() * 30 + 70) // Simula porcentagem
        })
    }, [athletes, teams])

    const stats = [
        { label: 'Total de Atletas', value: statsData.totalAthletes.toString(), color: 'blue' },
        { label: 'Equipes Ativas', value: statsData.activeTeams.toString(), color: 'cyan' },
        { label: 'Taxa de Assiduidade', value: `${statsData.averageAttendance}%`, color: 'blue' }
    ]

    return (
        <div className={`space-y-8 p-4 sm:p-6 lg:p-8 ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
            {/* Header */}
            <div>
                <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                    Bem-vindo, {user?.name}!
                </h1>
                <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                    Painel de controle de gerenciamento esportivo
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat, idx) => (
                    <Card key={idx} className={`text-center border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                        <div className="mb-4 flex justify-center">
                            <Badge variant={stat.color === 'blue' ? 'primary' : 'secondary'}>
                                {stat.label}
                            </Badge>
                        </div>
                        <p className={`text-3xl sm:text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                            {stat.value}
                        </p>
                        <div className={`w-full h-1 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'}`}>
                            <div
                                className={`h-full bg-gradient-to-r ${stat.color === 'cyan'
                                    ? 'from-cyan-500 to-cyan-600'
                                    : 'from-blue-500 to-blue-600'
                                    }`}
                                style={{ width: `${Math.random() * 40 + 60}%` }}
                            />
                        </div>
                    </Card>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                <Card className={`border-2 ${theme === 'dark' ? 'border-blue-600' : 'border-blue-500'}`}>
                    <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                        Gerenciar Atletas
                    </h3>
                    <p className={`mb-4 text-sm sm:text-base ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        Adicionar, editar ou remover atletas do sistema
                    </p>
                    <Button variant="primary" className="w-full" onClick={() => navigate('/athletes')}>
                        Ir para Atletas
                    </Button>
                </Card>

                <Card className={`border-2 ${theme === 'dark' ? 'border-cyan-600' : 'border-cyan-500'}`}>
                    <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                        Gerenciar Equipes
                    </h3>
                    <p className={`mb-4 text-sm sm:text-base ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        Organizar equipes e atribuir jogadores
                    </p>
                    <Button variant="secondary" className="w-full" onClick={() => navigate('/teams')}>
                        Ir para Equipes
                    </Button>
                </Card>
            </div>

            {/* Empty State Info */}
            {athletes.length === 0 && (
                <Card className={`border ${theme === 'dark' ? 'border-blue-600/30 bg-blue-950/20' : 'border-blue-400/30 bg-blue-50'}`}>
                    <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                        💡 <strong>Dica:</strong> Comece criando alguns atletas e equipes para visualizar dados no dashboard.
                    </p>
                </Card>
            )}
        </div>
    )
}
