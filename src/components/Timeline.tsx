import React from 'react'

export interface TimelineItem {
    id: string
    date: string // ISO date
    title: string
    description?: string
    icon?: string
    type?: 'physical' | 'position_change' | 'category_promotion' | 'note' | 'evaluation'
}

interface TimelineProps {
    items: TimelineItem[]
    className?: string
}

const getTypeColor = (type?: string): string => {
    switch (type) {
        case 'physical':
            return 'bg-cyan-500'
        case 'position_change':
            return 'bg-blue-500'
        case 'category_promotion':
            return 'bg-green-500'
        case 'evaluation':
            return 'bg-purple-500'
        default:
            return 'bg-slate-500'
    }
}

const getTypeLabel = (type?: string): string => {
    switch (type) {
        case 'physical':
            return '📏 Dados Físicos'
        case 'position_change':
            return '🔄 Mudança Posição'
        case 'category_promotion':
            return '⬆️ Promoção'
        case 'evaluation':
            return '⭐ Avaliação'
        default:
            return '📝 Anotação'
    }
}

export default function Timeline({ items, className = '' }: TimelineProps) {
    const sortedItems = [...items].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    return (
        <div className={`space-y-6 ${className}`}>
            {sortedItems.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-slate-400">Nenhum registro de evolução</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {sortedItems.map((item, idx) => (
                        <div key={item.id} className="flex gap-4">
                            {/* Timeline Dot and Line */}
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-4 h-4 rounded-full ${getTypeColor(
                                        item.type
                                    )} ring-4 ring-slate-800 flex items-center justify-center`}
                                >
                                    {item.icon && <span className="text-xs">{item.icon}</span>}
                                </div>
                                {idx < sortedItems.length - 1 && (
                                    <div className="w-1 h-12 bg-slate-700 my-2" />
                                )}
                            </div>

                            {/* Timeline Content */}
                            <div className="flex-1 pt-1">
                                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                        <h4 className="font-semibold text-slate-50">
                                            {item.title}
                                        </h4>
                                        <span className="text-xs text-slate-400">
                                            {new Date(item.date).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-400 mb-2">
                                        {getTypeLabel(item.type)}
                                    </p>
                                    {item.description && (
                                        <p className="text-sm text-slate-300">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
