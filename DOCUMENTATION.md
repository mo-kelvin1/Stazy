# Stazy - Project Documentation

## 1. Project Overview

**Stazy** is a mobile booking application inspired by platforms like Airbnb. It allows users to browse available accommodations and book listings directly from their mobile devices.

Though still under development, Stazy aims to provide an intuitive interface for exploring housing options and will eventually support features like account management, host listings, and secure reservations.

### Project Goals
- Build a mobile app for booking accommodation.
- Design a clean and interactive user interface using React Native and Expo.
- Prepare the frontend to connect with a future backend API.

---

## 2. Code Documentation

### Folder Structure (Simplified)

```
Stazy/
├── .expo/             ← Expo-specific config (local use only)
├── .vscode/           ← VSCode settings (optional)
├── backend/           ← Placeholder for future backend API
├── node_modules/      ← Auto-installed dependencies
├── stazy/             ← Main frontend React Native application
├── .gitignore         ← Lists files to ignore in Git tracking
├── package-lock.json  ← Dependency lock file
├── README.md          ← Project readme file
```

### Frontend Stack
- **React Native** with Expo (cross-platform mobile app framework)
- **JavaScript** as the primary language
- **npm** for dependency management

### Key Files
- `App.js`: Root component that starts the mobile app
- `package.json`: Manages dependencies and scripts
- `.expo/`: Stores local device and server info (should not be shared)

---

## 3. Development & Deployment Process

### How to Run the Project Locally

#### Prerequisites
- Node.js & npm installed
- Expo CLI (optional):  
  ```bash
  npm install -g expo-cli
  ```
- Git clone of the repository

#### Steps
```bash
npm install
npx expo start
```

You can then scan the QR code with the Expo Go app on your phone or run it on an emulator.

---

### Planned Deployment
Stazy is currently in development and has not yet been deployed.

Future deployment plans may include:
- Hosting backend on platforms like **Render**, **Heroku**, or **Firebase Functions**
- Mobile app distribution via **Google Play Store** and **Apple App Store**

---

## 4. API Documentation (Planned)

Although the backend has not yet been implemented, the planned RESTful API routes are as follows:

| Endpoint           | Method | Description                       |
|-------------------|--------|-----------------------------------|
| `/api/register`   | POST   | Register a new user               |
| `/api/login`      | POST   | Authenticate user credentials     |
| `/api/listings`   | GET    | Fetch all available listings      |
| `/api/booking`    | POST   | Create a booking                  |
| `/api/user/:id`   | GET    | Fetch user account details        |

### API Notes
- All endpoints will use **JSON** request/response format.
- Authentication will likely use **JWT tokens** or **session cookies**.
- Full error handling and validation will be implemented in the backend phase.

---

## 5. Final Notes

- The current focus is on building the **frontend UI** using React Native.
- Backend functionality is planned but **not yet implemented**.
- The `.expo/` folder should be **excluded** from Git versioning.
- Keep `package-lock.json` under version control for consistent builds.
- Documentation is maintained in this `DOCUMENTATION.md` file for developer reference.

---