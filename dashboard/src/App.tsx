import { Routes, Route } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import Dashboard from '@/pages/Dashboard'
import LiveMap from '@/pages/LiveMap'
import Drivers from '@/pages/Drivers'
import Vehicles from '@/pages/Vehicles'
import Trips from '@/pages/Trips'
import Events from '@/pages/Events'
import CrashInvestigation from '@/pages/CrashInvestigation'
import AiAnalytics from '@/pages/AiAnalytics'
import Heatmaps from '@/pages/Heatmaps'
import Reports from '@/pages/Reports'
import SystemHealth from '@/pages/SystemHealth'
import FleetMonitoring from '@/pages/FleetMonitoring'
import { SimplePage } from '@/pages/SimplePage'
import { Building2, UserCog, Bell, Settings } from 'lucide-react'

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
