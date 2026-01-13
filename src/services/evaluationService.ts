import { supabase } from '../config/supabase'
import { AthleteEvaluation } from '../types'

export const evaluationService = {
    /**
     * Get all evaluations for an athlete
     */
    async getByAthlete(athleteId: string): Promise<AthleteEvaluation[]> {
        try {
            const { data, error } = await supabase
                .from('evaluations')
                .select('*')
                .eq('athleteId', athleteId)
                .order('date', { ascending: false })

            if (error) throw error
            return data || []
        } catch (err) {
            console.error('Error fetching evaluations:', err)
            return []
        }
    },

    /**
     * Create new evaluation
     */
    async create(evaluation: Omit<AthleteEvaluation, 'id'>): Promise<AthleteEvaluation> {
        try {
            const { data, error } = await supabase
                .from('evaluations')
                .insert([evaluation])
                .select()
                .single()

            if (error) throw error
            return data
        } catch (err) {
            console.error('Error creating evaluation:', err)
            throw err
        }
    },

    /**
     * Update evaluation
     */
    async update(id: string, updates: Partial<AthleteEvaluation>): Promise<AthleteEvaluation> {
        try {
            const { data, error } = await supabase
                .from('evaluations')
                .update(updates)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            return data
        } catch (err) {
            console.error('Error updating evaluation:', err)
            throw err
        }
    },

    /**
     * Delete evaluation
     */
    async delete(id: string): Promise<void> {
        try {
            const { error } = await supabase
                .from('evaluations')
                .delete()
                .eq('id', id)

            if (error) throw error
        } catch (err) {
            console.error('Error deleting evaluation:', err)
            throw err
        }
    },

    /**
     * Get average score for athlete
     */
    async getAverageScore(athleteId: string): Promise<number> {
        try {
            const { data, error } = await supabase
                .from('evaluations')
                .select('overallScore')
                .eq('athleteId', athleteId)

            if (error) throw error

            if (!data || data.length === 0) return 0

            const average = data.reduce((sum, ev) => sum + (ev.overallScore || 0), 0) / data.length
            return Math.round(average * 10) / 10
        } catch (err) {
            console.error('Error calculating average score:', err)
            return 0
        }
    }
}
