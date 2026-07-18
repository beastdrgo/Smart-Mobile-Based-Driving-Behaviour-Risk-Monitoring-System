import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { SimplePage } from '@/pages/SimplePage'
import { Building2, UserCog, Bell, Settings } from 'lucide-react'

// Route-level code splitting: each page ships as its own chunk and is
// fetched on demand, keeping the initial bundle small.
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const LiveMap = lazy(() => import('@/pages/LiveMap'))
const Drivers = lazy(() => import('@/pages/Drivers'))
const Vehicles = lazy(() => import('@/pages/Vehicles'))
const Trips = lazy(() => import('@/pages/Trips'))
const Events = lazy(() => import('@/pages/Events'))
const CrashInvestigation = lazy(() => import('@/pages/CrashInvestigation'))
const AiAnalytics = lazy(() => import('@/pages/AiAnalytics'))
const Heatmaps = lazy(() => import('@/pages/Heatmaps'))
const Reports = lazy(() => import('@/pages/Reports'))
const SystemHealth = lazy(() => import('@/pages/SystemHealth'))
const FleetMonitoring = lazy(() => import('@/pages/FleetMonitoring'))

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/fleet" element={<FleetMonitoring />} />
        <Route path="/map" element={<LiveMap />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/events" element={<Events />} />
        <Route path="/crash" element={<CrashInvestigation />} />
        <Route path="/ai" element={<AiAnalytics />} />
        <Route path="/heatmaps" element={<Heatmaps />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/organizations" element={<SimplePage title="Organizations" subtitle="Manage tenant organizations, fleets and hierarchy." icon={Building2} />} />
        <Route path="/users" element={<SimplePage title="Users" subtitle="Admin users, roles and access control." icon={UserCog} />} />
        <Route path="/notifications" element={<SimplePage title="Notifications" subtitle="Alert rules, channels and delivery preferences." icon={Bell} />} />
        <Route path="/settings" element={<SimplePage title="Settings" subtitle="Platform configuration, thresholds and integrations." icon={Settings} />} />
        <Route path="/system" element={<SystemHealth />} />
      </Route>
    </Routes>
  )
}
