#  Assessment

A modern React Native app assessment with clean UI, smooth animations, and live data from DummyJSON.  
Built to demonstrate practical engineering choices, structured architecture, and thoughtful UX.

---

## 🧰 Tech Stack & Architecture

**Framework:** React Native (Expo SDK 54)  
**Language:** TypeScript

### Core Libraries

- **Expo Router** – File-based navigation for modular routing
- **React Query** – Server state management (caching, pagination, retries)
- **Zustand** – Lightweight global store for auth and onboarding
- **Expo SecureStore** – Encrypted token storage
- **NativeWind (Tailwind CSS)** – Consistent, responsive styling

### Structure
```
app/
 ├── (auth)/          → Login and onboarding flow
 ├── (tabs)/          → Tab layout: Home, Orders, Profile
 ├── _layout.tsx      → Root layout configuration
components/           → Reusable UI components
hooks/                → Custom hooks for data and logic
lib/                  → Utilities and helpers
services/             → API service layer
store/                → Zustand state management
types/                → TypeScript type definitions
assets/               → Images, fonts, and static files
```

This layout separates concerns for better maintainability and scalability.

---

## Data Fetching Approach

**Library:** React Query  
**Source:** DummyJSON API
- **Pagination:** Infinite scroll (10 items per page)
- **Caching:** 5-minute lifetime with background refetch
- **Error Handling:** Toast messages and retry logic
- **Offline Support:** Cached reads for previously fetched data

### Why React Query?

- Handles cache, background updates, and pagination automatically
- Cleaner and more efficient than Redux or manual fetch patterns
- Reduces boilerplate while keeping strong control of loading and error states

```typescript
const { data, fetchNextPage, isLoading } = useInfiniteQuery({
  queryKey: ['products'],
  queryFn: ({ pageParam = 0 }) => fetchProducts(10, pageParam),
  getNextPageParam: (last) =>
    last.skip + last.limit < last.total ? last.skip + last.limit : undefined,
});
```

---

## Running the Project Locally

> **Note:** All run commands are configured in `package.json` scripts for convenience.

### Requirements

- Node.js 18+
- npm or yarn
- Expo CLI
- Android Studio or Xcode

### Steps

```bash
# 1. Clone repository
git clone https://github.com/jaymhorsh/leeta.git
cd leeta

# 2. Install dependencies
npm install

# 3. Build a development client (required for native modules)
npm run android
# or
npm run ios

# 4. Start development server
npm start
```

### Test Credentials

- **Username:** `emilys`
- **Password:** `emilyspass`

---

## Building for Production

> **All build commands are pre-configured in `package.json` scripts.**

### EAS Build Commands

```bash
# Development builds (for testing with native modules)
npm run build:dev:android
npm run build:dev:ios

# Preview builds (shareable APK/IPA for demos)
npm run build:preview:android
npm run build:preview:ios

# Production builds (for app stores)
npm run build:prod:android    # Android AAB for Play Store
npm run build:prod:ios         # iOS for App Store
npm run build:prod:apk         # Android APK for direct distribution
npm run build:all:prod         # Build both platforms

# Submit to app stores
npm run submit:android
npm run submit:ios
```

**Recommended for Assessment Demo:**
```bash
npm run build:preview:android
```
This creates a shareable APK that can be installed directly on devices without app store submission.

---
## Key Engineering Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| **Architecture** | File-based routing + modular folders | Easier scalability and clarity |
| **Server State** | React Query | Built-in caching and pagination |
| **Client State** | Zustand | Minimal setup, better DX |
| **Storage** | Expo SecureStore | Encrypted, production-ready |
| **Styling** | NativeWind | Tailwind syntax, responsive design |
| **Build Type** | Expo Dev Build | Required for SecureStore native module |

---

## Performance Optimizations

- Lazy image loading and placeholder states
- Virtualized FlatList for large data sets
- React.memo on list items
- Debounced search to reduce API hits
- Route-based code splitting with Expo Router

---

## Trade-offs & Known Limitations
| **Backend** | DummyJSON API only | No custom backend needed |
| **Offline Writes** | Read-only cache | React Query limitation |
| **i18n** | English only | Localization planned for later |
| **Unit Tests** | Skipped | Focused on UI and data flow within time limit
---

## Design & Interaction

- 3-step onboarding flow (goal, profile, currency)
- Animated welcome screen using Animated API with easing and spring interpolation
- Consistent spacing and typography with Matter font family
- Subtle transitions, touch feedback, and skeleton loaders
- Light theme with clear visual hierarchy

---

## Evaluation Summary

This project reflects:

- Clean UI and responsive design
- Strong data handling with React Query
- Secure and minimal global state management
- Thoughtful architecture for scalability
- Attention to micro-interactions and user flow

---

**Built by:** Jaymhorsh  
**Framework:** Expo + React Native + TypeScript  
**License:** MIT







