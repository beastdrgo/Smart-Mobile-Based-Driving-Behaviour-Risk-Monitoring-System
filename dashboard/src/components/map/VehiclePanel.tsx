import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Gauge, MapPin, Clock, Route as RouteIcon, BatteryMedium, Wifi, Satellite,
  Camera, Cpu, Bluetooth, ShieldCheck, TriangleAlert, Brain, Zap, ArrowUpRight, ArrowDownRight,
} from 'lucide-react'
import { VehicleRender } from './VehicleRender'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { AreaLineChart } from '@/components/charts/Charts'
import { vehicleById, events as allEvents } from '@/data/mockData'
import { cn, scoreColor } from '@/lib/utils'
import type { Driver } from '@/types'

const STATUS_LABEL: Record<string, string> = { safe: 'Safe', warning: 'Warning', emergency: 'Emergency', idle: 'Idle', offline: 'Offline' }

function StatChip({ icon: Icon, label, value, ok }: { icon: React.ElementType; label: string; value: string; ok?: boolean }) {
  return (
    <div className="glass rounded-xl p-2.5 flex items-center gap-2.5">
      <div className={cn('grid place-items-center h-8 w-8 rounded-lg shrink-0', ok === false ? 'bg-rose-500/10 text-rose-300' : 'bg-cyan-400/10 text-cyan-300')}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] text-muted leading-none">{label}</div>
        <div className="text-[13px] font-semibold text-primary mt-1 truncate">{value}</div>
      </div>
    </div>
  )
}

function Metric({ label, value, tone }: { label: string; value: React.ReactNode; tone?: string }) {
  return (
    <div className="glass rounded-xl p-3">
      <div className="text-[10px] text-muted uppercase tracking-wide">{label}</div>
      <div className="text-lg font-display font-bold mt-1" style={{ color: tone }}>{value}</div>
    </div>
  )
}

export function VehiclePanel({ driver, onClose }: { driver: Driver | null; onClose: () => void }) {
  const vehicle = driver ? vehicleById(driver.vehicleId) : undefined
  const driverEvents = driver ? allEvents.filter((e) => e.driverId === driver.id) : []
  const isCrash = driver?.status === 'emergency'

  const speedSeries = Array.from({ length: 14 }, (_, i) =>
    Math.max(0, (driver?.speed ?? 40) + Math.sin(i * 0.8) * 14 + (i % 3) * 3))
  const accelSeries = Array.from({ length: 14 }, (_, i) => Math.sin(i * 1.1) * 0.5 + (i % 4 === 0 ? 0.3 : 0))

  return (
    <AnimatePresence>
      {driver && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-black/40 z-[400]" />
          <motion.aside
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="absolute top-0 right-0 h-full w-full sm:w-[420px] z-[401] glass rounded-none border-l border-white/10 overflow-y-auto no-scrollbar"
          >
            {/* header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 h-14 glass rounded-none border-b border-white/8">
              <div className="flex items-center gap-2">
                <span className={cn('h-2.5 w-2.5 rounded-full',
                  driver.status === 'safe' ? 'bg-emerald-400' : driver.status === 'warning' ? 'bg-amber-400' : driver.status === 'emergency' ? 'bg-rose-500 animate-pulse-glow' : 'bg-sky-400')} />
                <span className="font-display font-semibold text-primary text-sm">{STATUS_LABEL[driver.status]} · Live</span>
              </div>
              <button onClick={onClose} className="grid place-items-center h-8 w-8 rounded-lg hover:bg-white/5 text-secondary hover:text-primary">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {isCrash && (
                <motion.div initial={{ scale: 0.96 }} animate={{ scale: 1 }}
                  className="glass rounded-xl p-3 border border-rose-500/40 bg-rose-500/5 flex items-center gap-3">
                  <TriangleAlert className="h-5 w-5 text-rose-400 animate-pulse-glow shrink-0" />
                  <div>
                    <div className="text-[13px] font-semibold text-rose-200">Crash Detected · 4.8G impact</div>
                    <div className="text-[11px] text-rose-300/80">Vehicle stationary · emergency protocol armed</div>
                  </div>
                </motion.div>
              )}

              {/* vehicle render */}
              <VehicleRender type={vehicle?.type ?? 'car'} name={vehicle?.name ?? 'Vehicle'} />

              {/* identity */}
              <div className="flex items-center gap-3">
                <Avatar name={driver.name} size={48} />
                <div className="min-w-0">
                  <div className="font-display font-semibold text-primary">{driver.name}</div>
                  <div className="text-[11px] text-muted">{driver.employeeId} · {vehicle?.name}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-[11px] text-muted">{vehicle?.registration}</div>
                  <Badge tone={driver.status} className="mt-1">{driver.industry}</Badge>
                </div>
              </div>
              <div className="text-[11px] text-muted -mt-2">{driver.fleet}</div>

              {/* live status */}
              <div>
                <SectionTitle icon={Gauge} title="Live Status" />
                <div className="grid grid-cols-2 gap-2">
                  <StatChip icon={Gauge} label="Current Speed" value={`${driver.speed} km/h`} />
                  <StatChip icon={RouteIcon} label="Distance" value={`${driver.distanceToday} km`} />
                  <StatChip icon={Clock} label="Trip Duration" value={`${driver.tripDurationMin} min`} />
                  <StatChip icon={MapPin} label="Location" value={driver.locationName} />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <StatChip icon={BatteryMedium} label="Battery" value={`${driver.battery}%`} ok={driver.battery > 20} />
                  <StatChip icon={Wifi} label="Internet" value={`${driver.internet}%`} ok={driver.internet > 40} />
                  <StatChip icon={Satellite} label="GPS" value={driver.gps ? 'Locked' : 'Lost'} ok={driver.gps} />
                  <StatChip icon={Camera} label="Camera" value={driver.camera ? 'On' : 'Off'} ok={driver.camera} />
                  <StatChip icon={Cpu} label="Sensors" value={driver.sensors ? 'Active' : 'Fault'} ok={driver.sensors} />
                  <StatChip icon={Bluetooth} label="BLE / IMU" value={driver.ble ? 'Paired' : '—'} ok={driver.ble} />
                </div>
              </div>

              {/* AI safety */}
              <div>
                <SectionTitle icon={Brain} title="AI Safety Analysis" />
                <div className="grid grid-cols-3 gap-2">
                  <Metric label="Safety" value={driver.safetyScore} tone={scoreColor(driver.safetyScore)} />
                  <Metric label="Risk" value={driver.riskScore} tone={driver.riskScore > 50 ? '#f43f5e' : '#fbbf24'} />
                  <Metric label="Crash Prob" value={`${driver.crashProbability}%`} tone={driver.crashProbability > 30 ? '#f43f5e' : '#34d399'} />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Metric label="Driving Style" value={<span className="text-sm">{driver.drivingStyle}</span>} tone="var(--text-primary)" />
                  <Metric label="Aggressive" value={`${driver.aggressive}%`} tone={driver.aggressive > 50 ? '#fbbf24' : '#34d399'} />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Metric label="Overspeed" value={driver.overspeedCount} tone="var(--text-primary)" />
                  <Metric label="Harsh Brake" value={driver.harshBrakingCount} tone="var(--text-primary)" />
                  <Metric label="Sharp Turn" value={driver.sharpTurnCount} tone="var(--text-primary)" />
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <TrendPill label="Weekly" value={driver.weeklyTrend} />
                  <TrendPill label="Monthly" value={driver.monthlyTrend} />
                </div>
                <div className="glass rounded-xl p-3 mt-3 border border-cyan-400/20 bg-cyan-400/[0.03] flex gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-cyan-300 shrink-0 mt-0.5" />
                  <p className="text-[12px] text-secondary leading-relaxed"><span className="text-cyan-300 font-medium">AI Recommendation · </span>{driver.recommendation}</p>
                </div>
              </div>

              {/* live charts */}
              <div>
                <SectionTitle icon={Zap} title="Live Telemetry" />
                <div className="glass rounded-xl p-3 mb-2">
                  <div className="text-[11px] text-muted mb-1">Speed (km/h)</div>
                  <AreaLineChart labels={speedSeries.map((_, i) => `${i}`)} series={[{ name: 'Speed', data: speedSeries, color: '#22d3ee' }]} height={110} />
                </div>
                <div className="glass rounded-xl p-3">
                  <div className="text-[11px] text-muted mb-1">Acceleration (g)</div>
                  <AreaLineChart labels={accelSeries.map((_, i) => `${i}`)} series={[{ name: 'Accel', data: accelSeries, color: '#a78bfa' }]} height={110} />
                </div>
              </div>

              {/* recent events */}
              {driverEvents.length > 0 && (
                <div>
                  <SectionTitle icon={TriangleAlert} title="Recent Events" />
                  <div className="space-y-1.5">
                    {driverEvents.map((e) => (
                      <div key={e.id} className="glass rounded-xl p-2.5 flex items-center gap-3">
                        <span className={cn('h-2 w-2 rounded-full shrink-0',
                          e.severity === 'critical' ? 'bg-rose-500' : e.severity === 'high' ? 'bg-orange-400' : e.severity === 'medium' ? 'bg-amber-400' : 'bg-sky-400')} />
                        <div className="min-w-0 flex-1">
                          <div className="text-[12px] text-primary capitalize">{e.type.replace('_', ' ')}</div>
                          <div className="text-[10px] text-muted">{e.locationName}</div>
                        </div>
                        {e.value && <span className="text-[11px] text-secondary">{e.value}</span>}
                        <span className="text-[10px] text-muted">{e.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function SectionTitle({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-2.5">
      <Icon className="h-3.5 w-3.5 text-cyan-300" />
      <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">{title}</span>
    </div>
  )
}

function TrendPill({ label, value }: { label: string; value: number }) {
  const up = value >= 0
  return (
    <div className="flex items-center gap-1.5 text-[12px]">
      <span className="text-muted">{label}</span>
      <span className={cn('flex items-center gap-0.5 font-semibold', up ? 'text-emerald-300' : 'text-rose-300')}>
        {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}{Math.abs(value)}%
      </span>
    </div>
  )
}
