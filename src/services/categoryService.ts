import { supabase } from '../config/supabase'

export interface Category {
    id: string
    name: string
    minAge: number
    maxAge: number
    description?: string
    color?: string
    icon?: string
    createdAt?: string
    updatedAt?: string
}

export const categoryService = {
    /**
     * Get all categories
     */
    async getAll(): Promise<Category[]> {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('minAge', { ascending: true })

            if (error) throw error
            return data || []
        } catch (err) {
            console.error('Error fetching categories:', err)
            throw err
        }
    },

    /**
     * Get category by ID
     */
    async getById(id: string): Promise<Category | null> {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            return data
        } catch (err) {
            console.error('Error fetching category:', err)
            return null
        }
    },

    /**
     * Create new category
     */
    async create(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
        try {
            const { data, error } = await supabase
                .from('categories')
                .insert([{
                    ...category,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }])
                .select()
                .single()

            if (error) throw error
            return data
        } catch (err) {
            console.error('Error creating category:', err)
            throw err
        }
    },

    /**
     * Update category
     */
    async update(id: string, updates: Partial<Category>): Promise<Category> {
        try {
            const { data, error } = await supabase
                .from('categories')
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
            console.error('Error updating category:', err)
            throw err
        }
    },

    /**
     * Delete category
     */
    async delete(id: string): Promise<void> {
        try {
            const { error } = await supabase
                .from('categories')
                .delete()
                .eq('id', id)

            if (error) throw error
        } catch (err) {
            console.error('Error deleting category:', err)
            throw err
        }
    },

    /**
     * Get category by age
     */
    async getByAge(age: number): Promise<Category | null> {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .lte('minAge', age)
                .gte('maxAge', age)
                .single()

            if (error) throw error
            return data
        } catch (err) {
            console.error('Error fetching category by age:', err)
            return null
        }
    }
}
