# 🚗 Smart Mobile-Based Driving Behaviour and Risk Monitoring System

A smart and cost-effective system to monitor driving behaviour and assess driver risk using smartphone sensors and optional IoT-based motion sensing.

---

## 📌 Overview

Road accidents are often caused by unsafe driving behaviours such as harsh braking, rapid acceleration, overspeeding, and sharp turning. Existing monitoring systems often rely on expensive hardware or vehicle-integrated solutions, making them less accessible and harder to deploy at scale.

This project provides a **mobile-first solution** that uses built-in smartphone sensors along with an optional IoT motion tag to detect risky driving patterns and compute a driver safety score in real time.

---

## 🎯 Objectives

- Capture real-time data using smartphone sensors such as GPS, accelerometer, and gyroscope
- Detect unsafe driving events:
  - Harsh braking
  - Rapid acceleration
  - Sharp turns
  - Overspeeding
- Compute a **Safety Score (0–100)** for each trip
- Store trip and event data for analysis
- Provide trip summary and driver feedback
- Support future enhancements like pothole detection, anomaly detection, and accident replay

---

## 🧩 System Architecture

```text
Mobile Sensors / IoT Device
            ↓
   Data Collection Layer
            ↓
   Event Detection Engine
            ↓
     Risk Scoring System
            ↓
        Backend API
            ↓
   Dashboard & Analytics

🏗️ Project Structure
smart-driving-risk-monitoring-system/
│
├── mobile-app/        # Flutter mobile application
├── backend/           # FastAPI backend services
├── dashboard/         # Web dashboard (React / HTML / JS)
├── docs/              # Documentation, reports, diagrams
├── README.md
└── .gitignore
⚙️ Tech Stack
📱 Mobile App
Flutter (Dart)
Sensors:
Accelerometer
Gyroscope
GPS
⚙️ Backend
FastAPI (Python)
REST APIs
Database:
SQLite / PostgreSQL / MongoDB
🌐 Dashboard
React / HTML / JavaScript
Chart libraries:
Chart.js / Recharts
🔌 IoT (Optional)
ESP32 (BLE)
IMU sensor (accelerometer + gyroscope)
🚀 Features
✅ Core Features
Real-time sensor data capture
Driving event detection
Risk scoring system
Trip tracking and summary
Event logging
Driver-wise analytics
🔮 Advanced Features (Future Scope)
Pothole and road anomaly detection
Accident detection with black-box replay (last 30–60 sec)
Self-learning adaptive thresholds
Driver performance analytics dashboard
Risk heatmaps and visualization
BLE-based IoT motion tag integration
🧠 Event Detection Logic
Harsh Braking → sudden negative acceleration
Rapid Acceleration → sudden positive acceleration
Sharp Turns → high angular velocity from gyroscope
Overspeeding → GPS speed exceeds threshold
📊 Risk Scoring System
Initial score: 100
Deduction based on events:
Harsh braking → -5
Rapid acceleration → -5
Sharp turn → -3
Overspeeding → -10
Risk Classification
Low Risk
Medium Risk
High Risk
🔄 Workflow
Driver logs into the mobile app
Driver starts a trip
Mobile captures sensor data in real time
System processes and filters raw sensor data
Driving events are detected dynamically
Risk score is updated based on detected events
Data is stored locally and synced to backend
Trip summary and analytics are generated
🔗 API Endpoints (Planned)
POST /start-trip → Start a trip
POST /end-trip → End a trip
POST /event → Send detected event data
GET /summary → Get trip summary
GET /driver/:id → Get driver analytics
GET /reports → Get dashboard reports
⚡ Setup Instructions
Clone Repository
git clone https://github.com/YOUR-USERNAME/smart-driving-risk-monitoring-system.git
cd smart-driving-risk-monitoring-system
📱 Mobile App (Flutter)
cd mobile-app
flutter pub get
flutter run
⚙️ Backend (FastAPI)
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
🌐 Dashboard
cd dashboard
npm install
npm start
🔀 Git Workflow
Main Branches
main → Stable production-ready code
dev → Development and integration branch
Feature Branches
feature/mobile-app
feature/backend
feature/dashboard
feature/logic-testing
Workflow
Create a feature branch
Work on assigned module
Commit changes with meaningful messages
Push to GitHub
Create Pull Request to dev
Test and review
Merge stable code into main
Example Commit Messages
feat: added accelerometer sensor integration
feat: implemented overspeed detection
fix: corrected GPS speed calculation
docs: updated README and architecture
👥 Team Members
Mohammed Afzal – Team Lead
Pranav K U
Sujay S G
Gagan Deep P K

Guide: Prof. Roopa G K

📅 Project Timeline
Phase 1: Repository setup and sensor integration
Phase 2: Event detection and risk scoring
Phase 3: Backend API and database integration
Phase 4: Dashboard and analytics
Phase 5: Advanced features and testing
📈 Applications
Fleet management systems
Delivery and logistics monitoring
Taxi and transport safety analysis
Driver training and performance evaluation
Road condition monitoring and anomaly reporting
📌 Expected Outcome
A functional mobile-based driving behaviour monitoring system
Real-time detection of unsafe driving events
Accurate risk scoring and trip analysis
Improved driving safety awareness
A scalable base for future fleet intelligence features
🔮 Future Enhancements
AI-based driving pattern prediction
Emergency alert and response system
Black-box replay for accident support
Pothole and rough-road map generation
Driver-specific self-learning thresholds
Cloud-based analytics and reporting

📄 License

This project is developed for academic purposes.

🙌 Acknowledgement

Developed as part of the B.E. CSE (Data Science) Major Project at
Vivekananda College of Engineering & Technology, Puttur.


This matches your project plan and synopsis direction closely. :contentReference[oaicite:0]{index=0} :contentReference[oaicite:1]{index=1}
