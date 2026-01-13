import { Athlete, Team, Coach, AthleteInsights } from '../types'

// ====== STORAGE ABSTRACTION ======
// Permite trocar entre localStorage, IndexedDB, Firebase, Supabase, etc.

interface IStorageProvider {
    athletes: {
        getAll(): Promise<Athlete[]>
        getById(id: string): Promise<Athlete | null>
        create(data: Omit<Athlete, 'id'>): Promise<Athlete>
        update(id: string, data: Partial<Athlete>): Promise<Athlete>
        delete(id: string): Promise<void>
    }
    teams: {
        getAll(): Promise<Team[]>
        getById(id: string): Promise<Team | null>
        create(data: Omit<Team, 'id'>): Promise<Team>
        update(id: string, data: Partial<Team>): Promise<Team>
        delete(id: string): Promise<void>
    }
    coaches: {
        getAll(): Promise<Coach[]>
        getById(id: string): Promise<Coach | null>
        create(data: Omit<Coach, 'id'>): Promise<Coach>
        update(id: string, data: Partial<Coach>): Promise<Coach>
        delete(id: string): Promise<void>
    }
    insights: {
        getAll(): Promise<AthleteInsights[]>
        getByAthleteId(athleteId: string): Promise<AthleteInsights | null>
        create(data: Omit<AthleteInsights, 'id'>): Promise<AthleteInsights>
        update(id: string, data: Partial<AthleteInsights>): Promise<AthleteInsights>
        delete(id: string): Promise<void>
    }
}

// ====== LOCAL STORAGE PROVIDER (DEFAULT) ======
const LocalStorageProvider: IStorageProvider = {
    athletes: {
        async getAll(): Promise<Athlete[]> {
            try {
                const data = localStorage.getItem('baseone_athletes')
                return data ? JSON.parse(data) : []
            } catch {
                return []
            }
        },

        async getById(id: string): Promise<Athlete | null> {
            const all = await this.getAll()
            return all.find(a => a.id === id) || null
        },

        async create(data: Omit<Athlete, 'id'>): Promise<Athlete> {
            const newAthlete: Athlete = {
                ...data,
                id: `athlete_${Date.now()}`,
                createdAt: new Date().toISOString()
            }
            const all = await this.getAll()
            const updated = [...all, newAthlete]
            localStorage.setItem('baseone_athletes', JSON.stringify(updated))
            return newAthlete
        },

        async update(id: string, data: Partial<Athlete>): Promise<Athlete> {
            const all = await this.getAll()
            const index = all.findIndex(a => a.id === id)
            if (index === -1) throw new Error('Atleta não encontrado')

            const updated = { ...all[index], ...data, updatedAt: new Date().toISOString() }
            all[index] = updated
            localStorage.setItem('baseone_athletes', JSON.stringify(all))
            return updated
        },

        async delete(id: string): Promise<void> {
            const all = await this.getAll()
            const filtered = all.filter(a => a.id !== id)
            localStorage.setItem('baseone_athletes', JSON.stringify(filtered))
        }
    },

    teams: {
        async getAll(): Promise<Team[]> {
            try {
                const data = localStorage.getItem('baseone_teams')
                return data ? JSON.parse(data) : []
            } catch {
                return []
            }
        },

        async getById(id: string): Promise<Team | null> {
            const all = await this.getAll()
            return all.find(t => t.id === id) || null
        },

        async create(data: Omit<Team, 'id'>): Promise<Team> {
            const newTeam: Team = {
                ...data,
                id: `team_${Date.now()}`,
                players: [],
                createdAt: new Date().toISOString()
            }
            const all = await this.getAll()
            const updated = [...all, newTeam]
            localStorage.setItem('baseone_teams', JSON.stringify(updated))
            return newTeam
        },

        async update(id: string, data: Partial<Team>): Promise<Team> {
            const all = await this.getAll()
            const index = all.findIndex(t => t.id === id)
            if (index === -1) throw new Error('Equipe não encontrada')

            const updated = { ...all[index], ...data, updatedAt: new Date().toISOString() }
            all[index] = updated
            localStorage.setItem('baseone_teams', JSON.stringify(all))
            return updated
        },

        async delete(id: string): Promise<void> {
            const all = await this.getAll()
            const filtered = all.filter(t => t.id !== id)
            localStorage.setItem('baseone_teams', JSON.stringify(filtered))
        }
    },

    coaches: {
        async getAll(): Promise<Coach[]> {
            try {
                const data = localStorage.getItem('baseone_coaches')
                return data ? JSON.parse(data) : []
            } catch {
                return []
            }
        },

        async getById(id: string): Promise<Coach | null> {
            const all = await this.getAll()
            return all.find(c => c.id === id) || null
        },

        async create(data: Omit<Coach, 'id'>): Promise<Coach> {
            const newCoach: Coach = {
                ...data,
                id: `coach_${Date.now()}`,
                createdAt: new Date().toISOString()
            }
            const all = await this.getAll()
            const updated = [...all, newCoach]
            localStorage.setItem('baseone_coaches', JSON.stringify(updated))
            return newCoach
        },

        async update(id: string, data: Partial<Coach>): Promise<Coach> {
            const all = await this.getAll()
            const index = all.findIndex(c => c.id === id)
            if (index === -1) throw new Error('Treinador não encontrado')

            const updated = { ...all[index], ...data, updatedAt: new Date().toISOString() }
            all[index] = updated
            localStorage.setItem('baseone_coaches', JSON.stringify(updated))
            return updated
        },

        async delete(id: string): Promise<void> {
            const all = await this.getAll()
            const filtered = all.filter(c => c.id !== id)
            localStorage.setItem('baseone_coaches', JSON.stringify(filtered))
        }
    },

    insights: {
        async getAll(): Promise<AthleteInsights[]> {
            try {
                const data = localStorage.getItem('baseone_insights')
                return data ? JSON.parse(data) : []
            } catch {
                return []
            }
        },

        async getByAthleteId(athleteId: string): Promise<AthleteInsights | null> {
            const all = await this.getAll()
            return all.find(i => i.athleteId === athleteId) || null
        },

        async create(data: Omit<AthleteInsights, 'id'>): Promise<AthleteInsights> {
            const newInsight: AthleteInsights = {
                ...data,
                id: `insight_${Date.now()}`
            }
            const all = await this.getAll()
            const updated = [...all, newInsight]
            localStorage.setItem('baseone_insights', JSON.stringify(updated))
            return newInsight
        },

        async update(id: string, data: Partial<AthleteInsights>): Promise<AthleteInsights> {
            const all = await this.getAll()
            const index = all.findIndex(i => i.id === id)
            if (index === -1) throw new Error('Insight não encontrado')

            const updated = { ...all[index], ...data, lastUpdated: new Date().toISOString() }
            all[index] = updated
            localStorage.setItem('baseone_insights', JSON.stringify(all))
            return updated
        },

        async delete(id: string): Promise<void> {
            const all = await this.getAll()
            const filtered = all.filter(i => i.id !== id)
            localStorage.setItem('baseone_insights', JSON.stringify(filtered))
        }
    }
}

// ====== STORAGE SELECTOR ======
// Defina qual provider usar (localStorage, Firebase, Supabase, etc)
const storage: IStorageProvider = LocalStorageProvider

// ====== PUBLIC API ======
export const athleteService = storage.athletes
export const teamService = storage.teams
export const coachService = storage.coaches
export const insightService = storage.insights

// ====== HELPER: SEED INITIAL DATA ======
export async function initializeDatabase() {
    // Verifica se já existem dados
    const existingAthletes = await athleteService.getAll()
    if (existingAthletes.length > 0) return

    // Seed de dados iniciais (apenas na primeira execução)
    const initialAthletes: Omit<Athlete, 'id'>[] = [
        {
            name: 'João Silva',
            age: 17,
            school: 'Escola A',
            position: 'Atacante',
            teamId: undefined,
            tracking: { lastSeen: new Date().toISOString(), gps: { lat: -23.5, lng: -46.6 }, heartRate: 72 }
        },
        {
            name: 'Carlos Pereira',
            age: 16,
            school: 'Escola B',
            position: 'Goleiro',
            teamId: undefined,
            tracking: { lastSeen: new Date().toISOString(), gps: null, heartRate: null }
        },
        {
            name: 'Lucas Martins',
            age: 18,
            school: 'Escola A',
            position: 'Defesa',
            teamId: undefined,
            tracking: { lastSeen: new Date().toISOString(), gps: { lat: -23.5, lng: -46.6 }, heartRate: 68 }
        }
    ]

    const initialTeams: Omit<Team, 'id'>[] = [
        { name: 'Time Escolar A', school: 'Escola A', players: [] },
        { name: 'Time Escolar B', school: 'Escola B', players: [] },
        { name: 'Time Escolar C', school: 'Escola C', players: [] }
    ]

    for (const athlete of initialAthletes) {
        await athleteService.create(athlete)
    }

    for (const team of initialTeams) {
        await teamService.create(team)
    }
}
