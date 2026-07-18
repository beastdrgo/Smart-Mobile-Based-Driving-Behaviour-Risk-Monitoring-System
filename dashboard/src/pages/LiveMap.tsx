import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, Radio, Layers } from 'lucide-react'
import { FleetMap } from '@/components/map/FleetMap'
import { VehiclePanel } from '@/components/map/VehiclePanel'
import { drivers as seedDrivers } from '@/data/mockData'
import { cn } from '@/lib/utils'
import type { Driver } from '@/types'

const LEGEND = [
  { c: '#34d399', label: 'Safe' },
  { c: '#fbbf24', label: 'Warning' },
  { c: '#f43f5e', label: 'Emergency' },
  { c: '#60a5fa', label: 'Idle' },
]

export default function LiveMap() {
  const [drivers, setDrivers] = useState<Driver[]>(seedDrivers)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showHeat, setShowHeat] = useState(false)
  const stepRef = useRef(0)

  // live movement simulation — nudge active drivers along their route
  useEffect(() => {
    const t = setInterval(() => {
      stepRef.current += 1
      setDrivers((prev) =>
        prev.map((d) => {
          if (d.status === 'idle' || d.status === 'emergency' || d.route.length < 2) return d
          const idx = stepRef.current % d.route.length
          const p = d.route[idx]
          return { ...d, location: { lat: p.lat, lng: p.lng }, speed: Math.max(0, Math.round(d.speed + Math.sin(stepRef.current * 0.6) * 4)) }
        }),
      )
    }, 2200)
    return () => clearInterval(t)
  }, [])

  const selected = drivers.find((d) => d.id === selectedId) ?? null

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      <FleetMap drivers={drivers} selectedId={selectedId} onSelect={setSelectedId} showHeat={showHeat} />

      {/* top-left title */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-4 z-[400] glass rounded-2xl px-4 py-3 flex items-center gap-3">
        <div className="grid place-items-center h-9 w-9 rounded-xl accent-gradient ring-glow">
          <Radio className="h-4 w-4 text-white" />
        </div>
        <div>
          <div className="font-display font-semibold text-primary text-sm leading-none">Live Fleet Map</div>
          <div className="text-[11px] text-muted mt-1 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
            {drivers.filter((d) => d.status !== 'offline').length} vehicles tracked · real-time
          </div>
        </div>
      </motion.div>

      {/* controls */}
      <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
        <button onClick={() => setShowHeat((h) => !h)}
          className={cn('glass rounded-xl h-11 px-3.5 flex items-center gap-2 text-[13px] font-medium transition-colors',
            showHeat ? 'text-rose-300 border-rose-400/30' : 'text-secondary hover:text-primary')}>
          <Flame className="h-4 w-4" /> Heatmap
        </button>
        <button className="glass rounded-xl h-11 px-3.5 flex items-center gap-2 text-[13px] font-medium text-secondary hover:text-primary transition-colors">
          <Layers className="h-4 w-4" /> Layers
        </button>
      </div>

      {/* legend */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-6 left-4 z-[400] glass rounded-2xl px-4 py-3">
        <div className="text-[10px] uppercase tracking-wider text-muted mb-2">Marker Status</div>
        <div className="flex items-center gap-4">
          {LEGEND.map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.c, boxShadow: `0 0 8px ${l.c}` }} />
              <span className="text-[11px] text-secondary">{l.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* driver strip (bottom right) */}
      {!selected && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-6 right-4 z-[400] glass rounded-2xl p-2 hidden md:flex gap-1.5 max-w-md overflow-x-auto no-scrollbar">
          {drivers.filter((d) => d.status !== 'offline').map((d) => (
            <button key={d.id} onClick={() => setSelectedId(d.id)}
              className="shrink-0 flex items-center gap-2 px-2.5 py-2 rounded-xl hover:bg-white/5 transition-colors">
              <span className={cn('h-2 w-2 rounded-full',
                d.status === 'safe' ? 'bg-emerald-400' : d.status === 'warning' ? 'bg-amber-400' : d.status === 'emergency' ? 'bg-rose-500' : 'bg-sky-400')} />
              <span className="text-[12px] text-primary whitespace-nowrap">{d.name.split(' ')[0]}</span>
              <span className="text-[11px] text-muted">{d.speed}</span>
            </button>
          ))}
        </motion.div>
      )}

      <VehiclePanel driver={selected} onClose={() => setSelectedId(null)} />
    </div>
  )
}
