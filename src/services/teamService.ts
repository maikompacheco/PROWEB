import { supabase } from '../config/supabase'
import { Team } from '../types'

export const teamService = {
    /**
     * Fetch all teams
     */
    async getAll(): Promise<Team[]> {
        try {
            const { data, error } = await supabase
                .from('teams')
                .select('*')
                .order('name', { ascending: true })

            if (error) throw error
            return data || []
        } catch (err) {
            console.error('Error fetching teams:', err)
            throw err
        }
    },

    /**
     * Fetch team by ID with players
     */
    async getById(id: string): Promise<(Team & { players?: any[] }) | null> {
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
                .eq('teamId', id)

            if (playersError) throw playersError

            return { ...teamData, players: playersData || [] }
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
            const { data, error } = await supabase
                .from('teams')
                .insert([{
                    ...team,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }])
                .select()
                .single()

            if (error) throw error
            return data
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
    }
}
