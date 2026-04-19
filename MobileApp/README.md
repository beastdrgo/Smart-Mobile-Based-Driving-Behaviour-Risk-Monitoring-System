# Fleet Guard Mobile App

Mobile application for the **Smart Mobile-Based Driver Safety & Fleet Monitoring System**.

This app is designed for delivery and logistics drivers. It runs in the background during active shifts and uses smartphone sensors to monitor driving behavior, detect unsafe events, and send data to the backend for scoring and analytics.

---

## Project Purpose

The mobile app is the primary data collection layer of the system.

It handles:

- Driver login
- Shift start / end
- Background GPS tracking
- Accelerometer and gyroscope data collection
- Unsafe driving event detection
- Safety score support
- Backend API communication
- Notifications and alerts

---

## Main Features Planned

### Authentication
- Driver login
- Session handling

### Shift Management
- Start shift
- End shift
- Track active working hours

### Sensor Monitoring
- GPS speed tracking
- Accelerometer monitoring
- Gyroscope monitoring

### Event Detection
- Harsh braking
- Overspeeding
- Sharp turns
- Sudden acceleration
- Crash-like motion events

### Driver Dashboard
- Live speed
- Trip status
- Event count
- Daily / monthly score summary

### Notifications
- Safety alerts
- Shift reminders
- Monthly performance notifications

---

## Tech Stack

- **Flutter** – cross-platform mobile app framework
- **Dart** – programming language
- **Geolocator** – GPS and speed tracking
- **Sensors Plus** – accelerometer and gyroscope
- **Permission Handler** – runtime permissions
- **HTTP** – API communication
- **Shared Preferences** – local storage
- **Flutter Background Service** – background execution
- **Firebase Messaging** *(optional)* – notifications

---

## Project Structure

```text
mobile_app/
│── lib/
│   │── main.dart
│   │
│   │── screens/
│   │   │── login_screen.dart
│   │   │── home_screen.dart
│   │   │── trip_screen.dart
│   │
│   │── services/
│   │   │── api_service.dart
│   │   │── location_service.dart
│   │   │── sensor_service.dart
│   │   │── background_service.dart
│   │
│   │── models/
│   │   │── driver_model.dart
│   │   │── trip_model.dart
│   │   │── event_model.dart
│   │
│   │── widgets/
│   │   │── custom_button.dart
│   │   │── info_card.dart
│   │
│   │── utils/
│   │   │── constants.dart
│   │   │── helpers.dart
│
│── pubspec.yaml
│── README.md