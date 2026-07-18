import { useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Driver } from '@/types'
import { FLEET_CENTER } from '@/data/mockData'

const STATUS_COLOR: Record<string, string> = {
  safe: '#34d399', warning: '#fbbf24', emergency: '#f43f5e', idle: '#60a5fa', offline: '#64748b',
}

const GLYPH: Record<string, string> = {
  scooter: 'M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0m10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0',
}

function markerIcon(driver: Driver, active: boolean) {
  const color = STATUS_COLOR[driver.status]
  const pulse = driver.status === 'emergency'
  const size = active ? 44 : 34
  return L.divIcon({
    className: 'fleet-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `
      <div style="position:relative;width:${size}px;height:${size}px;">
        <div class="halo" style="background:${color};opacity:.28;filter:blur(6px);${pulse ? '' : 'animation:none;'}"></div>
        <div style="position:absolute;inset:0;display:grid;place-items:center;">
          <div style="width:${active ? 20 : 15}px;height:${active ? 20 : 15}px;border-radius:50%;
            background:${color};box-shadow:0 0 0 3px rgba(5,7,15,.85), 0 0 14px ${color};
            border:2px solid rgba(255,255,255,.85);transition:all .3s;">
          </div>
        </div>
        ${active ? `<div style="position:absolute;inset:-6px;border-radius:50%;border:1.5px solid ${color};opacity:.6;"></div>` : ''}
      </div>`,
  })
}

function Recenter({ center }: { center: [number, number] }) {
  const map = useMap()
  useMemo(() => { map.flyTo(center, map.getZoom(), { duration: 1 }) }, [center]) // eslint-disable-line
  return null
}

export function FleetMap({
  drivers, selectedId, onSelect, showHeat,
}: {
  drivers: Driver[]
  selectedId: string | null
  onSelect: (id: string) => void
  showHeat: boolean
}) {
  return (
    <MapContainer center={FLEET_CENTER} zoom={13} zoomControl className="h-full w-full" preferCanvas>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; OpenStreetMap &copy; CARTO'
      />
      {drivers.map((d) => (
        <Polyline key={`r-${d.id}`} positions={d.route.map((p) => [p.lat, p.lng]) as [number, number][]}
          pathOptions={{ color: STATUS_COLOR[d.status], weight: selectedId === d.id ? 4 : 2.5, opacity: selectedId === d.id ? 0.9 : 0.35, dashArray: d.status === 'idle' ? '4 8' : undefined }} />
      ))}
      {showHeat && drivers.flatMap((d) =>
        d.route.map((p, i) => (
          <Marker key={`h-${d.id}-${i}`} position={[p.lat, p.lng]}
            icon={L.divIcon({ className: '', iconSize: [26, 26], iconAnchor: [13, 13],
              html: `<div style="width:26px;height:26px;border-radius:50%;background:radial-gradient(circle, rgba(244,63,94,.5), transparent 70%);"></div>` })}
            interactive={false} />
        )),
      )}
      {drivers.map((d) => (
        <Marker key={d.id} position={[d.location.lat, d.location.lng]} icon={markerIcon(d, selectedId === d.id)}
          eventHandlers={{ click: () => onSelect(d.id) }} />
      ))}
      {selectedId && <Recenter center={[drivers.find((d) => d.id === selectedId)!.location.lat, drivers.find((d) => d.id === selectedId)!.location.lng]} />}
    </MapContainer>
  )
}
