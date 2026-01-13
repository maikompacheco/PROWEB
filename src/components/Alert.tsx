import React from 'react'

interface AlertProps {
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
    onClose: () => void
}

export default function Alert({ type, message, onClose }: AlertProps) {
    const colors = {
        success: 'bg-green-500/10 border-green-500/30 text-green-400',
        error: 'bg-red-500/10 border-red-500/30 text-red-400',
        warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
        info: 'bg-blue-500/10 border-blue-500/30 text-blue-400'
    }

    const icons = {
        success: '✓',
        error: '✕',
        warning: '!',
        info: 'ℹ'
    }

    return (
        <div className={`fixed top-4 right-4 max-w-md p-4 rounded-lg border-2 ${colors[type]} shadow-lg animate-in fade-in slide-in-from-top-5`}>
            <div className="flex items-start gap-3">
                <span className="text-lg font-bold">{icons[type]}</span>
                <div className="flex-1">
                    <p className="font-semibold">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="text-current hover:opacity-75 transition-opacity"
                >
                    ×
                </button>
            </div>
        </div>
    )
}
