import React, { createContext, useContext, useState, ReactNode } from 'react'
import { AttendanceRecord, Training } from '../types'

interface AttendanceContextType {
    trainings: Training[]
    attendanceRecords: AttendanceRecord[]
    addTraining: (training: Training) => void
    recordAttendance: (record: AttendanceRecord) => void
    updateAttendance: (recordId: string, status: 'present' | 'absent_justified' | 'absent_unjustified') => void
    getAthleteAttendance: (athleteId: string) => AttendanceRecord[]
    getAttendanceRate: (athleteId: string) => number
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined)

export function AttendanceProvider({ children }: { children: ReactNode }) {
    const [trainings, setTrainings] = useState<Training[]>([])
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])

    const addTraining = (training: Training) => {
        setTrainings(prev => [...prev, training])
    }

    const recordAttendance = (record: AttendanceRecord) => {
        setAttendanceRecords(prev => [...prev, record])
    }

    const updateAttendance = (recordId: string, status: 'present' | 'absent_justified' | 'absent_unjustified') => {
        setAttendanceRecords(prev =>
            prev.map(record => (record.id === recordId ? { ...record, status } : record))
        )
    }

    const getAthleteAttendance = (athleteId: string): AttendanceRecord[] => {
        return attendanceRecords.filter(record => record.athleteId === athleteId)
    }

    const getAttendanceRate = (athleteId: string): number => {
        const records = getAthleteAttendance(athleteId)
        if (records.length === 0) return 0
        const presents = records.filter(r => r.status === 'present').length
        return Math.round((presents / records.length) * 100)
    }

    return (
        <AttendanceContext.Provider
            value={{
                trainings,
                attendanceRecords,
                addTraining,
                recordAttendance,
                updateAttendance,
                getAthleteAttendance,
                getAttendanceRate
            }}
        >
            {children}
        </AttendanceContext.Provider>
    )
}

export function useAttendance() {
    const context = useContext(AttendanceContext)
    if (!context) {
        throw new Error('useAttendance must be used within AttendanceProvider')
    }
    return context
}
