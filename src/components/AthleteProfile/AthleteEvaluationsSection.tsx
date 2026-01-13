import React from 'react'
import Card from '../Card'
import ScoreDisplay from '../ScoreDisplay'
import { AthleteEvaluation } from '../../types'

interface AthleteEvaluationsSectionProps {
    evaluations: AthleteEvaluation[]
}

export default function AthleteEvaluationsSection({ evaluations }: AthleteEvaluationsSectionProps) {
    if (evaluations.length === 0) {
        return (
            <Card className="border border-slate-700 text-center py-8">
                <p className="text-slate-400">Nenhuma avaliação registrada</p>
            </Card>
        )
    }

    // Sort by date, most recent first
    const sortedEvaluations = [...evaluations].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    return (
        <div className="space-y-4">
            {sortedEvaluations.map(evaluation => (
                <Card key={evaluation.id} className="border border-slate-700">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-4 border-b border-slate-700">
                        <div>
                            <h4 className="font-semibold text-slate-50">
                                Avaliação de {new Date(evaluation.date).toLocaleDateString('pt-BR')}
                            </h4>
                            <p className="text-xs text-slate-400">Avaliador: {evaluation.evaluatedBy}</p>
                        </div>
                        <ScoreDisplay score={evaluation.overallScore} label="Nota Geral" size="lg" />
                    </div>

                    {/* Scores Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                        <div>
                            <p className="text-xs text-slate-400 mb-2">Passe</p>
                            <ScoreDisplay
                                score={evaluation.technicalFundamentals.passing}
                                label="Fundamentos"
                                size="sm"
                            />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 mb-2">Domínio</p>
                            <ScoreDisplay
                                score={evaluation.technicalFundamentals.ballControl}
                                label="Fundamentos"
                                size="sm"
                            />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 mb-2">Finalização</p>
                            <ScoreDisplay
                                score={evaluation.technicalFundamentals.finishing}
                                label="Fundamentos"
                                size="sm"
                            />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 mb-2">Tática</p>
                            <ScoreDisplay score={evaluation.tactical} label="Tática" size="sm" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 mb-2">Física</p>
                            <ScoreDisplay score={evaluation.physical} label="Física" size="sm" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 mb-2">Comportamento</p>
                            <ScoreDisplay
                                score={evaluation.behavior}
                                label="Comportamento"
                                size="sm"
                            />
                        </div>
                    </div>

                    {/* Comments */}
                    {evaluation.comments && (
                        <div className="bg-slate-800/50 rounded p-3 border border-slate-700">
                            <p className="text-xs text-slate-400 font-medium mb-2">Comentários</p>
                            <p className="text-sm text-slate-300">{evaluation.comments}</p>
                        </div>
                    )}
                </Card>
            ))}
        </div>
    )
}
