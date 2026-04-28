Here’s a **complete, clean, professional README.md** for your Dashboard. You can copy-paste this directly into `Dashboard/README.md`.

---

# 📊 Fleet Guard Dashboard

Frontend dashboard for the **Smart Mobile-Based Driver Safety & Fleet Monitoring System**.

This dashboard provides real-time insights into driver behavior, trip data, safety scores, and analytics using a clean and scalable UI.

---

# 🚀 Overview

The dashboard is a **React-based web application** built using Vite.
It connects to a FastAPI backend to display:

* Driver performance
* Trip summaries
* Driving events
* Safety & productivity scores
* Reports & analytics

---

# 🧠 Features

### 🔐 Authentication

* Admin login
* JWT-based authentication
* Secure API communication

---

### 📊 Dashboard

* Overview of system activity
* Total drivers
* Active trips
* Safety trends

---

### 👤 Driver Management

* List of all drivers
* Individual driver performance
* Driver safety score tracking

---

### 🚗 Trip Monitoring

* Trip start/end tracking
* Trip summaries
* Distance, duration, and events

---

### ⚠️ Event Tracking

* Harsh braking
* Rapid acceleration
* Overspeed detection
* Sharp turns
* Potholes (optional detection)

---

### 📈 Analytics & Reports

* Safety score trends
* Monthly reports
* Driver comparisons

---

### 🗺 Heatmap (Advanced)

* Risk zone visualization
* Location-based analytics

---

# 🏗 Tech Stack

### Frontend

* React
* Vite
* Axios
* Recharts
* React Router

---

### Backend (Connected)

* FastAPI
* PostgreSQL
* JWT Authentication

---

# 📁 Project Structure

```text
Dashboard/
│── src/
│   ├── api/
│   │   └── apiClient.js
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── DriverCard.jsx
│   │   ├── ScoreChart.jsx
│   │   ├── EventTable.jsx
│   │   └── TripSummaryCard.jsx
│   │
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── DashboardHome.jsx
│   │   ├── DriversPage.jsx
│   │   ├── TripsPage.jsx
│   │   ├── EventsPage.jsx
│   │   ├── ReportsPage.jsx
│   │   └── HeatmapPage.jsx
│   │
│   ├── utils/
│   │   └── formatters.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
│── public/
│── index.html
│── package.json
│── vite.config.js
│── README.md
```

---

# ⚙️ Installation & Setup

### 1. Navigate to dashboard

```bash
cd Dashboard
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Run development server

```bash
npm run dev
```

---

### 4. Open in browser

```text
http://localhost:5173
```

---

# 🔗 API Configuration

Update base URL in:

```bash
src/api/apiClient.js
```

```javascript
baseURL: "http://127.0.0.1:8000"
```

---

# 🔐 Authentication Flow

1. User logs in
2. Backend returns JWT token
3. Token stored in `localStorage`
4. Axios attaches token to all requests

---

# 📡 API Endpoints Used

```text
POST   /auth/login
GET    /drivers
GET    /trips
GET    /events
GET    /dashboard/summary
```

---

# 📊 Data Flow

```text
Backend (FastAPI)
        ↓
API Client (Axios)
        ↓
React Components
        ↓
UI Rendering (Dashboard)
```

---

# 🧠 Future Enhancements

* Real-time updates (WebSockets)
* Advanced analytics
* AI-based insights
* Role-based access control
* Notifications system

---

# 🧪 Testing

Run:

```bash
npm run test
```

---

# 🚀 Deployment

Build project:

```bash
npm run build
```

Deploy using:

* Vercel
* Netlify
* AWS

---

# ⚠️ Important Notes

* Ensure backend is running before dashboard
* Keep API URLs consistent
* Use environment variables for production

---

# 👨‍💻 Contributors

* Project Team (Fleet Guard)

---

# 📄 License

This project is licensed under the MIT License.

---

# 🏁 Final Note

This dashboard is designed to be:

* Scalable
* Modular
* Real-time ready
* Industry-oriented

---
