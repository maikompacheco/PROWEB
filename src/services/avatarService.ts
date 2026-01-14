import { supabase } from '../config/supabase'

export async function uploadAvatar(userId: string, file: File): Promise<string> {
    // Modo demo: se Supabase não está configurado, retorna uma imagem padrão
    const isDemoMode = !(import.meta.env.VITE_SUPABASE_URL as string) || (import.meta.env.VITE_SUPABASE_URL as string).includes('your-project')
    if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        // Retorna um avatar gerado por serviço externo (ex: avatar.dicebear)
        return `https://api.dicebear.com/7.x/initials/svg?seed=${userId}`
    }
    const fileExt = file.name.split('.').pop()
    const filePath = `avatars/${userId}.${fileExt}`
    const { error } = await supabase.storage.from('avatars').upload(filePath, file, {
        upsert: true,
        cacheControl: '3600',
        contentType: file.type,
    })
    if (error) throw error
    // Retorna a URL pública
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
    return data.publicUrl
}
