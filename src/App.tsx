import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import DashboardPage from './pages/dashboard/DashBoardPage'
import { PublicRoute } from './routes/PublicRoute'
import { ProtectedRoute } from './routes/ProtectedRoute'
import RegisterPage from './pages/auth/RegisterPage'
import { AppLayout } from './layouts/AppLayout'
import { Toaster } from './components/ui/sonner'

function App() {
  return (
    <>
      <Toaster richColors/>
      <Routes>
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />

        <Route
        path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } 
        />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  )
}

export default App
