import React, { useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import Button from './Button'

interface ConfirmDialogProps {
    isOpen: boolean
    title: string
    message: string
    confirmText?: string
    cancelText?: string
    isDangerous?: boolean // true para ações destrutivas (remover)
    isLoading?: boolean
    icon?: 'warning' | 'error' | 'success' | 'info' | 'question'
    onConfirm: () => void | Promise<void>
    onCancel: () => void
    closeOnBackdropClick?: boolean
}

const iconMap = {
    warning: '⚠️',
    error: '❌',
    success: '✅',
    info: 'ℹ️',
    question: '❓'
}

export default function ConfirmDialog({
    isOpen,
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    isDangerous = false,
    isLoading = false,
    icon = 'question',
    onConfirm,
    onCancel,
    closeOnBackdropClick = true
}: ConfirmDialogProps) {
    const { theme } = useTheme()

    // Fecha com ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onCancel()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onCancel])

    if (!isOpen) return null

    const handleConfirm = async () => {
        try {
            await onConfirm()
        } catch (error) {
            console.error('Erro ao confirmar:', error)
        }
    }

    return (
        <div className="dialog-overlay flex items-center justify-center p-4">
            <div
                className="absolute inset-0"
                onClick={() => closeOnBackdropClick && onCancel()}
            />
            <div className={`dialog-content ${isDangerous ? 'border-red-500/50' : ''}`}>
                {/* Icon */}
                <div className="text-4xl mb-4 text-center">
                    {iconMap[icon]}
                </div>

                {/* Title */}
                <h2 className={`text-xl font-bold mb-3 text-center ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                    {title}
                </h2>

                {/* Message */}
                <p className={`mb-6 text-center ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {message}
                </p>

                {/* Buttons */}
                <div className="flex gap-3 justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={isDangerous ? 'primary' : 'primary'}
                        size="sm"
                        onClick={handleConfirm}
                        isLoading={isLoading}
                        className={isDangerous ? 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white' : ''}
                    >
                        {confirmText}
                    </Button>
                </div>

                {/* Hint */}
                <p className={`text-xs mt-4 text-center ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                    Pressione <kbd className="px-2 py-1 bg-slate-600 text-white rounded text-xs">ESC</kbd> para cancelar
                </p>
            </div>
        </div>
    )
}
