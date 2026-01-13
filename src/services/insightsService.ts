import { supabase } from '../config/supabase'
import { AthleteInsights } from '../types'

export class InsightsService {
    /**
     * Busca insights de um atleta
     */
    static async getAthleteInsights(athleteId: string): Promise<AthleteInsights | null> {
        try {
            const { data, error } = await supabase
                .from('athlete_insights')
                .select('*')
                .eq('athlete_id', athleteId)
                .order('last_updated', { ascending: false })
                .limit(1)
                .single()

            if (error) throw error
            return data
        } catch (error) {
            console.error('Erro ao buscar insights:', error)
            return null
        }
    }

    /**
     * Busca histórico completo de insights de um atleta
     */
    static async getAthleteInsightsHistory(athleteId: string): Promise<AthleteInsights[]> {
        try {
            const { data, error } = await supabase
                .from('athlete_insights')
                .select('*')
                .eq('athlete_id', athleteId)
                .order('last_updated', { ascending: false })

            if (error) throw error
            return data || []
        } catch (error) {
            console.error('Erro ao buscar histórico:', error)
            return []
        }
    }

    /**
     * Cria/atualiza insights de um atleta
     */
    static async upsertInsights(athleteId: string, insights: Partial<AthleteInsights>): Promise<AthleteInsights | null> {
        try {
            const { data, error } = await supabase
                .from('athlete_insights')
                .upsert({
                    ...insights,
                    athlete_id: athleteId,
                    last_updated: new Date().toISOString()
                })
                .select()
                .single()

            if (error) throw error
            return data
        } catch (error) {
            console.error('Erro ao salvar insights:', error)
            return null
        }
    }

    /**
     * Busca insights de múltiplos atletas
     */
    static async getTeamInsights(teamId: string): Promise<AthleteInsights[]> {
        try {
            const { data, error } = await supabase
                .from('athlete_insights')
                .select(`
                    *,
                    athletes:athlete_id(id, name)
                `)
                .eq('athletes.team_id', teamId)

            if (error) throw error
            return data || []
        } catch (error) {
            console.error('Erro ao buscar insights do time:', error)
            return []
        }
    }

    /**
     * Calcula sugestões de IA para desenvolvimento do atleta
     */
    static generateAIRecommendations(insights: AthleteInsights): {
        trainingFocus: string[]
        recommendedPositions: string[]
        developmentPhase: string
        competitionLevel: string
    } {
        const recommendations = {
            trainingFocus: [] as string[],
            recommendedPositions: [] as string[],
            developmentPhase: 'inicial',
            competitionLevel: 'amador'
        }

        // Recomendações baseadas em pontos fracos
        if (insights.improvementAreas?.includes('Velocidade')) {
            recommendations.trainingFocus.push('Trabalho de aceleração e velocidade')
        }
        if (insights.improvementAreas?.includes('Força')) {
            recommendations.trainingFocus.push('Treinamento de força funcional')
        }
        if (insights.improvementAreas?.includes('Defesa')) {
            recommendations.trainingFocus.push('Técnicas de marcação e posicionamento')
        }

        // Recomendações de posição baseadas em forças
        if (insights.technicalStrengths?.includes('Visão de jogo')) {
            recommendations.recommendedPositions.push('Meia')
        }
        if (insights.technicalStrengths?.includes('Cabeceio')) {
            recommendations.recommendedPositions.push('Zagueiro')
            recommendations.recommendedPositions.push('Atacante')
        }

        // Nível de competição baseado em potencial
        if (insights.potentialLevel === 'excepcional') {
            recommendations.competitionLevel = 'profissional'
            recommendations.developmentPhase = 'avancado'
        } else if (insights.potentialLevel === 'alto') {
            recommendations.competitionLevel = 'semi-profissional'
            recommendations.developmentPhase = 'intermediario'
        }

        return recommendations
    }

    /**
     * Analisa evolução de um atleta ao longo do tempo
     */
    static async analyzeEvolution(athleteId: string): Promise<{
        technicalGrowth: number
        physicalGrowth: number
        behavioralGrowth: number
        overallTendency: 'ascending' | 'stable' | 'declining'
    } | null> {
        try {
            const history = await this.getAthleteInsightsHistory(athleteId)

            if (history.length < 2) {
                return null
            }

            const latest = history[0]
            const oldest = history[history.length - 1]

            // Calcula crescimento (simplificado)
            return {
                technicalGrowth: (latest.technicalStrengths?.length || 0) - (oldest.technicalStrengths?.length || 0),
                physicalGrowth: 0, // Será calculado com mais dados
                behavioralGrowth: 0,
                overallTendency: 'stable' // Será determinado por análise mais complexa
            }
        } catch (error) {
            console.error('Erro ao analisar evolução:', error)
            return null
        }
    }

    /**
     * Exporta dados para análise de IA
     */
    static async exportForAIAnalysis(schoolId: string): Promise<any[]> {
        try {
            const { data, error } = await supabase
                .from('athlete_insights')
                .select(`
                    *,
                    athletes:athlete_id(
                        id,
                        name,
                        age,
                        position,
                        category,
                        status,
                        physicalHistory,
                        evaluations:athlete_evaluations(*)
                    )
                `)
                .eq('athletes.school_id', schoolId)

            if (error) throw error
            return data || []
        } catch (error) {
            console.error('Erro ao exportar dados:', error)
            return []
        }
    }

    /**
     * Busca atletas com melhor potencial por categoria
     */
    static async getTopPotentialAthletes(schoolId: string, category: string, limit: number = 10): Promise<AthleteInsights[]> {
        try {
            const { data, error } = await supabase
                .from('athlete_insights')
                .select(`
                    *,
                    athletes:athlete_id(id, name, category)
                `)
                .eq('athletes.school_id', schoolId)
                .eq('athletes.category', category)
                .in('potential_level', ['alto', 'excepcional'])
                .order('potential_level', { ascending: false })
                .limit(limit)

            if (error) throw error
            return data || []
        } catch (error) {
            console.error('Erro ao buscar atletas com potencial:', error)
            return []
        }
    }

    /**
     * Gera relatório de insights para um atleta
     */
    static generateReport(insights: AthleteInsights): string {
        let report = `\n=== RELATÓRIO DE DESENVOLVIMENTO ===\n\n`

        report += `Atleta ID: ${insights.athleteId}\n`
        report += `Temporada: ${insights.seasonYear}\n`
        report += `Atualizado em: ${new Date(insights.lastUpdated).toLocaleDateString('pt-BR')}\n\n`

        report += `FORÇAS TÉCNICAS:\n`
        insights.technicalStrengths?.forEach(s => {
            report += `  ✓ ${s}\n`
        })

        report += `\nAREAS A MELHORAR:\n`
        insights.improvementAreas?.forEach(a => {
            report += `  ○ ${a}\n`
        })

        if (insights.potentialLevel) {
            report += `\nNÍVEL DE POTENCIAL: ${insights.potentialLevel.toUpperCase()}\n`
        }

        if (insights.aiAnalysis?.trainingFocus) {
            report += `\nFOCO DO TREINAMENTO:\n`
            insights.aiAnalysis.trainingFocus.forEach(f => {
                report += `  → ${f}\n`
            })
        }

        report += `\n${insights.technicalNotes}\n`

        return report
    }
}
