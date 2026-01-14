import { useQuery } from '@tanstack/react-query'
import { supabase } from '../config/supabase'
import { AthleteCategory } from '../types'

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            // Busca categorias do Supabase (mock se não houver tabela)
            const { data, error } = await supabase.from('categories').select('*')
            if (error) throw error
            // Se não houver tabela, retorna enum local
            if (!data) {
                return Object.values(AthleteCategory).map(label => ({ id: label, label }))
            }
            return data
        }
    })
}
