import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Radar, Users, Truck, Route, Map, Zap, ShieldAlert,
  BrainCircuit, Flame, FileText, Building2, UserCog, Bell, Settings, HeartPulse,
  ChevronsLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { section: 'Command', items: [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/fleet', label: 'Fleet Monitoring', icon: Radar },
    { to: '/map', label: 'Live Map', icon: Map, badge: 'LIVE' },
  ]},
  { section: 'Operations', items: [
    { to: '/drivers', label: 'Drivers', icon: Users },
    { to: '/vehicles', label: 'Vehicles', icon: Truck },
    { to: '/trips', label: 'Trips', icon: Route },
    { to: '/events', label: 'Events', icon: Zap },
    { to: '/crash', label: 'Crash Investigation', icon: ShieldAlert, badge: '1' },
  ]},
  { section: 'Intelligence', items: [
    { to: '/ai', label: 'AI Analytics', icon: BrainCircuit },
    { to: '/heatmaps', label: 'Heatmaps', icon: Flame },
    { to: '/reports', label: 'Reports', icon: FileText },
  ]},
  { section: 'Admin', items: [
    { to: '/organizations', label: 'Organizations', icon: Building2 },
    { to: '/users', label: 'Users', icon: UserCog },
    { to: '/notifications', label: 'Notifications', icon: Bell },
    { to: '/settings', label: 'Settings', icon: Settings },
    { to: '/system', label: 'System Health', icon: HeartPulse },
  ]},
]

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 78 : 264 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      className="glass border-r border-white/5 h-screen sticky top-0 z-30 flex flex-col shrink-0 rounded-none"
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 h-16 shrink-0">
        <div className="grid place-items-center h-9 w-9 rounded-xl accent-gradient shadow-lg ring-glow shrink-0">
          <ShieldAlert className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-w-0">
            <div className="font-display font-bold text-[15px] leading-none text-primary">FleetGuard<span className="text-accent-gradient"> AI</span></div>
            <div className="text-[10px] text-muted mt-1 tracking-wide">FLEET COMMAND CENTER</div>
          </motion.div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto no-scrollbar px-3 py-2">
        {NAV.map((group) => (
          <div key={group.section} className="mb-4">
            {!collapsed && (
              <div className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted">{group.section}</div>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={(item as any).end}
                  className={({ isActive }) =>
                    cn(
                      'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-all',
                      isActive ? 'text-primary' : 'text-secondary hover:text-primary hover:bg-white/[0.03]',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div layoutId="nav-active" className="absolute inset-0 rounded-xl bg-cyan-400/10 border border-cyan-400/25"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                      )}
                      {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full accent-gradient" />}
                      <item.icon className={cn('h-[18px] w-[18px] shrink-0 relative z-10', isActive && 'text-cyan-300')} />
                      {!collapsed && <span className="relative z-10 truncate">{item.label}</span>}
                      {!collapsed && (item as any).badge && (
                        <span className={cn('relative z-10 ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full',
                          (item as any).badge === 'LIVE' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300')}>
                          {(item as any).badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse */}
      <button onClick={onToggle} className="flex items-center gap-3 px-5 h-14 border-t border-white/5 text-secondary hover:text-primary transition-colors">
        <ChevronsLeft className={cn('h-[18px] w-[18px] transition-transform', collapsed && 'rotate-180')} />
        {!collapsed && <span className="text-[13px]">Collapse</span>}
      </button>
    </motion.aside>
  )
}
