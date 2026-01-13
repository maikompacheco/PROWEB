import React from 'react'
import Card from '../Card'
import Timeline, { TimelineItem } from '../Timeline'
import { AthleteEvolutionRecord } from '../../types'

interface AthleteEvolutionSectionProps {
    records: AthleteEvolutionRecord[]
}

export default function AthleteEvolutionSection({ records }: AthleteEvolutionSectionProps) {
    const timelineItems: TimelineItem[] = records.map(record => ({
        id: record.id,
        date: record.date,
        title: record.title,
        description: record.description,
        type: record.type as any
    }))

    return (
        <Card className="border border-slate-700">
            <h3 className="text-lg font-semibold text-slate-50 mb-6">Histórico de Evolução</h3>
            <Timeline items={timelineItems} />
        </Card>
    )
}
