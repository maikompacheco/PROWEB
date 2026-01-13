import React, { createContext, useContext, ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { UserRole } from '../types'

interface Permission {
    canView: boolean
    canEdit: boolean
    canEvaluate: boolean
    canManageTeams: boolean
    canManageUsers: boolean
    canViewReports: boolean
}

interface RolePermissions {
    [key: string]: Permission
}

const rolePermissions: RolePermissions = {
    admin: {
        canView: true,
        canEdit: true,
        canEvaluate: true,
        canManageTeams: true,
        canManageUsers: true,
        canViewReports: true
    },
    coordenador: {
        canView: true,
        canEdit: true,
        canEvaluate: true,
        canManageTeams: true,
        canManageUsers: false,
        canViewReports: true
    },
    treinador: {
        canView: true,
        canEdit: false,
        canEvaluate: true,
        canManageTeams: false,
        canManageUsers: false,
        canViewReports: false
    }
}

interface PermissionContextType {
    permissions: Permission
    hasPermission: (permission: keyof Permission) => boolean
    canPerformAction: (action: string) => boolean
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined)

export function PermissionProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth()

    // Get permissions based on user role, default to minimal permissions
    const permissions = user ? rolePermissions[user.role] || rolePermissions.treinador : {
        canView: false,
        canEdit: false,
        canEvaluate: false,
        canManageTeams: false,
        canManageUsers: false,
        canViewReports: false
    }

    const hasPermission = (permission: keyof Permission): boolean => {
        return permissions[permission] === true
    }

    const canPerformAction = (action: string): boolean => {
        // Map action names to permissions
        const actionMap: Record<string, keyof Permission> = {
            'view-athletes': 'canView',
            'edit-athletes': 'canEdit',
            'evaluate-athletes': 'canEvaluate',
            'manage-teams': 'canManageTeams',
            'manage-users': 'canManageUsers',
            'view-reports': 'canViewReports'
        }

        const permission = actionMap[action]
        return permission ? hasPermission(permission) : false
    }

    return (
        <PermissionContext.Provider value={{ permissions, hasPermission, canPerformAction }}>
            {children}
        </PermissionContext.Provider>
    )
}

export function usePermissions() {
    const context = useContext(PermissionContext)
    if (!context) {
        throw new Error('usePermissions must be used within PermissionProvider')
    }
    return context
}
