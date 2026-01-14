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
    COACH = 'treinador',
    SCHOOL_MANAGER = 'gerente_escola'
}

export enum CoachRole {
    FIELD_COACH = 'tecnico_campo',
    GOALKEEPER_COACH = 'tecnico_goleiro',
    PHYSICAL_TRAINER = 'preparador_fisico',
    NUTRITIONIST = 'nutricionista',
    PSYCHOLOGIST = 'psicólogo',
    DIRECTOR = 'diretor_tecnico'
}

export enum LicenseLevel {
    BASIC = 'basico',
    INTERMEDIATE = 'intermediario',
    ADVANCED = 'avancado',
    PROFESSIONAL = 'profissional',
    SPECIALIST = 'especialista'
}

export enum LicenseStatus {
    VALID = 'valida',
    EXPIRED = 'expirada',
    PENDING = 'pendente',
    REVOKED = 'revogada'
}

// ====== CATEGORIES ======
export enum AthleteCategory {
    SUB7 = 'Sub-7',
    SUB9 = 'Sub-9',
    SUB11 = 'Sub-11',
    SUB13 = 'Sub-13',
    SUB15 = 'Sub-15',
    SUB17 = 'Sub-17',
    SUB20 = 'Sub-20',
    PROFISSIONAL = 'Profissional'
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
    club?: string
    position?: string
    secondaryPosition?: string
    dominantFoot?: DominantFoot
    category?: AthleteCategory | string // e.g., "Sub-14"
    status?: AthleteStatus
    avatarUrl?: string

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
    category?: string // Sub-7, Sub-9, Sub-11, Sub-13, Sub-15, Sub-17, Sub-20, Profissional
    players: Athlete[]
    coaches?: string[] // coach IDs
    coordinator?: string // coach ID principal
    schedule?: {
        trainingDays: string[] // "segunda", "quarta", "sexta"
        location: string
        time: string // "14:30"
    }
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
export interface CoachLicense {
    id: string
    coachId: string
    licenseType: string // e.g., "CBV", "FIFA", "AFA"
    level: LicenseLevel
    issueDate: string // ISO date
    expiryDate: string // ISO date
    status: LicenseStatus
    certificateNumber?: string
    issuingOrganization?: string
    verificationUrl?: string
    lastVerified?: string
}

export interface CoachPermissions {
    canEvaluateAthletes: boolean
    canManageTeams: boolean
    canAccessReports: boolean
    canManageOtherCoaches: boolean
    canAccessFinances: boolean
    canApproveAttendance: boolean
    customPermissions?: Record<string, boolean>
}

export interface Coach {
    id: string
    name: string
    email: string
    phone?: string
    role: CoachRole
    teamsAssigned?: string[] // team IDs
    schoolId?: string
    licenses?: CoachLicense[] // Array de licenças
    permissions?: CoachPermissions // Controle granular
    yearsExperience?: number
    bio?: string
    certifications?: string[] // Lista de certificações
    languagesSpoken?: string[] // Idiomas
    photoUrl?: string
    status: 'active' | 'inactive' | 'suspended'
    createdAt?: string
    updatedAt?: string
}

// ====== ATHLETE INSIGHTS ======
export interface AthleteInsights {
    id: string
    athleteId: string
    seasonYear: number // 2024, 2025, etc
    technicalStrengths: string[] // e.g., ["Passe preciso", "Visão de jogo"]
    improvementAreas: string[] // e.g., ["Velocidade", "Defesa"]
    technicalNotes: string // Observações técnicas
    behavioralNotes?: string // Comportamento, liderança, etc.
    potentialLevel?: 'baixo' | 'medio' | 'alto' | 'excepcional' // Para IA
    recommendedTraining?: string[] // Sugestões de treino
    aiAnalysis?: {
        predictedGrowth?: number // percentual
        competitionLevel?: string
        recommendedPositions?: string[]
        trainingFocus?: string[]
    }
    lastUpdated: string // ISO date
    updatedBy: string // coach ID
    ageGradeInsights?: Record<string, string> // Por faixa etária/categoria
}

// ====== USER/AUTH TYPES ======
export interface UserPermissions {
    canView: boolean
    canEdit: boolean
    canEvaluate: boolean
    canManageTeams: boolean
    canManageCoaches: boolean
    canAccessReports: boolean
    canManageAttendance: boolean
    canAccessFinances: boolean
    canDeleteData: boolean
}

export interface User {
    id: string
    name: string
    email: string
    role: UserRole
    schoolId?: string
    coachId?: string // Se o usuário é um treinador
    permissions?: UserPermissions
    profilePhotoUrl?: string
    lastLogin?: string
    status: 'active' | 'inactive' | 'suspended'
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
