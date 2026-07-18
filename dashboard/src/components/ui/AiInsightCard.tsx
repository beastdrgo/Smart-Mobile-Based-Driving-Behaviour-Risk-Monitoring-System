import { motion } from 'framer-motion'
import { Sparkles, TriangleAlert, TrendingUp, Info, Siren, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AiInsight } from '@/types'

const CONFIG: Record<AiInsight['tone'], { icon: React.ElementType; ring: string; chip: string; label: string }> = {
  critical: { icon: Siren, ring: 'border-rose-500/30', chip: 'text-rose-300 bg-rose-500/10', label: 'Critical' },
  warning: { icon: TriangleAlert, ring: 'border-amber-400/30', chip: 'text-amber-300 bg-amber-400/10', label: 'Attention' },
  positive: { icon: TrendingUp, ring: 'border-emerald-400/30', chip: 'text-emerald-300 bg-emerald-400/10', label: 'Improving' },
  info: { icon: Info, ring: 'border-cyan-400/30', chip: 'text-cyan-300 bg-cyan-400/10', label: 'Prediction' },
}

export function AiInsightCard({ insight, index, onClick }: { insight: AiInsight; index: number; onClick?: () => void }) {
  const c = CONFIG[insight.tone]
  const Icon = c.icon
  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ x: 3 }}
      onClick={onClick}
      className={cn('glass glass-hover rounded-xl p-3.5 text-left w-full flex gap-3 items-start border', c.ring)}
    >
      <div className={cn('grid place-items-center h-8 w-8 rounded-lg shrink-0', c.chip)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={cn('text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded', c.chip)}>{c.label}</span>
        </div>
        <div className="text-[13px] font-semibold text-primary mt-1.5 leading-snug">{insight.title}</div>
        <div className="text-xs text-secondary mt-1 leading-relaxed">{insight.detail}</div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted mt-1 shrink-0" />
    </motion.button>
  )
}

export function AiSummaryHeader() {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div className="grid place-items-center h-8 w-8 rounded-lg accent-gradient shadow-lg ring-glow">
        <Sparkles className="h-4 w-4 text-white" />
      </div>
      <div>
        <div className="font-display text-[15px] font-semibold text-primary">AI Fleet Summary</div>
        <div className="text-[11px] text-muted">Updated live · powered by FleetGuard Intelligence</div>
      </div>
    </div>
  )
}
