import { supabase } from '../config/supabase'
import { Athlete } from '../types'

export const athleteService = {
    /**
     * Fetch all athletes
     */
    async getAll(): Promise<Athlete[]> {
        try {
            const { data, error } = await supabase
                .from('athletes')
                .select('*')
                .order('name', { ascending: true })

            if (error) throw error
            return data || []
        } catch (err) {
            console.error('Error fetching athletes:', err)
            throw err
        }
    },

    /**
     * Fetch athlete by ID
     */
    async getById(id: string): Promise<Athlete | null> {
        try {
            const { data, error } = await supabase
                .from('athletes')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            return data
        } catch (err) {
            console.error('Error fetching athlete:', err)
            return null
        }
    },

    /**
     * Create new athlete
     */
    async create(athlete: Omit<Athlete, 'id' | 'createdAt' | 'updatedAt'>): Promise<Athlete> {
        try {
            const newAthlete: Athlete = {
                id: `a${Date.now()}`,
                ...athlete,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }

            try {
                const { data, error } = await supabase
                    .from('athletes')
                    .insert([newAthlete])
                    .select()
                    .single()

                if (error) throw error
                return data
            } catch (supabaseErr) {
                console.warn('Supabase create failed, using local data:', supabaseErr)
                return newAthlete
            }
        } catch (err) {
            console.error('Error creating athlete:', err)
            throw err
        }
    },

    /**
     * Update athlete
     */
    async update(id: string, updates: Partial<Athlete>): Promise<Athlete> {
        try {
            const updatedAthlete: Athlete = {
                ...(updates as any),
                id,
                updatedAt: new Date().toISOString()
            }

            try {
                const { data, error } = await supabase
                    .from('athletes')
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
                return updatedAthlete
            }
        } catch (err) {
            console.error('Error updating athlete:', err)
            throw err
        }
    },

    /**
     * Delete athlete
     */
    async delete(id: string): Promise<void> {
        try {
            try {
                const { error } = await supabase
                    .from('athletes')
                    .delete()
                    .eq('id', id)

                if (error) throw error
            } catch (supabaseErr) {
                console.warn('Supabase delete failed, using local fallback:', supabaseErr)
            }
        } catch (err) {
            console.error('Error deleting athlete:', err)
            throw err
        }
    },

    /**
     * Get athletes by team
     */
    async getByTeam(teamId: string): Promise<Athlete[]> {
        try {
            const { data, error } = await supabase
                .from('athletes')
                .select('*')
                .eq('team_id', teamId)
                .order('name', { ascending: true })

            if (error) throw error
            return data || []
        } catch (err) {
            console.error('Error fetching team athletes:', err)
            return []
        }
    },

    /**
     * Get athletes by category
     */
    async getByCategory(category: string): Promise<Athlete[]> {
        try {
            const { data, error } = await supabase
                .from('athletes')
                .select('*')
                .eq('category', category)
                .order('name', { ascending: true })

            if (error) throw error
            return data || []
        } catch (err) {
            console.error('Error fetching category athletes:', err)
            return []
        }
    },

    /**
     * Search athletes
     */
    async search(query: string): Promise<Athlete[]> {
        try {
            const { data, error } = await supabase
                .from('athletes')
                .select('*')
                .or(`name.ilike.%${query}%,school.ilike.%${query}%`)
                .order('name', { ascending: true })

            if (error) throw error
            return data || []
        } catch (err) {
            console.error('Error searching athletes:', err)
            return []
        }
    }
}
