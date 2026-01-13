import { supabase } from '../config/supabase'
import { AttendanceRecord } from '../types'

export const attendanceService = {
    /**
     * Get attendance records for an athlete
     */
    async getByAthlete(athleteId: string): Promise<AttendanceRecord[]> {
        try {
            const { data, error } = await supabase
                .from('attendance')
                .select('*')
                .eq('athleteId', athleteId)
                .order('date', { ascending: false })

            if (error) throw error
            return data || []
        } catch (err) {
            console.error('Error fetching attendance:', err)
            return []
        }
    },

    /**
     * Get attendance records for a training session
     */
    async getByTraining(trainingId: string): Promise<AttendanceRecord[]> {
        try {
            const { data, error } = await supabase
                .from('attendance')
                .select('*')
                .eq('trainingId', trainingId)
                .order('date', { ascending: false })

            if (error) throw error
            return data || []
        } catch (err) {
            console.error('Error fetching training attendance:', err)
            return []
        }
    },

    /**
     * Mark attendance
     */
    async markAttendance(record: Omit<AttendanceRecord, 'id'>): Promise<AttendanceRecord> {
        try {
            const { data, error } = await supabase
                .from('attendance')
                .insert([record])
                .select()
                .single()

            if (error) throw error
            return data
        } catch (err) {
            console.error('Error marking attendance:', err)
            throw err
        }
    },

    /**
     * Calculate attendance rate for athlete
     */
    async getAttendanceRate(athleteId: string): Promise<number> {
        try {
            const { data, error } = await supabase
                .from('attendance')
                .select('status')
                .eq('athleteId', athleteId)

            if (error) throw error
            if (!data || data.length === 0) return 0

            const presentCount = data.filter(r => r.status === 'present').length
            const rate = (presentCount / data.length) * 100
            return Math.round(rate)
        } catch (err) {
            console.error('Error calculating attendance rate:', err)
            return 0
        }
    }
}
