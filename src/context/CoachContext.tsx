import React, { createContext, useState, useCallback, ReactNode } from 'react'
import { Coach, AthleteInsights, CoachLicense, CoachPermissions, LicenseStatus } from '../types'

interface CoachContextType {
    coaches: Coach[]
    insights: AthleteInsights[]
    isLoading: boolean
    error: string | null
    selectedCoach: Coach | null

    // Coaches
    fetchCoaches: () => Promise<void>
    addCoach: (coach: Omit<Coach, 'id'>) => Promise<void>
    updateCoach: (id: string, coach: Partial<Coach>) => Promise<void>
    deleteCoach: (id: string) => Promise<void>
    selectCoach: (coach: Coach | null) => void
    deactivateCoach: (id: string) => Promise<void>
    suspendCoach: (id: string) => Promise<void>

    // Licenses
    addLicense: (coachId: string, license: Omit<CoachLicense, 'id'>) => Promise<void>
    updateLicense: (licenseId: string, license: Partial<CoachLicense>) => Promise<void>
    revokeLicense: (licenseId: string) => Promise<void>
    getValidLicenses: (coachId: string) => CoachLicense[]

    // Permissions
    updatePermissions: (coachId: string, permissions: CoachPermissions) => Promise<void>

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
    const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null)

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

    const selectCoach = useCallback((coach: Coach | null) => {
        setSelectedCoach(coach)
    }, [])

    const deactivateCoach = useCallback(async (id: string) => {
        setError(null)
        try {
            setCoaches(prev => prev.map(c => c.id === id ? { ...c, status: 'inactive' } : c))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao desativar treinador')
        }
    }, [])

    const suspendCoach = useCallback(async (id: string) => {
        setError(null)
        try {
            setCoaches(prev => prev.map(c => c.id === id ? { ...c, status: 'suspended' } : c))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao suspender treinador')
        }
    }, [])

    // ======= LICENSES =======

    const addLicense = useCallback(async (coachId: string, license: Omit<CoachLicense, 'id'>) => {
        setError(null)
        try {
            const newLicense: CoachLicense = {
                ...license,
                id: `license_${Date.now()}`,
            }
            setCoaches(prev => prev.map(c =>
                c.id === coachId
                    ? { ...c, licenses: [...(c.licenses || []), newLicense] }
                    : c
            ))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao adicionar licença')
        }
    }, [])

    const updateLicense = useCallback(async (licenseId: string, license: Partial<CoachLicense>) => {
        setError(null)
        try {
            setCoaches(prev => prev.map(c => ({
                ...c,
                licenses: c.licenses?.map(l => l.id === licenseId ? { ...l, ...license } : l)
            })))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao atualizar licença')
        }
    }, [])

    const revokeLicense = useCallback(async (licenseId: string) => {
        setError(null)
        try {
            setCoaches(prev => prev.map(c => {
                if (!c.licenses) return c
                return {
                    ...c,
                    licenses: c.licenses.map(l =>
                        l.id === licenseId
                            ? { ...l, status: 'revogada' as LicenseStatus }
                            : l
                    ) as CoachLicense[]
                } as Coach
            }))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao revogar licença')
        }
    }, [])

    const getValidLicenses = useCallback((coachId: string): CoachLicense[] => {
        const today = new Date().toISOString().split('T')[0]
        const coach = coaches.find(c => c.id === coachId)
        return coach?.licenses?.filter(l => l.status === 'valida' && l.expiryDate >= today) || []
    }, [coaches])

    // ======= PERMISSIONS =======

    const updatePermissions = useCallback(async (coachId: string, permissions: CoachPermissions) => {
        setError(null)
        try {
            setCoaches(prev => prev.map(c =>
                c.id === coachId ? { ...c, permissions } : c
            ))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao atualizar permissões')
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
                    seasonYear: new Date().getFullYear(),
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
            coaches, insights, isLoading, error, selectedCoach,
            fetchCoaches, addCoach, updateCoach, deleteCoach, selectCoach, deactivateCoach, suspendCoach,
            addLicense, updateLicense, revokeLicense, getValidLicenses,
            updatePermissions,
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
