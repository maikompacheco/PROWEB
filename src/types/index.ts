// ====== ENUMS ======
export enum AthleteStatus {
    ACTIVE = 'ativo',
    OBSERVATION = 'observação',
    HIGHLIGHTED = 'destaque'
}

export enum DominantFoot {
    LEFT = 'esquerdo',
    RIGHT = 'direito',
    BOTH = 'ambidestro'
}

export enum UserRole {
    ADMIN = 'admin',
    COORDINATOR = 'coordenador',
    COACH = 'treinador'
}

// ====== ATHLETE TYPES ======
export interface AthletePhysicalData {
    date: string // ISO date
    height: number // cm
    weight: number // kg
}

export interface AthleteEvaluation {
    id: string
    athleteId: string
    date: string // ISO date
    technicalFundamentals: {
        passing: number // 0-10
        ballControl: number // 0-10
        finishing: number // 0-10
    }
    tactical: number // 0-10
    physical: number // 0-10
    behavior: number // 0-10
    overallScore: number // 0-10
    comments: string
    evaluatedBy: string // coach id
}

export interface AthleteEvolutionRecord {
    id: string
    athleteId: string
    date: string // ISO date
    type: 'physical' | 'position_change' | 'category_promotion' | 'note' | 'evaluation'
    title: string
    description: string
    metadata?: Record<string, any>
}

export interface AttendanceRecord {
    id: string
    athleteId: string
    trainingId: string
    date: string // ISO date
    status: 'present' | 'absent_justified' | 'absent_unjustified'
    notes?: string
}

export interface Athlete {
    id: string
    name: string
    age?: number
    school?: string
    position?: string
    secondaryPosition?: string
    dominantFoot?: DominantFoot
    category?: string // e.g., "Sub 14"
    status?: AthleteStatus

    // Physical data (historical)
    height?: number // current height in cm
    weight?: number // current weight in kg
    physicalHistory?: AthletePhysicalData[]

    // Relations
    teamId?: string

    // Tracking
    tracking?: {
        lastSeen?: string
        gps?: { lat: number; lng: number } | null
        heartRate?: number | null
    }

    // Metadata
    createdAt?: string
    updatedAt?: string
}

export interface Team {
    id: string
    name: string
    school?: string
    players: Athlete[]
    createdAt?: string
    updatedAt?: string
}

export interface Training {
    id: string
    teamId: string
    date: string // ISO date
    title: string
    description?: string
    duration: number // minutes
    location?: string
}

// ====== COACH/TRAINER TYPES ======
export interface Coach {
    id: string
    name: string
    email: string
    specialization?: string // e.g., "Goleiro", "Técnico de Campo"
    teamsAssigned?: string[] // team IDs
    schoolId?: string
    licenseLevel?: 'amateur' | 'professional' | 'specialist'
    bio?: string
    createdAt?: string
    updatedAt?: string
}

// ====== ATHLETE INSIGHTS ======
export interface AthleteInsights {
    id: string
    athleteId: string
    technicalStrengths: string[] // e.g., ["Passe preciso", "Visão de jogo"]
    improvementAreas: string[] // e.g., ["Velocidade", "Defesa"]
    technicalNotes: string // Observações técnicas
    behavioralNotes?: string // Comportamento, liderança, etc.
    lastUpdated: string // ISO date
    updatedBy: string // coach ID
    ageGradeInsights?: Record<string, string> // Por faixa etária/categoria
}

// ====== USER/AUTH TYPES ======
export interface User {
    id: string
    name: string
    email: string
    role: UserRole
    schoolId?: string
    coachId?: string // Se o usuário é um treinador
    permissions?: {
        canView?: boolean
        canEdit?: boolean
        canEvaluate?: boolean
        canManageTeams?: boolean
        canManageCoaches?: boolean
    }
    createdAt?: string
    updatedAt?: string
}

// ====== SCHOOL/ORGANIZATION ======
export interface School {
    id: string
    name: string
    location?: string
    city?: string
    state?: string
    contactEmail?: string
    contactPhone?: string
    createdAt?: string
    updatedAt?: string
}

// ====== CONTEXT/STATE TYPES ======
export interface FilterOptions {
    category?: string
    age?: { min: number; max: number }
    position?: string
    dominantFoot?: DominantFoot
    status?: AthleteStatus
    minAttendance?: number
}
