import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { AppProvider } from './context/AppContext'
import { PermissionProvider } from './context/PermissionContext'
import { AttendanceProvider } from './context/AttendanceContext'
import { EvaluationProvider } from './context/EvaluationContext'
import { CoachProvider } from './context/CoachContext'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Athletes from './pages/Athletes'
import AthleteProfile from './pages/AthleteProfile'
import Teams from './pages/Teams'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()
    return user ? <>{children}</> : <Navigate to="/login" replace />
}

function AppContent() {
    const { user } = useAuth()
    const { theme } = useTheme()

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950 text-slate-50' : 'bg-slate-50 text-slate-950'}`}>
            <Header />
            <div className="flex h-full">
                {user && <Sidebar />}
                <main className={`flex-1 ${user ? 'md:ml-0' : ''} p-4 sm:p-6 lg:p-8 w-full`}>
                    <Routes>
                        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/athletes"
                            element={
                                <ProtectedRoute>
                                    <Athletes />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/athletes/:athleteId"
                            element={
                                <ProtectedRoute>
                                    <AthleteProfile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/teams"
                            element={
                                <ProtectedRoute>
                                    <Teams />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <AppProvider>
                    <PermissionProvider>
                        <AttendanceProvider>
                            <EvaluationProvider>
                                <CoachProvider>
                                    <AppContent />
                                </CoachProvider>
                            </EvaluationProvider>
                        </AttendanceProvider>
                    </PermissionProvider>
                </AppProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}
