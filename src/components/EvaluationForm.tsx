import React, { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import Modal from '../components/Modal'
import ScoreDisplay from '../components/ScoreDisplay'
import { AthleteEvaluation } from '../types'

interface EvaluationFormProps {
    athleteId: string
    athleteName: string
    onSubmit: (evaluation: Omit<AthleteEvaluation, 'id' | 'athleteId'>) => void
    isOpen: boolean
    onClose: () => void
}

export default function EvaluationForm({
    athleteId,
    athleteName,
    onSubmit,
    isOpen,
    onClose
}: EvaluationFormProps) {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        technicalFundamentals: { passing: 5, ballControl: 5, finishing: 5 },
        tactical: 5,
        physical: 5,
        behavior: 5,
        comments: ''
    })

    const handleScoreChange = (field: string, value: number) => {
        if (field === 'passing' || field === 'ballControl' || field === 'finishing') {
            setFormData(prev => ({
                ...prev,
                technicalFundamentals: {
                    ...prev.technicalFundamentals,
                    [field]: Math.min(10, Math.max(0, value))
                }
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: Math.min(10, Math.max(0, value))
            }))
        }
    }

    const calculateOverallScore = () => {
        const { technicalFundamentals, tactical, physical, behavior } = formData
        const avg =
            (technicalFundamentals.passing +
                technicalFundamentals.ballControl +
                technicalFundamentals.finishing +
                tactical +
                physical +
                behavior) /
            6
        return Math.round(avg * 10) / 10
    }

    const handleSubmit = () => {
        onSubmit({
            date: formData.date,
            technicalFundamentals: formData.technicalFundamentals,
            tactical: formData.tactical,
            physical: formData.physical,
            behavior: formData.behavior,
            overallScore: calculateOverallScore(),
            comments: formData.comments,
            evaluatedBy: 'Você (Treinador)'
        })
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Avaliar ${athleteName}`}>
            <div className="space-y-6 max-h-96 overflow-y-auto">
                {/* Date */}
                <div>
                    <label className="text-sm text-slate-400 font-medium">Data</label>
                    <Input
                        type="date"
                        value={formData.date}
                        onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    />
                </div>

                {/* Technical Fundamentals */}
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <h4 className="font-semibold text-slate-50 mb-4">Fundamentos Técnicos</h4>
                    <div className="space-y-4">
                        {['Passe', 'Domínio', 'Finalização'].map((label, idx) => {
                            const keys = ['passing', 'ballControl', 'finishing']
                            const key = keys[idx] as keyof typeof formData.technicalFundamentals
                            const value = formData.technicalFundamentals[key]
                            return (
                                <div key={idx}>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm text-slate-300">{label}</label>
                                        <span className="text-sm font-semibold text-blue-400">{value}/10</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        value={value}
                                        onChange={e => handleScoreChange(key, parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Other Scores */}
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 space-y-4">
                    {[
                        { label: 'Tática', key: 'tactical' },
                        { label: 'Física', key: 'physical' },
                        { label: 'Comportamento', key: 'behavior' }
                    ].map(({ label, key }) => (
                        <div key={key}>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm text-slate-300">{label}</label>
                                <span className="text-sm font-semibold text-blue-400">
                                    {String((formData[key as keyof typeof formData] as number) || 5)}/10
                                </span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                value={String((formData[key as keyof typeof formData] as number) || 5)}
                                onChange={e => handleScoreChange(key, parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    ))}
                </div>

                {/* Overall Score Display */}
                <div className="text-center">
                    <p className="text-sm text-slate-400 mb-3">Nota Geral</p>
                    <ScoreDisplay score={calculateOverallScore()} label="Média" size="lg" />
                </div>

                {/* Comments */}
                <div>
                    <label className="text-sm text-slate-400 font-medium">Comentários</label>
                    <textarea
                        value={formData.comments}
                        onChange={e => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                        placeholder="Adicione comentários sobre o desempenho..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-50 placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none h-24"
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end">
                    <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} className="w-full sm:w-auto">
                        Salvar Avaliação
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
