# Triniti — Project Context

Staff Login:
- Email: staff@triniti.com
- Password: Test1234!

Family Login:
- Email: family@triniti.com
- Password: Test1234!

## 1. Project Overview

Triniti is a **React Native / Expo** mobile application designed for **nursing home management**. It provides two user-facing portals:

- **Staff (Nurse) View** — Nurses log in, browse a patient roster, and manage per-patient activity schedules (add, view, organize by date).
- **Family View** — Family members log in to view their loved one's profile and activities (planned, not yet implemented).

The app targets **iOS and Android** (portrait-only) via Expo, with a web fallback available through `expo start --web`.

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React Native | 0.74.5 |
| Platform tooling | Expo | ~51.0.28 |
| Language | JavaScript (ES6+) | — |
| Navigation | React Navigation (native-stack) | 6.x |
| Backend / Auth | Firebase (JS SDK) | ^10.13.0 |
| Firestore | Firebase Firestore (via `firebase` SDK) | — |
| Auth | Firebase Auth (`signInWithEmailAndPassword`) | — |
| Image handling | `expo-image` | ^1.12.15 |
| Gradient | `expo-linear-gradient` | ^13.0.2 |
| Fonts | `expo-font` (Nunito family) | ^12.0.9 |
| Date picker | `@react-native-community/datetimepicker` | ^8.2.0 |
| Icons | `@expo/vector-icons` (Ionicons, FontAwesome6, MaterialIcons) | bundled with Expo |
| Transpiler | Babel (`babel-preset-expo`) | ^7.20.0 |

> **Note:** `@react-native-firebase/app` and `@react-native-firebase/auth` are listed as dependencies but are **not imported anywhere** in the source code. The app exclusively uses the web-based `firebase` JS SDK.

---

## 3. Directory Structure

```
Triniti/
├── App.js                          # Root component — font loading + navigation stack
├── Firebase.js                     # Firebase init (app, Firestore, Auth) — gitignored
├── GlobalStyles.js                 # Design tokens (fonts, sizes, colors, borders)
├── package.json
├── app.json                        # Expo config (name, slug, splash, icons)
├── babel.config.js                 # Babel preset (babel-preset-expo)
├── .gitignore
│
├── assets/
│   ├── fonts/
│   │   ├── Nunito-Regular.ttf
│   │   ├── Nunito-Medium.ttf
│   │   └── Nunito-Bold.ttf
│   ├── start/
│   │   ├── welcome_image.png       # Welcome/splash illustration
│   │   └── whitelogo.png           # White Triniti logo
│   └── activity/
│       ├── breakfast.jpg            # Default image for new activities
│       └── karaoke.png             # Sample activity image
│
├── components/
│   ├── Header.js                   # Reusable top header bar
│   ├── NavBar.js                   # Bottom tab navigation bar
│   └── PatientButton.js            # Patient card for the dashboard grid
│
├── context/                        # Empty directory (placeholder for React Context)
│
└── pages/
    ├── authorization/
    │   ├── Start.js                # Landing page — Staff / Family login choice
    │   ├── StaffLogin.js           # Email/password login (Firebase Auth)
    │   └── FamilyLogin.js          # Login form (no auth backend yet)
    └── nurse/
        ├── Dashboard.js            # Patient grid with search, fetches from Firestore
        └── PatientProfile.js       # Per-patient schedule, add-activity modal
```

---

## 4. Routing & Navigation

The app uses a single **`NativeStackNavigator`** defined in `App.js`. All screen headers are hidden (`headerShown: false`); the app renders its own `Header` component.

### Registered Routes

| Route Name | Component | Status |
|---|---|---|
| `Start` (initial) | `Start.js` | Implemented |
| `StaffLogin` | `StaffLogin.js` | Implemented (Firebase Auth) |
| `FamilyLogin` | `FamilyLogin.js` | Implemented (UI only, no backend auth) |
| `Dashboard` | `Dashboard.js` | Implemented (Firestore fetch) |
| `PatientProfile` | `PatientProfile.js` | Implemented (hardcoded activities) |

### Referenced but Unregistered Routes

These route names appear in `navigation.navigate()` calls but have **no corresponding `<Stack.Screen>`** — navigating to them will crash:

| Route Name | Referenced In | Purpose |
|---|---|---|
| `FamPatientProfile` | `FamilyLogin.js:17` | Family-side patient profile |
| `AccountSettings` | `Header.js:23` | User account / settings page |
| `Activity` | `PatientProfile.js:227` | Individual activity detail view |
| `Calls` | `NavBar.js:20` | Calendar / calls tab |
| `Mood` | `NavBar.js:24` | Mood / analytics tab |
| `EditInfo` | `NavBar.js:32` | Patient info editing tab |

### Navigation Flow

```
Start
 ├── [Staff Login] → StaffLogin → (Firebase Auth) → Dashboard → PatientProfile
 │                                                                 ├── Activity*
 │                                                                 ├── Calls*
 │                                                                 ├── Mood*
 │                                                                 └── EditInfo*
 └── [Family Login] → FamilyLogin → FamPatientProfile*

 * = not yet implemented (will crash)
```

---

## 5. Authentication Flow

### Staff Login (`StaffLogin.js`)

1. User enters email + password.
2. `signInWithEmailAndPassword(auth, username, password)` is called via the Firebase JS SDK.
3. On success → `navigation.navigate('Dashboard')`.
4. On failure → error is logged to console (`console.error`). **No user-facing error message is displayed.**

### Family Login (`FamilyLogin.js`)

- Has the same form UI as Staff Login.
- `handleLogin` calls `navigation.navigate('FamPatientProfile')` directly — **no actual authentication occurs**.
- The `FamPatientProfile` route is not registered, so this will crash at runtime.

### Forgot Password / Create Account

Both login pages have "Forgot Password" and "Create Account" buttons that only `console.log` — **no functionality is implemented**.

---

## 6. Data Model & Backend

### Firebase Configuration (`Firebase.js`)

```js
const firebaseConfig = {
  apiKey: '...',
  authDomain: 'triniti-6dea8.firebaseapp.com',
  projectId: 'triniti-6dea8',
  storageBucket: 'triniti-6dea8.appspot.com',
  messagingSenderId: '...',
  appId: '...'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();        // Firestore instance
const auth = getAuth(app);        // Auth instance
export { db, auth };
```

This file is listed in `.gitignore` but **is currently tracked in git** (credentials are exposed in the repository history).

### Firestore Collections

**`users` collection** — queried in `Dashboard.js`:

```js
const querySnapshot = await getDocs(collection(db, 'users'));
const patientList = querySnapshot.docs.map((doc) => ({
  name: doc.data().name,    // string — patient display name
  image: doc.data().image   // string — URL to patient photo
}));
```

Expected document shape:
```json
{
  "name": "Jane Doe",
  "image": "https://example.com/photo.jpg"
}
```

### Activity Data

Activities in `PatientProfile.js` are **entirely hardcoded** as local state — they are not read from or written to Firestore. The add-activity modal updates local state only.

---

## 7. Reusable Components

### `Header` — `components/Header.js`

A blue header bar with left icon, title, and right icon.

| Prop | Type | Description |
|---|---|---|
| `headerName` | string | Center title text |
| `leftIconName` | string | Ionicons icon name (left side) |
| `rightIconName` | string | Ionicons icon name (right side) |

- Left icon navigates to `Dashboard`.
- Right icon navigates to `AccountSettings` (unregistered route).
- Background color: `Color.blue` (`#2f6be4`).
- Height: `18%` of screen.

### `NavBar` — `components/NavBar.js`

A bottom tab bar with four icon buttons. Absolutely positioned at the bottom of the screen.

| Prop | Type | Description |
|---|---|---|
| `navigation` | object | React Navigation object |
| `patientName` | string | Passed to each route as param |
| `specialIcon` | string | Icon name to highlight (dark blue) |

Tabs:
1. **Home** (FontAwesome6 `house`) → `PatientProfile`
2. **Calendar** (Ionicons `calendar`) → `Calls`*
3. **Analytics** (FontAwesome6 `chart-line`) → `Mood`*
4. **Person** (Ionicons `person-sharp`) → `EditInfo`*

*Routes marked with \* are not registered in the navigator.

### `PatientButton` — `components/PatientButton.js`

A card-style button for the patient grid on the Dashboard.

| Prop | Type | Description |
|---|---|---|
| `onPress` | function | Callback when pressed |
| `patientName` | string | Displayed at bottom of card |
| `image` | string (URI) | Patient photo URL |

Renders a 42%-width card with an `expo-image` photo on top and patient name below. Contains a `console.log(image)` debug statement.

---

## 8. Page Components

### `Start` — `pages/authorization/Start.js`

The landing screen. Displays:
- A welcome illustration (`welcome_image.png`)
- A blue gradient background with the white Triniti logo
- "Welcome" text
- Two buttons: **Staff Login** and **Family Login**

Uses `expo-image`, `expo-linear-gradient`, and absolute positioning with percentage-based layout (designed for ~430px width / ~932px height screens).

### `StaffLogin` — `pages/authorization/StaffLogin.js`

A centered login form with:
- Title: "Staff Login"
- Email (labeled "Username") and password text inputs
- Login button (blue `#007AFF`) — triggers Firebase auth
- "Forgot Password" and "Create Account" links (non-functional)

### `FamilyLogin` — `pages/authorization/FamilyLogin.js`

Identical layout to StaffLogin but:
- Title: "Family Login"
- Login navigates to `FamPatientProfile` (no auth)
- Link text color is blue (vs. black/underline-only in StaffLogin)

### `Dashboard` — `pages/nurse/Dashboard.js`

The main nurse view after login:
- `Header` with title "Dashboard"
- A search bar to filter patients by name
- A `ScrollView` grid of `PatientButton` cards
- Fetches patient list from Firestore `users` collection on mount
- Pressing a card navigates to `PatientProfile` with `{ patientName }` param

Background: `Color.blue` (`#2f6be4`), content area is a rounded white/gray card with shadow.

### `PatientProfile` — `pages/nurse/PatientProfile.js`

A per-patient schedule view:
- `Header` showing the patient's name
- ScrollView of activities grouped by date, with date headers and dividers
- Each activity shows a thumbnail image, title, and time range
- Pressing an activity navigates to `Activity` (unregistered route)
- **Floating Action Button** (blue circle, `+` icon) opens an add-activity modal
- Modal contains: title input, time picker, date picker, Add/Cancel buttons
- `NavBar` at the bottom with four tabs

Activities are **hardcoded local state** with sample data (Reading Books, Martha's Birthday Party, Karaoke Night, etc.). New activities added via the modal are stored in local state only.

---

## 9. State Management

The app uses **only local `useState`** hooks. There is no global state management:

- No Redux, Zustand, MobX, or similar libraries
- No React Context providers (the `context/` directory exists but is empty)
- No state persistence between screens (navigating away loses local state)

State patterns by screen:
| Screen | State Variables |
|---|---|
| StaffLogin | `username`, `password` |
| FamilyLogin | `username`, `password` |
| Dashboard | `searchQuery`, `patients` (fetched from Firestore) |
| PatientProfile | `activitiesGroupedByDate`, `modalVisible`, `newActivity`, `datePickerVisible`, `timePickerVisible` |

---

## 10. Styling & Design System

### Design Tokens (`GlobalStyles.js`)

```js
FontFamily = {
  nunitoRegular: 'Nunito-Regular',
  pageH1: 'Nunito-Bold',
  nunitoMedium: 'Nunito-Medium'
}

FontSize = {
  size_sm: 14,
  pageH1_size: 32,
  size_base: 16
}

Color = {
  colorWhite: '#fff',
  colorBlack: '#000',        // duplicated key
  minorText: 'rgba(0, 0, 0, 0.5)',
  blue: '#2f6be4'
}

Border = {
  br_mini: 15,
  br_21xl: 40
}
```

**Note:** `Color.colorBlack` is defined twice (duplicate key — the second overwrites the first, but both have the same value `'#000'`).

### Color Palette

| Name | Hex | Usage |
|---|---|---|
| Primary Blue | `#2f6be4` | Header background, FAB, dashboard bg |
| Gradient Blue (start) | `#2e88f3` | Start page gradient |
| Gradient Blue (end) | `#056eec` | Start page gradient, NavBar active icon |
| Button Blue | `#007AFF` | Login buttons |
| Nav Default | `#88b3ee` | NavBar inactive icons |
| White | `#FFFFFF` | Backgrounds, text on blue |
| Light Gray | `#f2f2f2` | Dashboard content area |
| Text Dark | `#333` | Activity titles |
| Text Gray | `#666` / `grey` | Activity times, date headers |

### Typography

- **Nunito** font family loaded via `expo-font` in `App.js`
- Three weights: Regular (400), Medium (500), Bold (700)
- Common sizes: 14px (small), 16px (base), 18px (activity titles), 24px (page titles), 34px (header), 48px (welcome)

### Layout Patterns

- Blue background behind rounded white content cards (`borderRadius: 40-45`)
- Drop shadows on content containers
- Absolute positioning with percentage-based layout (Start page)
- FlexBox grid for patient cards (42% width, wrap)

---

## 11. Assets

### Fonts (`assets/fonts/`)
- `Nunito-Regular.ttf` (~132 KB)
- `Nunito-Medium.ttf` (~132 KB)
- `Nunito-Bold.ttf` (~132 KB)

### Images (`assets/start/`)
- `welcome_image.png` (~194 KB) — Welcome screen illustration
- `whitelogo.png` (~8.5 KB) — White Triniti logo

### Activity Images (`assets/activity/`)
- `breakfast.jpg` (~1.6 MB) — Default image for new activities
- `karaoke.png` (~639 KB) — Sample activity thumbnail

### External Image URLs

`PatientProfile.js` hardcodes external URLs for some activity images:
- `neighborsdc.org` — Senior reading photo
- `images.pexels.com` — Caregiver/elderly photos (×2)
- `images.pexels.com` — Breakfast photo

---

## 12. Current Development Status

### Completed
- Project scaffolding with Expo 51
- Start/landing page with branded UI
- Staff login with Firebase email/password authentication
- Family login page (UI only)
- Dashboard with Firestore patient list fetch and search/filter
- Patient profile with hardcoded activity schedule
- Add-activity modal with date/time pickers
- Reusable Header and NavBar components
- PatientButton card component
- Global design tokens
- Custom Nunito font loading

### In Progress / Incomplete
- Family authentication (no backend auth wired up)
- Family-side patient profile view (`FamPatientProfile`)
- Activity detail view (`Activity` route)
- Calendar/Calls tab (`Calls` route)
- Mood/Analytics tab (`Mood` route)
- Patient info editing (`EditInfo` route)
- Account settings (`AccountSettings` route)
- Persisting activities to Firestore (currently local state only)
- Context-based global state management (`context/` directory is empty)

---

## 13. Known Issues & TODOs

### Security
- **Exposed Firebase credentials** — `Firebase.js` contains hardcoded API keys and is tracked in git history despite being in `.gitignore`. These credentials should be rotated and moved to environment variables.
- **No auth state persistence** — There is no `onAuthStateChanged` listener. If the app restarts, the user is not kept logged in and there are no route guards.
- **No route protection** — Any screen can be navigated to directly without authentication.

### Bugs & Code Issues
- **Unregistered routes will crash** — `FamPatientProfile`, `AccountSettings`, `Activity`, `Calls`, `Mood`, and `EditInfo` are navigated to but not defined in the stack navigator.
- **Duplicate key in `Color` object** — `colorBlack` is defined twice in `GlobalStyles.js` (lines 16 and 18).
- **Debug `console.log` statements** — Present in `PatientButton.js` (`console.log(image)`) and `Dashboard.js` (`console.log('hi')`).
- **Hardcoded dimensions** — The Start page uses pixel values (430px width, 932px height) that won't adapt to different screen sizes.
- **Search bar hardcoded width** — `Dashboard.js` search bar has `width: 372` (pixels), not responsive.
- **`getFirestore()` called without `app`** — In `Firebase.js`, `getFirestore()` is called without passing the `app` instance (works due to default app, but not explicit).
- **Unused imports** — `@react-native-firebase/app` and `@react-native-firebase/auth` in `package.json` are never imported.

### Missing Functionality
- No user-facing error messages on login failure (only `console.error`)
- "Forgot Password" and "Create Account" buttons are non-functional
- Activity data is not persisted to any database
- No logout functionality
- No loading indicators during Firestore fetches or auth operations
- No empty-state UI when no patients are returned
- No image fallback when patient photo URLs fail to load
