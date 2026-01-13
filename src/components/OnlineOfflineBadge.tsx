import React from 'react'

interface OnlineOfflineBadgeProps {
    lastSeen?: string
    showText?: boolean
}

export default function OnlineOfflineBadge({
    lastSeen,
    showText = true
}: OnlineOfflineBadgeProps) {
    const getStatus = (lastSeen: string | undefined) => {
        if (!lastSeen) {
            return { isOnline: false, label: 'Offline' }
        }

        const hours = (new Date().getTime() - new Date(lastSeen).getTime()) / (1000 * 60 * 60)
        const isOnline = hours < 1

        return {
            isOnline,
            label: isOnline ? 'Online' : 'Offline'
        }
    }

    const status = getStatus(lastSeen)

    return (
        <div className={`flex items-center gap-2 px-2 py-1 rounded-full text-sm font-medium border ${status.isOnline ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
            <span className={`inline-block w-2 h-2 rounded-full ${status.isOnline ? 'bg-green-400' : 'bg-red-400'}`} />
            {showText && <span>{status.label}</span>}
        </div>
    )
}
