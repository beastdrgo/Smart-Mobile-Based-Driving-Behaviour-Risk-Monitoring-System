import { motion } from 'framer-motion'
import {
  Shield, Users, Truck, Route, Gauge, Activity, TriangleAlert,
  Star, TrendingUp, BarChart3, ArrowUpRight, ArrowDownRight,
} from 'lucide-react'
import { useCountUp } from '@/hooks/useCountUp'
import { cn, formatNumber } from '@/lib/utils'
import type { Kpi } from '@/types'

const ICONS: Record<string, React.ElementType> = {
  shield: Shield, users: Users, truck: Truck, route: Route, gauge: Gauge,
  activity: Activity, alert: TriangleAlert, star: Star, trendup: TrendingUp, chart: BarChart3,
}

const TONE_GLOW: Record<string, string> = {
  cyan: 'from-cyan-400/25', electric: 'from-blue-500/25', safe: 'from-emerald-400/25',
  warn: 'from-amber-400/25', danger: 'from-rose-500/25',
}
const TONE_ICON: Record<string, string> = {
  cyan: 'text-cyan-300 bg-cyan-400/10', electric: 'text-blue-300 bg-blue-500/10',
  safe: 'text-emerald-300 bg-emerald-400/10', warn: 'text-amber-300 bg-amber-400/10',
  danger: 'text-rose-300 bg-rose-500/10',
}

export function KpiCard({ kpi, index }: { kpi: Kpi; index: number }) {
  const Icon = ICONS[kpi.icon] ?? Activity
  const val = useCountUp(kpi.value, 1300 + index * 60, kpi.decimals ?? 0)
  const positive = kpi.delta >= 0
  const dangerDelta = kpi.tone === 'danger' || kpi.tone === 'warn'

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="glass glass-hover rounded-2xl p-4 relative overflow-hidden group"
    >
      <div className={cn('absolute -top-16 -right-10 h-40 w-40 rounded-full bg-gradient-to-b to-transparent blur-2xl opacity-70 transition-opacity group-hover:opacity-100', TONE_GLOW[kpi.tone])} />
      <div className="relative flex items-start justify-between">
        <div className={cn('grid place-items-center h-9 w-9 rounded-xl', TONE_ICON[kpi.tone])}>
          <Icon className="h-[18px] w-[18px]" />
        </div>
        <div className={cn('flex items-center gap-0.5 text-xs font-semibold',
          positive ? (dangerDelta ? 'text-rose-300' : 'text-emerald-300') : (dangerDelta ? 'text-emerald-300' : 'text-rose-300'))}>
          {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {Math.abs(kpi.delta)}{kpi.unit === '%' ? '' : kpi.key.includes('Improvement') ? '' : ''}
        </div>
      </div>
      <div className="relative mt-4">
        <div className="font-display text-[26px] leading-none font-bold tracking-tight text-primary tabular-nums">
          {formatNumber(Math.floor(val))}
          {kpi.decimals ? <span className="text-lg">{(val % 1).toFixed(kpi.decimals).slice(1)}</span> : null}
          {kpi.unit && <span className="text-sm text-secondary ml-1 font-medium">{kpi.unit}</span>}
        </div>
        <div className="text-[13px] text-secondary mt-1.5">{kpi.label}</div>
      </div>
    </motion.div>
  )
}
