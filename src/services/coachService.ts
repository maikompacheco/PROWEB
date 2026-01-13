import { supabase } from '../config/supabase'
import { Coach, CoachLicense, LicenseStatus, CoachRole } from '../types'

export class CoachService {
    /**
     * Busca todos os treinadores de uma escola
     */
    static async getCoachesBySchool(schoolId: string): Promise<Coach[]> {
        try {
            const { data, error } = await supabase
                .from('coaches')
                .select(`
                    *,
                    licenses:coach_licenses(*)
                `)
                .eq('school_id', schoolId)
                .eq('status', 'active')

            if (error) throw error
            return data || []
        } catch (error) {
            console.error('Erro ao buscar treinadores:', error)
            return []
        }
    }

    /**
     * Busca um treinador específico
     */
    static async getCoachById(coachId: string): Promise<Coach | null> {
        try {
            const { data, error } = await supabase
                .from('coaches')
                .select(`
                    *,
                    licenses:coach_licenses(*)
                `)
                .eq('id', coachId)
                .single()

            if (error) throw error
            return data
        } catch (error) {
            console.error('Erro ao buscar treinador:', error)
            return null
        }
    }

    /**
     * Cria um novo treinador
     */
    static async createCoach(coach: Omit<Coach, 'id' | 'createdAt' | 'updatedAt'>): Promise<Coach | null> {
        try {
            const { data, error } = await supabase
                .from('coaches')
                .insert([{
                    ...coach,
                    status: 'active'
                }])
                .select()
                .single()

            if (error) throw error
            return data
        } catch (error) {
            console.error('Erro ao criar treinador:', error)
            return null
        }
    }

    /**
     * Atualiza dados do treinador
     */
    static async updateCoach(coachId: string, updates: Partial<Coach>): Promise<Coach | null> {
        try {
            const { data, error } = await supabase
                .from('coaches')
                .update(updates)
                .eq('id', coachId)
                .select()
                .single()

            if (error) throw error
            return data
        } catch (error) {
            console.error('Erro ao atualizar treinador:', error)
            return null
        }
    }

    /**
     * Desativa um treinador
     */
    static async deactivateCoach(coachId: string): Promise<boolean> {
        try {
            const { error } = await supabase
                .from('coaches')
                .update({ status: 'inactive' })
                .eq('id', coachId)

            if (error) throw error
            return true
        } catch (error) {
            console.error('Erro ao desativar treinador:', error)
            return false
        }
    }

    /**
     * Suspende um treinador
     */
    static async suspendCoach(coachId: string, reason?: string): Promise<boolean> {
        try {
            const { error } = await supabase
                .from('coaches')
                .update({
                    status: 'suspended',
                    // Opcionalmente, salve o motivo em um campo metadata
                })
                .eq('id', coachId)

            if (error) throw error
            return true
        } catch (error) {
            console.error('Erro ao suspender treinador:', error)
            return false
        }
    }

    // ======= LICENÇAS =======

    /**
     * Adiciona uma nova licença ao treinador
     */
    static async addLicense(coachId: string, license: Omit<CoachLicense, 'id'>): Promise<CoachLicense | null> {
        try {
            const { data, error } = await supabase
                .from('coach_licenses')
                .insert([{
                    ...license,
                    coach_id: coachId,
                    status: 'pending' as LicenseStatus
                }])
                .select()
                .single()

            if (error) throw error
            return data
        } catch (error) {
            console.error('Erro ao adicionar licença:', error)
            return null
        }
    }

    /**
     * Atualiza uma licença
     */
    static async updateLicense(licenseId: string, updates: Partial<CoachLicense>): Promise<CoachLicense | null> {
        try {
            const { data, error } = await supabase
                .from('coach_licenses')
                .update(updates)
                .eq('id', licenseId)
                .select()
                .single()

            if (error) throw error
            return data
        } catch (error) {
            console.error('Erro ao atualizar licença:', error)
            return null
        }
    }

    /**
     * Verifica e atualiza status de licenças expiradas
     */
    static async updateExpiredLicenses(coachId: string): Promise<void> {
        try {
            const today = new Date().toISOString().split('T')[0]

            const { error } = await supabase
                .from('coach_licenses')
                .update({ status: 'expired' as LicenseStatus })
                .eq('coach_id', coachId)
                .lt('expiry_date', today)
                .eq('status', 'valid')

            if (error) throw error
        } catch (error) {
            console.error('Erro ao atualizar licenças expiradas:', error)
        }
    }

    /**
     * Busca licenças válidas de um treinador
     */
    static async getValidLicenses(coachId: string): Promise<CoachLicense[]> {
        try {
            const today = new Date().toISOString().split('T')[0]

            const { data, error } = await supabase
                .from('coach_licenses')
                .select('*')
                .eq('coach_id', coachId)
                .eq('status', 'valid')
                .gte('expiry_date', today)

            if (error) throw error
            return data || []
        } catch (error) {
            console.error('Erro ao buscar licenças válidas:', error)
            return []
        }
    }

    /**
     * Revoga uma licença
     */
    static async revokeLicense(licenseId: string): Promise<boolean> {
        try {
            const { error } = await supabase
                .from('coach_licenses')
                .update({ status: 'revoked' as LicenseStatus })
                .eq('id', licenseId)

            if (error) throw error
            return true
        } catch (error) {
            console.error('Erro ao revogar licença:', error)
            return false
        }
    }

    // ======= PERMISSÕES =======

    /**
     * Atualiza permissões de um treinador
     */
    static async updatePermissions(coachId: string, permissions: any): Promise<boolean> {
        try {
            const { error } = await supabase
                .from('coaches')
                .update({ permissions })
                .eq('id', coachId)

            if (error) throw error
            return true
        } catch (error) {
            console.error('Erro ao atualizar permissões:', error)
            return false
        }
    }

    /**
     * Busca treinadores com um role específico
     */
    static async getCoachesByRole(schoolId: string, role: CoachRole): Promise<Coach[]> {
        try {
            const { data, error } = await supabase
                .from('coaches')
                .select('*')
                .eq('school_id', schoolId)
                .eq('role', role)
                .eq('status', 'active')

            if (error) throw error
            return data || []
        } catch (error) {
            console.error('Erro ao buscar treinadores por role:', error)
            return []
        }
    }

    /**
     * Busca estatísticas de um treinador
     */
    static async getCoachStats(coachId: string): Promise<{
        teamsCount: number
        athletesCount: number
        evaluationsCount: number
        attendanceRate: number
    } | null> {
        try {
            // Implementar conforme necessário com suas tabelas
            return {
                teamsCount: 0,
                athletesCount: 0,
                evaluationsCount: 0,
                attendanceRate: 0
            }
        } catch (error) {
            console.error('Erro ao buscar estatísticas:', error)
            return null
        }
    }
}
