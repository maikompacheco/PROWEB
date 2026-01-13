import React from 'react'
import Card from '../Card'
import { AttendanceRecord } from '../../types'

interface AthleteAttendanceSectionProps {
    records: AttendanceRecord[]
}

const getStatusConfig = (status: string) => {
    const configs = {
        present: { icon: '✅', label: 'Presente', color: 'bg-green-500/20 text-green-400' },
        absent_justified: { icon: '✋', label: 'Falta Justificada', color: 'bg-yellow-500/20 text-yellow-400' },
        absent_unjustified: { icon: '❌', label: 'Falta Injustificada', color: 'bg-red-500/20 text-red-400' }
    }
    return configs[status as keyof typeof configs] || configs.present
}

export default function AthleteAttendanceSection({ records }: AthleteAttendanceSectionProps) {
    const sortedRecords = [...records].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    const stats = {
        present: records.filter(r => r.status === 'present').length,
        absent_justified: records.filter(r => r.status === 'absent_justified').length,
        absent_unjustified: records.filter(r => r.status === 'absent_unjustified').length
    }

    const total = records.length
    const attendance = total > 0 ? Math.round((stats.present / total) * 100) : 0

    return (
        <div className="space-y-6">
            {/* Stats */}
            {total > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <Card className="border border-slate-700 text-center">
                        <p className="text-xs text-slate-400 mb-2">Taxa Assiduidade</p>
                        <p className="text-3xl font-bold text-green-400">{attendance}%</p>
                    </Card>
                    <Card className="border border-slate-700 text-center">
                        <p className="text-xs text-slate-400 mb-2">Presentes</p>
                        <p className="text-3xl font-bold text-green-400">{stats.present}</p>
                    </Card>
                    <Card className="border border-slate-700 text-center">
                        <p className="text-xs text-slate-400 mb-2">Faltas Justificadas</p>
                        <p className="text-3xl font-bold text-yellow-400">{stats.absent_justified}</p>
                    </Card>
                    <Card className="border border-slate-700 text-center">
                        <p className="text-xs text-slate-400 mb-2">Faltas Injustificadas</p>
                        <p className="text-3xl font-bold text-red-400">{stats.absent_unjustified}</p>
                    </Card>
                </div>
            )}

            {/* Records */}
            {sortedRecords.length === 0 ? (
                <Card className="border border-slate-700 text-center py-8">
                    <p className="text-slate-400">Nenhum registro de presença</p>
                </Card>
            ) : (
                <Card className="border border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-50 mb-4">Histórico de Presença</h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {sortedRecords.map(record => {
                            const config = getStatusConfig(record.status)
                            return (
                                <div
                                    key={record.id}
                                    className="flex items-center justify-between p-3 bg-slate-800/50 rounded border border-slate-700"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{config.icon}</span>
                                        <div>
                                            <p className="text-slate-50 font-semibold text-sm">
                                                {new Date(record.date).toLocaleDateString('pt-BR')}
                                            </p>
                                            {record.notes && (
                                                <p className="text-xs text-slate-400">{record.notes}</p>
                                            )}
                                        </div>
                                    </div>
                                    <span className={`text-xs font-medium px-2 py-1 rounded ${config.color}`}>
                                        {config.label}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </Card>
            )}
        </div>
    )
}
