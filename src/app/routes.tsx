import { Routes, Route, Navigate } from 'react-router-dom'
import { useSessionStore } from '@/stores/session-store'
import AppLayout from './layout/AppLayout'
import LoginPage from '@/features/auth/LoginPage'
import HomePage from '@/features/home/HomePage'
import CotizacionesListPage from '@/features/cotizaciones/CotizacionesListPage'
import KanbanPage from '@/features/kanban/KanbanPage'
import ClientesListPage from '@/features/clientes/ClientesListPage'
import ClientePerfilPage from '@/features/clientes/ClientePerfilPage'
import EmpleadosListPage from '@/features/empleados/EmpleadosListPage'
import EmpleadoPerfilPage from '@/features/empleados/EmpleadoPerfilPage'
import ServiciosListPage from '@/features/servicios/ServiciosListPage'
import DashboardPage from '@/features/dashboard/DashboardPage'
import PagosPage from '@/features/pagos/PagosPage'
import ConfiguracionPage from '@/features/configuracion/ConfiguracionPage'

function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: 'admin' }) {
  const { isAuthenticated, user } = useSessionStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user?.rol !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default function AppRoutes() {
  const { isAuthenticated } = useSessionStore()

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="cotizaciones" element={<CotizacionesListPage />} />
        <Route path="kanban" element={<KanbanPage />} />
        <Route path="clientes" element={<ClientesListPage />} />
        <Route path="clientes/:id" element={<ClientePerfilPage />} />
        <Route
          path="empleados"
          element={
            <ProtectedRoute requiredRole="admin">
              <EmpleadosListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="empleados/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <EmpleadoPerfilPage />
            </ProtectedRoute>
          }
        />
        <Route path="servicios" element={<ServiciosListPage />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="pagos"
          element={
            <ProtectedRoute requiredRole="admin">
              <PagosPage />
            </ProtectedRoute>
          }
        />
        <Route path="configuracion" element={<ConfiguracionPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
