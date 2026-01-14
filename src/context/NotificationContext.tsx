import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '../config/supabase'

export interface Notification {
    id: string
    title: string
    message: string
    type: 'success' | 'warning' | 'error' | 'info'
    timestamp: Date
    read: boolean
}

interface NotificationContextType {
    notifications: Notification[]
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
    markAllAsRead: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([])


    // Listener Supabase Realtime (produção)
    useEffect(() => {
        const channel = supabase.channel('notifications')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications' }, payload => {
                const n = payload.new as any
                setNotifications(prev => [
                    {
                        ...n,
                        id: n.id,
                        title: n.title || 'Notificação',
                        message: n.message || '',
                        type: n.type || 'info',
                        timestamp: n.timestamp ? new Date(n.timestamp) : new Date(),
                        read: false
                    },
                    ...prev
                ])
            })
            .subscribe()
        return () => { channel.unsubscribe() }
    }, [])

    function addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
        setNotifications(prev => [
            {
                ...notification,
                id: Math.random().toString(36).slice(2),
                timestamp: new Date(),
                read: false
            },
            ...prev
        ])
    }

    function markAllAsRead() {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    }

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, markAllAsRead }}>
            {children}
        </NotificationContext.Provider>
    )
}

export function useNotifications() {
    const ctx = useContext(NotificationContext)
    if (!ctx) throw new Error('useNotifications deve ser usado dentro de NotificationProvider')
    return ctx
}
