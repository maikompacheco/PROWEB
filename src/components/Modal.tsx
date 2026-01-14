import React, { useEffect, useId } from 'react'
import { useTheme } from '../context/ThemeContext'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    description?: string
    children: React.ReactNode
    footer?: React.ReactNode
    size?: 'sm' | 'md' | 'lg'
}

export default function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    footer,
    size = 'md'
}: ModalProps) {
    const { theme } = useTheme()
    const titleId = useId()
    const descriptionId = useId()

    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose()
        }

        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = originalOverflow
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const sizeClass = {
        sm: 'max-w-lg',
        md: 'max-w-2xl',
        lg: 'max-w-4xl'
    }[size]

    const surface = theme === 'dark'
        ? 'bg-slate-900 border-slate-800 text-slate-50'
        : 'bg-white border-slate-200 text-slate-950'

    const subtle = theme === 'dark' ? 'text-slate-400' : 'text-slate-600'

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) onClose()
    }

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-describedby={description ? descriptionId : undefined}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div
                className={`relative w-full ${sizeClass} max-h-[90vh] overflow-hidden rounded-2xl border shadow-2xl flex flex-col ${surface}`}
            >
                <header className="flex items-start gap-3 px-6 py-5 border-b border-slate-200/60 dark:border-slate-800/60">
                    <div className="flex-1 min-w-0">
                        {title && (
                            <h2 id={titleId} className="text-xl sm:text-2xl font-semibold leading-tight">{title}</h2>
                        )}
                        {description && (
                            <p id={descriptionId} className={`mt-1 text-sm ${subtle}`}>{description}</p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className={`rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500/70 ${theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                        aria-label="Fechar modal"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto px-6 py-5">
                    {children}
                </div>

                {footer && (
                    <footer className={`px-6 py-4 border-t ${theme === 'dark' ? 'border-slate-800/60 bg-slate-900/80' : 'border-slate-200/80 bg-white/90'} backdrop-blur`}>
                        {footer}
                    </footer>
                )}
            </div>
        </div>
    )
}
