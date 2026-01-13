import React, { createContext, useState, useCallback, ReactNode } from 'react'
import { Athlete, Team } from '../types'
import { athleteService } from '../services/athleteService'
import { teamService } from '../services/teamService'

interface AppContextType {
    athletes: Athlete[]
    teams: Team[]
    isLoading: boolean
    error: string | null

    // Athletes
    fetchAthletes: () => Promise<void>
    addAthlete: (athlete: Omit<Athlete, 'id'>) => Promise<void>
    updateAthlete: (id: string, athlete: Partial<Athlete>) => Promise<void>
    deleteAthlete: (id: string) => Promise<void>
    addAthleteToTeam: (athleteId: string, teamId: string) => Promise<void>
    removeAthleteFromTeam: (athleteId: string, teamId: string) => Promise<void>

    // Teams
    fetchTeams: () => Promise<void>
    addTeam: (team: Omit<Team, 'id'>) => Promise<void>
    updateTeam: (id: string, team: Partial<Team>) => Promise<void>
    deleteTeam: (id: string) => Promise<void>
    getTeamAthletes: (teamId: string) => Athlete[]
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Sample data for testing
const SAMPLE_ATHLETES: Athlete[] = [
    { id: '1', name: 'João Silva', age: 17, school: 'Escola A', position: 'Atacante', teamId: 't1', tracking: { lastSeen: '2026-01-12T10:00:00Z', gps: { lat: -23.5, lng: -46.6 }, heartRate: 72 } },
    { id: '2', name: 'Carlos Pereira', age: 16, school: 'Escola B', position: 'Goleiro', teamId: 't2', tracking: { lastSeen: '2026-01-11T12:00:00Z', gps: null, heartRate: null } },
    { id: '3', name: 'Lucas Martins', age: 18, school: 'Escola A', position: 'Defesa', teamId: 't1', tracking: { lastSeen: '2026-01-12T09:30:00Z', gps: { lat: -23.5, lng: -46.6 }, heartRate: 68 } },
]

const SAMPLE_TEAMS: Team[] = [
    { id: 't1', name: 'Time Escolar A', school: 'Escola A', players: [] },
    { id: 't2', name: 'Time Escolar B', school: 'Escola B', players: [] },
    { id: 't3', name: 'Time Escolar C', school: 'Escola C', players: [] }
]

export function AppProvider({ children }: { children: ReactNode }) {
    const [athletes, setAthletes] = useState<Athlete[]>(SAMPLE_ATHLETES)
    const [teams, setTeams] = useState<Team[]>(SAMPLE_TEAMS)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchAthletes = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await athleteService.getAll()
            setAthletes(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar atletas')
        } finally {
            setIsLoading(false)
        }
    }, [])

    const addAthlete = useCallback(async (athlete: Omit<Athlete, 'id'>) => {
        setError(null)
        try {
            const newAthlete = await athleteService.create(athlete)
            setAthletes(prev => [...prev, newAthlete])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao adicionar atleta')
        }
    }, [])

    const updateAthlete = useCallback(async (id: string, data: Partial<Athlete>) => {
        setError(null)
        try {
            const updated = await athleteService.update(id, data)
            setAthletes(prev => prev.map(a => a.id === id ? updated : a))

            // Atualiza equipes se o teamId mudou
            if (data.teamId !== undefined) {
                const oldTeamId = athletes.find(a => a.id === id)?.teamId
                if (oldTeamId && oldTeamId !== data.teamId) {
                    // Remove do time antigo
                    setTeams(prev => prev.map(t => {
                        if (t.id === oldTeamId) {
                            return { ...t, players: t.players.filter(p => p.id !== id) }
                        }
                        return t
                    }))
                }
                // Adiciona ao time novo
                setTeams(prev => prev.map(t => {
                    if (t.id === data.teamId && !t.players.some(p => p.id === id)) {
                        return { ...t, players: [...t.players, updated] }
                    }
                    return t
                }))
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao atualizar atleta')
        }
    }, [athletes])

    const deleteAthlete = useCallback(async (id: string) => {
        setError(null)
        try {
            // Tenta deletar do serviço (Supabase)
            try {
                await athleteService.delete(id)
            } catch (serviceErr) {
                // Se falhar, apenas avança com o estado local (fallback)
                console.warn('Service delete failed, using local state:', serviceErr)
            }

            const teamId = athletes.find(a => a.id === id)?.teamId

            setAthletes(prev => prev.filter(a => a.id !== id))

            // Remove do time associado
            if (teamId) {
                setTeams(prev => prev.map(t => {
                    if (t.id === teamId) {
                        return { ...t, players: t.players.filter(p => p.id !== id) }
                    }
                    return t
                }))
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao deletar atleta')
            throw err
        }
    }, [athletes])

    const fetchTeams = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await teamService.getAll()
            setTeams(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar equipes')
        } finally {
            setIsLoading(false)
        }
    }, [])

    const addTeam = useCallback(async (team: Omit<Team, 'id'>) => {
        setError(null)
        try {
            const newTeam = await teamService.create(team)
            setTeams(prev => [...prev, newTeam])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao adicionar equipe')
        }
    }, [])

    const updateTeam = useCallback(async (id: string, data: Partial<Team>) => {
        setError(null)
        try {
            const updated = await teamService.update(id, data)
            setTeams(prev => prev.map(t => t.id === id ? updated : t))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao atualizar equipe')
        }
    }, [])

    const deleteTeam = useCallback(async (id: string) => {
        setError(null)
        try {
            // Tenta deletar do serviço (Supabase)
            try {
                await teamService.delete(id)
            } catch (serviceErr) {
                // Se falhar, apenas avança com o estado local (fallback)
                console.warn('Service delete failed, using local state:', serviceErr)
            }

            setTeams(prev => prev.filter(t => t.id !== id))
            // Remove teamId de todos os atletas da equipe
            setAthletes(prev => prev.map(a => a.teamId === id ? { ...a, teamId: undefined } : a))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao deletar equipe')
            throw err
        }
    }, [])

    const addAthleteToTeam = useCallback(async (athleteId: string, teamId: string) => {
        setError(null)
        try {
            // Atualiza o atleta com o teamId
            const athlete = athletes.find(a => a.id === athleteId)
            if (athlete) {
                const updated = await athleteService.update(athleteId, { ...athlete, teamId })
                setAthletes(prev => prev.map(a => a.id === athleteId ? updated : a))

                // Adiciona o atleta ao time
                setTeams(prev => prev.map(t => {
                    if (t.id === teamId && !t.players.some(p => p.id === athleteId)) {
                        return { ...t, players: [...t.players, updated] }
                    }
                    return t
                }))
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao adicionar atleta ao time')
        }
    }, [athletes])

    const removeAthleteFromTeam = useCallback(async (athleteId: string, teamId: string) => {
        setError(null)
        try {
            const athlete = athletes.find(a => a.id === athleteId)
            if (athlete) {
                const updated = await athleteService.update(athleteId, { ...athlete, teamId: undefined })
                setAthletes(prev => prev.map(a => a.id === athleteId ? updated : a))

                // Remove do time
                setTeams(prev => prev.map(t => {
                    if (t.id === teamId) {
                        return { ...t, players: t.players.filter(p => p.id !== athleteId) }
                    }
                    return t
                }))
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao remover atleta do time')
        }
    }, [athletes])

    const getTeamAthletes = useCallback((teamId: string): Athlete[] => {
        return athletes.filter(a => a.teamId === teamId)
    }, [athletes])

    return (
        <AppContext.Provider value={{
            athletes, teams, isLoading, error,
            fetchAthletes, addAthlete, updateAthlete, deleteAthlete, addAthleteToTeam, removeAthleteFromTeam,
            fetchTeams, addTeam, updateTeam, deleteTeam, getTeamAthletes
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useApp() {
    const context = React.useContext(AppContext)
    if (!context) {
        throw new Error('useApp deve ser usado dentro de AppProvider')
    }
    return context
}
