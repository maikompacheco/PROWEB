import React, { createContext, useState, useCallback, ReactNode } from 'react'
import { Coach, AthleteInsights } from '../types'

interface CoachContextType {
    coaches: Coach[]
    insights: AthleteInsights[]
    isLoading: boolean
    error: string | null

    // Coaches
    fetchCoaches: () => Promise<void>
    addCoach: (coach: Omit<Coach, 'id'>) => Promise<void>
    updateCoach: (id: string, coach: Partial<Coach>) => Promise<void>
    deleteCoach: (id: string) => Promise<void>

    // Insights
    fetchInsights: () => Promise<void>
    getAthleteInsights: (athleteId: string) => AthleteInsights | undefined
    updateAthleteInsights: (athleteId: string, insights: Partial<AthleteInsights>) => Promise<void>
}

const CoachContext = createContext<CoachContextType | undefined>(undefined)

export function CoachProvider({ children }: { children: ReactNode }) {
    const [coaches, setCoaches] = useState<Coach[]>([])
    const [insights, setInsights] = useState<AthleteInsights[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchCoaches = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            // Será integrado com API real
            await new Promise(resolve => setTimeout(resolve, 500))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar treinadores')
        } finally {
            setIsLoading(false)
        }
    }, [])

    const addCoach = useCallback(async (coach: Omit<Coach, 'id'>) => {
        setError(null)
        try {
            const newCoach: Coach = {
                ...coach,
                id: `coach_${Date.now()}`,
                createdAt: new Date().toISOString(),
            }
            setCoaches(prev => [...prev, newCoach])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao adicionar treinador')
        }
    }, [])

    const updateCoach = useCallback(async (id: string, data: Partial<Coach>) => {
        setError(null)
        try {
            setCoaches(prev => prev.map(c => c.id === id ? { ...c, ...data, updatedAt: new Date().toISOString() } : c))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao atualizar treinador')
        }
    }, [])

    const deleteCoach = useCallback(async (id: string) => {
        setError(null)
        try {
            setCoaches(prev => prev.filter(c => c.id !== id))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao deletar treinador')
        }
    }, [])

    const fetchInsights = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            // Será integrado com API real
            await new Promise(resolve => setTimeout(resolve, 500))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar insights')
        } finally {
            setIsLoading(false)
        }
    }, [])

    const getAthleteInsights = useCallback((athleteId: string): AthleteInsights | undefined => {
        return insights.find(i => i.athleteId === athleteId)
    }, [insights])

    const updateAthleteInsights = useCallback(async (athleteId: string, data: Partial<AthleteInsights>) => {
        setError(null)
        try {
            const existingInsights = insights.find(i => i.athleteId === athleteId)

            if (existingInsights) {
                setInsights(prev => prev.map(i =>
                    i.athleteId === athleteId
                        ? { ...i, ...data, lastUpdated: new Date().toISOString() }
                        : i
                ))
            } else {
                const newInsights: AthleteInsights = {
                    id: `insight_${Date.now()}`,
                    athleteId,
                    technicalStrengths: [],
                    improvementAreas: [],
                    technicalNotes: '',
                    lastUpdated: new Date().toISOString(),
                    updatedBy: '',
                    ...data
                }
                setInsights(prev => [...prev, newInsights])
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao atualizar insights')
        }
    }, [insights])

    return (
        <CoachContext.Provider value={{
            coaches, insights, isLoading, error,
            fetchCoaches, addCoach, updateCoach, deleteCoach,
            fetchInsights, getAthleteInsights, updateAthleteInsights
        }}>
            {children}
        </CoachContext.Provider>
    )
}

export function useCoach() {
    const context = React.useContext(CoachContext)
    if (!context) {
        throw new Error('useCoach deve ser usado dentro de CoachProvider')
    }
    return context
}
