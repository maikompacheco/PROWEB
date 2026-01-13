import { supabase } from '../config/supabase'
import { Team, Coach } from '../types'

export const teamService = {
    /**
     * Fetch all teams
     */
    async getAll(): Promise<Team[]> {
        try {
            const { data, error } = await supabase
                .from('teams')
                .select(`
                    *,
                    coaches:team_coaches(coach_id)
                `)
                .order('name', { ascending: true })

            if (error) throw error
            return data || []
        } catch (err) {
            console.error('Error fetching teams:', err)
            throw err
        }
    },

    /**
     * Fetch team by ID with players and coaches
     */
    async getById(id: string): Promise<(Team & { players?: any[]; coachesDetails?: Coach[] }) | null> {
        try {
            const { data: teamData, error: teamError } = await supabase
                .from('teams')
                .select('*')
                .eq('id', id)
                .single()

            if (teamError) throw teamError

            // Fetch players for this team
            const { data: playersData, error: playersError } = await supabase
                .from('athletes')
                .select('*')
                .eq('team_id', id)

            if (playersError) throw playersError

            // Fetch coaches assigned to this team
            const { data: coachesData, error: coachesError } = await supabase
                .from('coaches')
                .select('*')
                .in('id', teamData.coaches || [])

            if (coachesError) throw coachesError

            return {
                ...teamData,
                players: playersData || [],
                coachesDetails: coachesData || []
            }
        } catch (err) {
            console.error('Error fetching team:', err)
            return null
        }
    },

    /**
     * Create new team
     */
    async create(team: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>): Promise<Team> {
        try {
            const newTeam: Team = {
                id: `t${Date.now()}`,
                ...team,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }

            try {
                const { data, error } = await supabase
                    .from('teams')
                    .insert([newTeam])
                    .select()
                    .single()

                if (error) throw error
                return data
            } catch (supabaseErr) {
                console.warn('Supabase create failed, using local data:', supabaseErr)
                return newTeam
            }
        } catch (err) {
            console.error('Error creating team:', err)
            throw err
        }
    },

    /**
     * Update team
     */
    async update(id: string, updates: Partial<Team>): Promise<Team> {
        try {
            const updatedTeam: Team = {
                ...(updates as any),
                id,
                updatedAt: new Date().toISOString()
            }

            try {
                const { data, error } = await supabase
                    .from('teams')
                    .update({
                        ...updates,
                        updatedAt: new Date().toISOString()
                    })
                    .eq('id', id)
                    .select()
                    .single()

                if (error) throw error
                return data
            } catch (supabaseErr) {
                console.warn('Supabase update failed, using local data:', supabaseErr)
                return updatedTeam
            }
        } catch (err) {
            console.error('Error updating team:', err)
            throw err
        }
    },

    /**
     * Delete team
     */
    async delete(id: string): Promise<void> {
        try {
            const { error } = await supabase
                .from('teams')
                .delete()
                .eq('id', id)

            if (error) throw error
        } catch (err) {
            console.error('Error deleting team:', err)
            throw err
        }
    },

    /**
     * Get teams by category
     */
    async getByCategory(category: string): Promise<Team[]> {
        try {
            const { data, error } = await supabase
                .from('teams')
                .select('*')
                .eq('category', category)
                .order('name', { ascending: true })

            if (error) throw error
            return data || []
        } catch (err) {
            console.error('Error fetching category teams:', err)
            return []
        }
    },

    /**
     * Assign coach to team
     */
    async assignCoach(teamId: string, coachId: string, isCoordinator: boolean = false): Promise<boolean> {
        try {
            const { error } = await supabase
                .from('team_coaches')
                .insert([{
                    team_id: teamId,
                    coach_id: coachId,
                    is_coordinator: isCoordinator
                }])

            if (error) throw error
            return true
        } catch (err) {
            console.error('Error assigning coach:', err)
            return false
        }
    },

    /**
     * Remove coach from team
     */
    async removeCoach(teamId: string, coachId: string): Promise<boolean> {
        try {
            const { error } = await supabase
                .from('team_coaches')
                .delete()
                .eq('team_id', teamId)
                .eq('coach_id', coachId)

            if (error) throw error
            return true
        } catch (err) {
            console.error('Error removing coach:', err)
            return false
        }
    },

    /**
     * Get teams coached by a specific coach
     */
    async getTeamsByCoach(coachId: string): Promise<Team[]> {
        try {
            const { data, error } = await supabase
                .from('team_coaches')
                .select('team_id')
                .eq('coach_id', coachId)

            if (error) throw error

            const teamIds = data?.map(d => d.team_id) || []

            if (teamIds.length === 0) return []

            const { data: teamsData, error: teamsError } = await supabase
                .from('teams')
                .select('*')
                .in('id', teamIds)

            if (teamsError) throw teamsError
            return teamsData || []
        } catch (err) {
            console.error('Error fetching teams by coach:', err)
            return []
        }
    },

    /**
     * Get coaches for a specific team
     */
    async getCoachesByTeam(teamId: string): Promise<Coach[]> {
        try {
            const { data: coachData, error } = await supabase
                .from('team_coaches')
                .select('coach_id')
                .eq('team_id', teamId)

            if (error) throw error

            const coachIds = coachData?.map(d => d.coach_id) || []

            if (coachIds.length === 0) return []

            const { data: coachesData, error: coachesError } = await supabase
                .from('coaches')
                .select('*')
                .in('id', coachIds)

            if (coachesError) throw coachesError
            return coachesData || []
        } catch (err) {
            console.error('Error fetching coaches by team:', err)
            return []
        }
    }
}
