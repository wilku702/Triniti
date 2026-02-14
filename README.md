# Triniti

A mobile application for nursing home management, built with React Native and Expo.

## About

Triniti streamlines communication and care coordination in nursing homes by providing dedicated portals for staff and family members. Nurses can manage patient rosters and track daily activity schedules, while family members can stay connected with their loved one's care.

## Features

- **Staff Authentication** — Secure email/password login powered by Firebase Auth
- **Patient Dashboard** — Scrollable grid of patient cards with real-time search and filtering
- **Activity Scheduling** — Per-patient daily schedule view with the ability to add new activities via date and time pickers
- **Family Portal** — Dedicated login and interface for family members
- **Branded UI** — Custom design system with Nunito typography, consistent color palette, and reusable components

## Tech Stack

| Technology | Purpose |
|---|---|
| React Native 0.74 | Cross-platform mobile framework |
| Expo 51 | Build tooling, dev server, and native APIs |
| Firebase | Authentication and Firestore database |
| React Navigation 6 | Native stack-based screen navigation |
| expo-image | Performant image rendering |
| expo-linear-gradient | Gradient backgrounds |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) or use `npx`
- iOS Simulator (macOS) or Android Emulator, or the Expo Go app on a physical device

### Installation

```bash
git clone https://github.com/<your-username>/Triniti.git
cd Triniti
npm install
```

### Running the App

```bash
npx expo start        # Start the dev server
npx expo start --ios  # Launch on iOS simulator
npx expo start --android  # Launch on Android emulator
npx expo start --web  # Open in browser
```

## Project Structure

```
Triniti/
├── App.js                 # Root component — font loading and navigation stack
├── GlobalStyles.js        # Design tokens (fonts, colors, sizes, borders)
├── Firebase.js            # Firebase configuration (gitignored)
├── components/            # Reusable UI components (Header, NavBar, PatientButton)
├── pages/
│   ├── authorization/     # Login screens (Start, StaffLogin, FamilyLogin)
│   ├── nurse/             # Staff-facing screens (Dashboard, PatientProfile, etc.)
│   └── family/            # Family-facing screens
└── assets/
    ├── fonts/             # Nunito font files
    ├── start/             # Welcome screen images and logo
    └── activity/          # Activity thumbnail images
```
