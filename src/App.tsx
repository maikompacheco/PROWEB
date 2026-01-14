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
import UserProfile from './pages/UserProfile'
import AIAssistant from './pages/AIAssistant'
// import CategoriesPage from './pages/Categories'
import { NotificationProvider } from './context/NotificationContext'
import { ReactQueryProvider } from './context/ReactQueryProvider'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()
    return user ? <>{children}</> : <Navigate to="/login" replace />
}

function AppContent() {
    const { user } = useAuth()
    const { theme } = useTheme()

    return (
        <div className={`min-h-screen ${theme === 'dark'
            ? 'bg-gradient-to-br from-neutral-950 via-blue-950/20 to-neutral-950'
            : 'bg-gradient-to-br from-neutral-50 via-blue-50/30 to-neutral-50'
            }`}>
            <Header />
            <div className="flex min-h-[calc(100vh-64px)]">
                {user && <Sidebar />}
                <main className={`flex-1 ${user ? 'md:ml-0' : ''}`}>
                    <div className="p-4 sm:p-6 lg:p-8 w-full">
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
                            <Route
                                path="/ai-assistant"
                                element={
                                    <ProtectedRoute>
                                        <AIAssistant />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <ProtectedRoute>
                                        <UserProfile />
                                    </ProtectedRoute>
                                }
                            />
                            {/* <Route
                            path="/categories"
                            element={
                                <ProtectedRoute>
                                    <CategoriesPage />
                                </ProtectedRoute>
                            }
                        /> */}
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default function App() {
    return (
        <ReactQueryProvider>
            <ThemeProvider>
                <AuthProvider>
                    <AppProvider>
                        <PermissionProvider>
                            <AttendanceProvider>
                                <EvaluationProvider>
                                    <CoachProvider>
                                        <NotificationProvider>
                                            <AppContent />
                                        </NotificationProvider>
                                    </CoachProvider>
                                </EvaluationProvider>
                            </AttendanceProvider>
                        </PermissionProvider>
                    </AppProvider>
                </AuthProvider>
            </ThemeProvider>
        </ReactQueryProvider>
    )
}
