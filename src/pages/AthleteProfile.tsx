import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import Tabs from '../components/Tabs'
import AthleteResumeSection from '../components/AthleteProfile/AthleteResumeSection'
import AthleteEvolutionSection from '../components/AthleteProfile/AthleteEvolutionSection'
import AthleteEvaluationsSection from '../components/AthleteProfile/AthleteEvaluationsSection'
import AthleteAttendanceSection from '../components/AthleteProfile/AthleteAttendanceSection'
import {
    Athlete,
    AthleteEvolutionRecord,
    AthleteEvaluation,
    AttendanceRecord,
    AthleteStatus,
    DominantFoot
} from '../types'

// Sample data for demonstration
const sampleAthlete: Athlete = {
    id: '1',
    name: 'João Silva',
    age: 17,
    club: 'Santos FC',
    position: 'Atacante',
    secondaryPosition: 'Ala',
    dominantFoot: DominantFoot.RIGHT,
    category: 'Sub 17',
    status: AthleteStatus.HIGHLIGHTED,
    height: 178,
    weight: 72,
    physicalHistory: [
        { date: '2026-01-01', height: 176, weight: 70 },
        { date: '2026-01-12', height: 178, weight: 72 }
    ],
    tracking: {
        lastSeen: '2026-01-12T10:00:00Z',
        gps: { lat: -23.5, lng: -46.6 },
        heartRate: 72
    }
}

const sampleEvolutionRecords: AthleteEvolutionRecord[] = [
    {
        id: '1',
        athleteId: '1',
        date: '2026-01-12',
        type: 'evaluation',
        title: 'Avaliação Técnica',
        description: 'Excelente desempenho em finalizações e movimentação. Necessário melhorar passe médio.',
        metadata: { evaluationId: 'eval-1' }
    },
    {
        id: '2',
        athleteId: '1',
        date: '2026-01-05',
        type: 'physical',
        title: 'Atualização de Medidas',
        description: 'Altura: 178cm, Peso: 72kg. Ganho de 2cm em altura.',
        metadata: { height: 178, weight: 72 }
    },
    {
        id: '3',
        athleteId: '1',
        date: '2025-12-20',
        type: 'category_promotion',
        title: 'Promoção de Categoria',
        description: 'Promovido para Sub 17',
        metadata: { oldCategory: 'Sub 16', newCategory: 'Sub 17' }
    },
    {
        id: '4',
        athleteId: '1',
        date: '2025-12-10',
        type: 'position_change',
        title: 'Mudança de Posição',
        description: 'Agora jogando como Ala além de Atacante',
        metadata: { oldPosition: 'Atacante', newPosition: 'Atacante/Ala' }
    }
]

const sampleEvaluations: AthleteEvaluation[] = [
    {
        id: 'eval-1',
        athleteId: '1',
        date: '2026-01-12',
        technicalFundamentals: {
            passing: 7,
            ballControl: 8,
            finishing: 9
        },
        tactical: 7,
        physical: 8,
        behavior: 9,
        overallScore: 8,
        comments: 'Desempenho excelente. Jogador com grande potencial. Necessário trabalhar passe médio.',
        evaluatedBy: 'Carlos (Treinador)'
    },
    {
        id: 'eval-2',
        athleteId: '1',
        date: '2025-12-20',
        technicalFundamentals: {
            passing: 6,
            ballControl: 7,
            finishing: 8
        },
        tactical: 6,
        physical: 7,
        behavior: 8,
        overallScore: 7,
        comments: 'Bom desenvolvimento técnico. Evoluindo bem.',
        evaluatedBy: 'Carlos (Treinador)'
    }
]

const sampleAttendanceRecords: AttendanceRecord[] = [
    { id: '1', athleteId: '1', trainingId: 't1', date: '2026-01-12', status: 'present' },
    { id: '2', athleteId: '1', trainingId: 't2', date: '2026-01-11', status: 'present' },
    { id: '3', athleteId: '1', trainingId: 't3', date: '2026-01-10', status: 'absent_justified', notes: 'Lesão' },
    { id: '4', athleteId: '1', trainingId: 't4', date: '2026-01-09', status: 'present' },
    { id: '5', athleteId: '1', trainingId: 't5', date: '2026-01-08', status: 'present' },
    { id: '6', athleteId: '1', trainingId: 't6', date: '2026-01-07', status: 'absent_unjustified' },
    { id: '7', athleteId: '1', trainingId: 't7', date: '2026-01-06', status: 'present' },
    { id: '8', athleteId: '1', trainingId: 't8', date: '2026-01-05', status: 'present' }
]

export default function AthleteProfile() {
    const { athleteId } = useParams()
    const navigate = useNavigate()
    const [athlete] = useState<Athlete>(sampleAthlete)
    const [evolutionRecords] = useState<AthleteEvolutionRecord[]>(sampleEvolutionRecords)
    const [evaluations] = useState<AthleteEvaluation[]>(sampleEvaluations)
    const [attendanceRecords] = useState<AttendanceRecord[]>(sampleAttendanceRecords)

    const tabs = [
        {
            id: 'resume',
            label: '📋 Resumo',
            content: <AthleteResumeSection athlete={athlete} />
        },
        {
            id: 'evolution',
            label: '📈 Evolução',
            content: <AthleteEvolutionSection records={evolutionRecords} />
        },
        {
            id: 'evaluations',
            label: '⭐ Avaliações',
            content: <AthleteEvaluationsSection evaluations={evaluations} />
        },
        {
            id: 'attendance',
            label: '📅 Frequência',
            content: <AthleteAttendanceSection records={attendanceRecords} />
        }
    ]

    return (
        <div className="space-y-6 p-4 sm:p-6 lg:p-8">
            {/* Header with Back Button */}
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    onClick={() => navigate('/athletes')}
                    className="px-3 sm:px-4"
                >
                    ← Voltar
                </Button>
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-50">{athlete.name}</h1>
                    <p className="text-slate-400 text-sm sm:text-base">
                        {athlete.position} • {athlete.category} • {athlete.club}
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <Card className="border border-slate-700">
                <Tabs tabs={tabs} defaultTabId="resume" />
            </Card>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
                <Button variant="secondary">Editar Atleta</Button>
                <Button variant="primary">+ Adicionar Avaliação</Button>
            </div>
        </div>
    )
}
