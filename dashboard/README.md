# FleetGuard AI — Admin Dashboard

Enterprise AI Fleet Intelligence dashboard for the **Smart Mobile-Based Driving Behaviour & Risk Monitoring System**.
Dark-navy glass UI, live Leaflet fleet map, AI insight cards, animated KPIs and safety analytics.

## Tech Stack
- **React 19** + **Vite 6** + **TypeScript**
- **Tailwind CSS v4** (design tokens in `src/index.css`)
- **Framer Motion** — page/card/panel animations
- **Leaflet** + **react-leaflet** — dark live fleet map & heatmaps
- **Chart.js** + **react-chartjs-2** — line / bar / doughnut / radar / sparklines
- **lucide-react** — icons · **react-router-dom** — routing

## Getting Started
```bash
cd dashboard
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
npm run preview    # preview the production build
```

## Structure
```
src/
├─ components/
│  ├─ layout/     Sidebar · Topbar · AppShell
│  ├─ ui/         GlassCard · KpiCard · AiInsightCard · Avatar · Badge · PageHeader
│  ├─ map/        FleetMap · VehiclePanel · VehicleRender
│  └─ charts/     Charts (area/bar/doughnut/radar/sparkline)
├─ pages/         Dashboard · LiveMap · Drivers · Vehicles · Trips · Events ·
│                 CrashInvestigation · AiAnalytics · Heatmaps · Reports ·
│                 SystemHealth · FleetMonitoring · SimplePage
├─ data/          mockData.ts   ← swap for live API / Socket.IO later
├─ hooks/         useCountUp
├─ lib/           theme · utils · chartSetup
└─ types/         shared TypeScript models
```

## Real vehicle renders
The Driver/Vehicle panel and Vehicles page show a Tesla-style floating render with cyan underglow.
Drop **transparent-background PNGs** into `public/vehicles/` named by type and they load automatically:

```
public/vehicles/scooter.png   motorcycle.png   car.png
                suv.png        van.png          truck.png   pickup.png
```
Until then, a stylized glyph placeholder is shown.

## Connecting to the backend
All screens read from `src/data/mockData.ts`. To go live:
1. Add `axios` + `@tanstack/react-query` (or `socket.io-client`).
2. Replace the mock imports with query hooks hitting the Node/Express API.
3. Feed live coordinates into `FleetMap` — the marker-movement animation already supports position updates.

Part of the **FleetGuard AI** project · dashboard module.
