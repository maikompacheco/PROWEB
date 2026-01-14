import React, { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import Card from "../components/Card"
import Button from "../components/Button"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import { useApp } from "../context/AppContext"
import AICoachAssistant from "../components/AICoachAssistant"

export default function AIAssistant() {
    const { theme } = useTheme()
    const { user } = useAuth()
    const { athletes, teams } = useApp()
    const navigate = useNavigate()
    const isDark = theme === "dark"

    const insights = useMemo(() => ([
        {
            id: "distribution",
            title: "Distribuicao de atletas",
            description: teams.length > 0 ? `Voce tem ${athletes.length} atletas em ${teams.length} equipes` : "Crie equipes para organizar seus atletas",
            action: () => navigate("/teams"),
            actionLabel: teams.length === 0 ? "Criar equipes" : "Ver detalhes",
            tone: "primary"
        },
        {
            id: "coverage",
            title: "Cobertura de dados",
            description: athletes.length > 0 ? `${Math.round((athletes.filter(a => a.position).length / athletes.length) * 100)}% com posicao preenchida` : "Adicione atletas e complete os dados",
            action: () => navigate("/athletes"),
            actionLabel: "Completar dados",
            tone: "accent"
        }
    ]), [athletes, teams, navigate])

    return (
        <div className={`min-h-screen ${isDark ? "bg-neutral-950" : "bg-neutral-50"}`}>
            <div className={`w-full px-8 py-6 border-b ${isDark ? "border-neutral-800 bg-neutral-950" : "border-neutral-200 bg-white"} sticky top-16 z-30`}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>Assistente + Insights</p>
                        <h1 className="text-3xl font-bold text-primary-600 tracking-tight">BaseONE Co-Pilot</h1>
                    </div>
                    {user && (
                        <div className={`px-4 py-2 rounded-xl text-sm ${isDark ? "bg-neutral-900 border border-neutral-800 text-neutral-200" : "bg-white border border-neutral-200 text-neutral-700"}`}>
                            {user.name}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 px-8 py-8 space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 space-y-4">
                        <Card className={`border ${isDark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200"}`}>
                            <div className="p-6 flex flex-col gap-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="px-3 py-1 text-xs rounded-full bg-primary-600/15 text-primary-500">IA Estrategica</span>
                                    <span className="px-3 py-1 text-xs rounded-full bg-accent-600/15 text-accent-500">Operacional</span>
                                </div>
                                <h2 className={`text-xl font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}>Insights rapidos para decidir</h2>
                                <p className={`${isDark ? "text-neutral-400" : "text-neutral-600"}`}>Combine o agente de IA com status de dados para priorizar o proximo passo.</p>
                            </div>
                        </Card>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {insights.map(insight => (
                                <Card key={insight.id} hover className={`border ${isDark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200"}`}>
                                    <div className="p-6 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h3 className={`font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}>{insight.title}</h3>
                                            <span className={`h-2 w-2 rounded-full ${insight.tone === "primary" ? "bg-primary-500" : "bg-accent-500"}`}></span>
                                        </div>
                                        <p className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>{insight.description}</p>
                                        <Button variant="outline" size="sm" onClick={() => insight.action()} className="w-full">
                                            {insight.actionLabel}
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="xl:col-span-1">
                        <AICoachAssistant />
                    </div>
                </div>
            </div>
        </div>
    )
}
