import React, { createContext, useContext, useState, ReactNode } from 'react'
import { AthleteEvaluation, AthleteEvolutionRecord } from '../types'

interface EvaluationContextType {
    evaluations: AthleteEvaluation[]
    evolutionRecords: AthleteEvolutionRecord[]
    addEvaluation: (evaluation: AthleteEvaluation) => void
    addEvolutionRecord: (record: AthleteEvolutionRecord) => void
    getAthleteEvaluations: (athleteId: string) => AthleteEvaluation[]
    getAthleteEvolutionRecords: (athleteId: string) => AthleteEvolutionRecord[]
    getLatestEvaluation: (athleteId: string) => AthleteEvaluation | undefined
}

const EvaluationContext = createContext<EvaluationContextType | undefined>(undefined)

export function EvaluationProvider({ children }: { children: ReactNode }) {
    const [evaluations, setEvaluations] = useState<AthleteEvaluation[]>([])
    const [evolutionRecords, setEvolutionRecords] = useState<AthleteEvolutionRecord[]>([])

    const addEvaluation = (evaluation: AthleteEvaluation) => {
        setEvaluations(prev => [...prev, evaluation])
    }

    const addEvolutionRecord = (record: AthleteEvolutionRecord) => {
        setEvolutionRecords(prev => [...prev, record])
    }

    const getAthleteEvaluations = (athleteId: string): AthleteEvaluation[] => {
        return evaluations.filter(evaluation => evaluation.athleteId === athleteId)
    }

    const getAthleteEvolutionRecords = (athleteId: string): AthleteEvolutionRecord[] => {
        return evolutionRecords.filter(record => record.athleteId === athleteId)
    }

    const getLatestEvaluation = (athleteId: string): AthleteEvaluation | undefined => {
        const athleteEvals = getAthleteEvaluations(athleteId)
        return athleteEvals.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
    }

    return (
        <EvaluationContext.Provider
            value={{
                evaluations,
                evolutionRecords,
                addEvaluation,
                addEvolutionRecord,
                getAthleteEvaluations,
                getAthleteEvolutionRecords,
                getLatestEvaluation
            }}
        >
            {children}
        </EvaluationContext.Provider>
    )
}

export function useEvaluation() {
    const context = useContext(EvaluationContext)
    if (!context) {
        throw new Error('useEvaluation must be used within EvaluationProvider')
    }
    return context
}
