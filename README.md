# SmartSciAR

**Science Learning, Reimagined** — An Augmented Reality mobile app that brings Physics, Chemistry, and Biology concepts to life with interactive 3D models, AI-powered tutoring, quizzes, and text-to-speech for students of Classes 6–12.

Built with **React Native** + **Expo SDK 54**, powered by **Firebase** and **Google Gemini AI**.

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Available Scripts](#available-scripts)
- [Navigation Flow](#navigation-flow)
- [Data & Content](#data--content)
- [Architecture](#architecture)
- [Building for Production](#building-for-production)
- [Permissions](#permissions)
- [Contributing](#contributing)
- [License](#license)

---

## Features

| Feature | Description |
|---------|-------------|
| **3D Model Viewer** | Embedded Sketchfab 3D models for 66 science topics across Physics (28), Chemistry (19), and Biology (19) |
| **AR Mode** | Camera-overlay AR experience — view 3D models in your real environment using the device camera |
| **AI Chatbot** | Topic-scoped AI assistant powered by Google Gemini 2.5 Flash — ask questions about any model and get instant, curriculum-focused answers |
| **Interactive Quizzes** | 5-question multiple-choice quizzes for 26 models (130 total questions) with scoring, review, and retry |
| **Text-to-Speech** | Listen to model descriptions read aloud using native speech synthesis (expo-speech) |
| **User Authentication** | Email/password sign-up and login with Firebase Auth, profile management with Firestore |
| **Kid-Friendly UI** | Warm, colorful, light-themed interface with playful gradients, emojis, and large touch targets designed for young learners |
| **Animated Splash Screen** | Custom warp-tunnel animation with orbiting rings on app launch |
| **Cross-Platform** | Runs on Android and iOS via Expo |

---

## Screenshots

> Add your app screenshots here.
>
> Suggested: Splash Screen, Home Screen, Physics Model List, 3D Model Viewer, AR Mode, Quiz, AI Chat, Profile

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React Native 0.81 + Expo SDK 54 |
| **Navigation** | React Navigation (Stack Navigator) |
| **Authentication** | Firebase Auth (email/password) with AsyncStorage persistence |
| **Database** | Cloud Firestore (user profiles) |
| **AI** | Google Generative AI — Gemini 2.5 Flash |
| **3D Models** | Sketchfab embeds via react-native-webview |
| **AR Camera** | expo-camera (CameraView) with WebView overlay |
| **Text-to-Speech** | expo-speech |
| **Animations** | React Native Animated API + react-native-animatable |
| **Styling** | expo-linear-gradient, custom StyleSheet themes |
| **Build** | EAS Build (Expo Application Services) |

---

## Project Structure

```
SmartSciAr_new/
├── App.js                    # Root — AuthProvider + Stack Navigator
├── app.json                  # Expo configuration
├── eas.json                  # EAS Build profiles
├── metro.config.js           # Metro bundler config (Firebase CJS fix)
├── package.json              # Dependencies & scripts
│
├── assets/                   # App icons, splash image, local model files
│   └── models/
│       └── CellModel/        # GLTF cell model asset
│
├── components/
│   ├── ModelViewer.js        # 3D model WebView, description, TTS, quiz entry
│   ├── QuizModal.js          # Full-screen quiz UI with scoring & review
│   └── ARModelViewer.js      # Camera + WebView AR overlay experience
│
├── context/
│   └── AuthContext.js        # Firebase Auth + Firestore context provider
│
├── data/
│   ├── physicsData.js        # 28 physics models (titles, descriptions, Sketchfab URLs)
│   ├── chemistryData.js      # 19 chemistry models
│   ├── biologyData.js        # 19 biology models
│   └── quizData.js           # 130 quiz questions (26 models × 5 questions)
│
├── screens/
│   ├── SplashScreen.js       # Animated warp-tunnel splash
│   ├── WelcomeScreen.js      # Onboarding — Login / Sign Up / Guest
│   ├── LoginScreen.js        # Email/password sign-in
│   ├── SignupScreen.js       # Account creation with name & class
│   ├── HomeScreen.js         # Subject selector hub (Physics / Chemistry / Biology)
│   ├── ProfileScreen.js      # User profile view & edit
│   ├── PhysicsScreen.js      # Physics topic list
│   ├── ChemistryScreen.js    # Chemistry topic list
│   ├── BiologyScreen.js      # Biology topic list
│   ├── PhysicsModelScreen.js # Physics model detail + AR / AI entry
│   ├── ChemistryModelScreen.js
│   ├── BiologyModelScreen.js
│   └── AIChatScreen.js       # AI chatbot (Gemini-powered)
│
└── services/
    └── aiService.js          # Google Generative AI wrapper
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** (comes with Node)
- **Expo CLI**: `npm install -g expo-cli`
- **EAS CLI** (for builds): `npm install -g eas-cli`
- **Expo Go** app on your phone (for development testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/SmartSciAR.git
cd SmartSciAR

# Install dependencies
npm install

# Start the development server
npx expo start
```

Scan the QR code with **Expo Go** (Android) or the Camera app (iOS) to run on your device.

---

## Environment Setup

The app uses two external services that require API keys:

### Firebase

Firebase is configured in `context/AuthContext.js`. To use your own Firebase project:

1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Email/Password Authentication**
3. Create a **Cloud Firestore** database
4. Copy your web app config and update the `firebaseConfig` object in `AuthContext.js`

### Google Gemini AI

The AI chatbot is powered by Google Gemini. To set up:

1. Get an API key from [Google AI Studio](https://aistudio.google.com/apikey)
2. Update the API key in `services/aiService.js`

### Metro Configuration

The project includes a custom `metro.config.js` to resolve Firebase CJS module compatibility issues with Expo SDK 54+:

```javascript
config.resolver.sourceExts.push("cjs");
config.resolver.unstable_enablePackageExports = false;
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npx expo start` | Start the Expo development server |
| `npx expo start --clear` | Start with cleared Metro cache |
| `npx expo install --check` | Check dependency version compatibility |
| `eas build --platform android` | Build Android APK/AAB via EAS |
| `eas build --platform ios` | Build iOS archive via EAS |

---

## Navigation Flow

```
Splash Screen
    ↓
Welcome Screen
    ├── Login Screen → Home Screen
    ├── Signup Screen → Home Screen
    └── Continue as Guest → Home Screen
                              ↓
                    ┌─────────┼─────────┐
                    ↓         ↓         ↓
              Physics    Chemistry   Biology
              Screen      Screen     Screen
                 ↓           ↓         ↓
             Model Screen (per topic)
                 ├── 3D Model Viewer (WebView)
                 ├── AR Mode (Camera + 3D Overlay)
                 ├── AI Chat (Gemini)
                 ├── Quiz Modal (5 questions)
                 └── Listen (Text-to-Speech)

            Home Screen → Profile Screen
```

---

## Data & Content

### 3D Models

All 3D models are sourced from **Sketchfab** and rendered via embedded WebViews. Each model entry includes:

- **Title** — Display name of the concept
- **Description** — Detailed educational description
- **Sketchfab URL** — Embed link for the 3D model

| Subject | Models | Examples |
|---------|--------|----------|
| **Physics** | 28 | Cartesian Sign Convention, Focal Ray Refraction in Lenses, Magnetic Field Lines, Electric Motor, Human Eye, Solar System |
| **Chemistry** | 19 | Water Molecule, Benzene Structure, Diamond Crystal, Sodium Chloride Lattice, Periodic Table, Atomic Orbitals |
| **Biology** | 19 | Animal Cell, Plant Cell, Human Heart & Lungs, Digestive System, DNA Double Helix, Neuron, Human Skeleton |

### Quizzes

- **130 questions** across 26 models (Physics: 8, Chemistry: 9, Biology: 9)
- 5 multiple-choice questions per model
- Instant scoring with answer review
- Subject-themed UI (blue for Physics, green for Chemistry, pink for Biology)

### AI Chatbot

- Powered by **Google Gemini 2.5 Flash**
- Strictly scoped to the selected science topic
- Curriculum-aligned answers for Classes 6–12
- Handles off-topic detection gracefully

---

## Architecture

### State Management
- **React Context** (`AuthContext`) for authentication state and user profiles
- **React Hooks** (`useState`, `useEffect`, `useRef`) for local component state
- **Animated API** for smooth transitions and entrance animations

### Authentication Flow
1. Firebase `onAuthStateChanged` listener monitors auth state
2. User profiles stored in Firestore `users/{uid}` collection
3. Auth persistence via `@react-native-async-storage/async-storage`
4. Guest mode available (skips authentication)

### AR Implementation
The AR experience uses a layered approach:
1. `expo-camera` provides the live camera feed as background
2. A `react-native-webview` overlays the Sketchfab 3D model with a transparent background
3. This creates an AR-like experience without requiring native AR frameworks

### 3D Model Rendering
Models are rendered using Sketchfab's embed API inside a WebView with custom parameters:
- Auto-start enabled
- UI controls hidden for clean viewing
- Transparent background for AR mode
- Responsive sizing to fill available screen space

---

## Building for Production

### EAS Build

The project uses **Expo Application Services (EAS)** for cloud builds.

```bash
# Install EAS CLI
npm install -g eas-cli

# Log in to your Expo account
eas login

# Build for Android
eas build --platform android --profile production

# Build for iOS
eas build --platform ios --profile production
```

### Build Profiles (eas.json)

| Profile | Distribution | Use Case |
|---------|-------------|----------|
| `development` | Internal | Development client for testing |
| `preview` | Internal | Internal testing builds |
| `production` | Store | Production builds with auto-incrementing version |

---

## Permissions

The app requires the following device permissions:

| Permission | Reason |
|-----------|--------|
| `INTERNET` | Firebase, Sketchfab 3D models, AI API calls |
| `ACCESS_NETWORK_STATE` | Network connectivity checks |
| `CAMERA` | AR mode camera feed |

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the **0BSD License** — see the [package.json](package.json) for details.

---

<p align="center">
  <b>SmartSciAR</b> — Making science fun and interactive for young learners
</p>
