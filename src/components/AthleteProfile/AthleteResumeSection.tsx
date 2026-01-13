import React from 'react'
import Card from '../Card'
import StatusBadge from '../StatusBadge'
import ScoreDisplay from '../ScoreDisplay'
import { Athlete, AthleteStatus, DominantFoot } from '../../types'

interface AthleteResumeSectionProps {
    athlete: Athlete
}

export default function AthleteResumeSection({ athlete }: AthleteResumeSectionProps) {
    return (
        <div className="space-y-6">
            {/* Personal Info */}
            <Card className="border border-slate-700">
                <h3 className="text-lg font-semibold text-slate-50 mb-4">Informações Pessoais</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-slate-400 font-medium">Nome</p>
                        <p className="text-slate-50 font-semibold">{athlete.name}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-medium">Idade</p>
                        <p className="text-slate-50 font-semibold">{athlete.age || '-'} anos</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-medium">Escola</p>
                        <p className="text-slate-50 font-semibold">{athlete.school || '-'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-medium">Categoria</p>
                        <p className="text-slate-50 font-semibold">{athlete.category || '-'}</p>
                    </div>
                </div>
            </Card>

            {/* Physical & Football Info */}
            <Card className="border border-slate-700">
                <h3 className="text-lg font-semibold text-slate-50 mb-4">Características Físicas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-slate-400 font-medium">Altura</p>
                        <p className="text-slate-50 font-semibold">{athlete.height ? `${athlete.height} cm` : '-'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-medium">Peso</p>
                        <p className="text-slate-50 font-semibold">{athlete.weight ? `${athlete.weight} kg` : '-'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-medium">Posição Principal</p>
                        <p className="text-slate-50 font-semibold">{athlete.position || '-'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-medium">Posição Secundária</p>
                        <p className="text-slate-50 font-semibold">{athlete.secondaryPosition || '-'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-medium">Pé Dominante</p>
                        <p className="text-slate-50 font-semibold">
                            {athlete.dominantFoot === DominantFoot.LEFT
                                ? '🦶 Esquerdo'
                                : athlete.dominantFoot === DominantFoot.RIGHT
                                    ? '🦶 Direito'
                                    : athlete.dominantFoot === DominantFoot.BOTH
                                        ? '🦶 Ambidestro'
                                        : '-'}
                        </p>
                    </div>
                </div>
            </Card>

            {/* Status & Tracking */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="border border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-50 mb-4">Status</h3>
                    {athlete.status ? (
                        <StatusBadge status={athlete.status as AthleteStatus} className="w-full justify-center" />
                    ) : (
                        <p className="text-slate-400">Não definido</p>
                    )}
                </Card>

                <Card className="border border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-50 mb-4">Última Presença</h3>
                    {athlete.tracking?.lastSeen ? (
                        <p className="text-slate-50 font-semibold">
                            {new Date(athlete.tracking.lastSeen).toLocaleDateString('pt-BR')}
                        </p>
                    ) : (
                        <p className="text-slate-400">Sem registros</p>
                    )}
                </Card>
            </div>
        </div>
    )
}
