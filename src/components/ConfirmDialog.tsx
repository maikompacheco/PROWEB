import React from 'react'
import { useTheme } from '../context/ThemeContext'
import Button from './Button'

interface ConfirmDialogProps {
    isOpen: boolean
    title: string
    message: string
    confirmText?: string
    cancelText?: string
    isDangerous?: boolean
    isLoading?: boolean
    onConfirm: () => void | Promise<void>
    onCancel: () => void
}

export default function ConfirmDialog({
    isOpen,
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    isDangerous = false,
    isLoading = false,
    onConfirm,
    onCancel
}: ConfirmDialogProps) {
    const { theme } = useTheme()

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
                onClick={onCancel}
            />
            <div className={`dialog-content max-w-sm w-full ${isDangerous ? 'border-red-500/30' : ''}`}>
                <h2 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'}`}>
                    {title}
                </h2>

                <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {message}
                </p>

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
                        variant="primary"
                        size="sm"
                        onClick={handleConfirm}
                        isLoading={isLoading}
                        className={isDangerous ? 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white' : ''}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    )
}
