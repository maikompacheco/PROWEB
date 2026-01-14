import { useQuery } from '@tanstack/react-query'
import { supabase } from '../config/supabase'
import { Athlete } from '../types'

export function useAthletes() {
    return useQuery({
        queryKey: ['athletes'],
        queryFn: async () => {
            const { data, error } = await supabase.from('athletes').select('*')
            if (error) throw error
            return data as Athlete[]
        }
    })
}
