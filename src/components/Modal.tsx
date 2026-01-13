import React from 'react'
import { useTheme } from '../context/ThemeContext'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children
}: ModalProps) {
    const { theme } = useTheme()

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className={`relative rounded-2xl border p-6 sm:p-8 max-w-md w-full shadow-2xl ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
                <button
                    onClick={onClose}
                    className={`absolute top-4 right-4 transition-colors ${theme === 'dark' ? 'text-slate-500 hover:text-slate-200' : 'text-slate-400 hover:text-slate-900'}`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {title && (
                    <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>{title}</h2>
                )}
                <div>{children}</div>
            </div>
        </div>
    )
}
