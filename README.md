# Growfico - Your Digital Gardening Companion
<img width="720" height="1600" alt="LOGIN" src="https://github.com/user-attachments/assets/48e04145-b750-4676-a830-77f672e14a95" />
<img width="720" height="1600" alt="REGISTER" src="https://github.com/user-attachments/assets/45de14cc-ac09-4ccc-b211-caad34be8022" />

**Growfico** is a sophisticated React Native application designed to empower gardening enthusiasts. Whether you're a beginner looking for courses or an experienced gardener seeking quality products, Growfico provides a seamless, high-performance platform to manage and transform your green spaces.

---

## Key Features

- **Secure & Social Authentication**: Integrated with **Firebase** and **Google Sign-In**, offering both traditional and social login flows with smooth transitions.
- **Dynamic User Experience**: Personalized home screen with featured banners, intuitive search, and region-specific content.
- **Interactive Product Ecosystem**: Detailed product showcase featuring interactive carousels, filterable categories (FilterChips), and comprehensive product cards.
- **Educational Courses**: Curated gardening content and courses to help users develop their green thumb.
- **Integrated QR Code System**: Unique user-specific QR codes accessible via the profile screen, facilitating easy identification and integration with the Growfico ecosystem.
- **Advanced Navigation Flow**: Custom-built animated loading screens for login (`ProcessNav`) and logout (`ReleaseNav`) sequences, plus a robust error handling navigation (`ErrorNav`).
- **Real-Time Data Management**: Powered by **Redux-Saga** for complex asynchronous side effects (API, Auth, Products, Stocks, QR Codes).
- **Modern UI Architecture**: Built with a focus on aesthetics, utilizing custom **Poppins** typography and a rich library of reusable components.

---

## Tech Stack

### Core Framework
- **React Native (v0.83.1)**: Leveraging the latest features for a high-performance cross-platform experience.
- **TypeScript**: Full type safety across the application for better maintainability and developer experience.

### State Management & Side Effects
- **Redux & React-Redux**: Centralized state management for global application data.
- **Redux-Saga**: Handling complex asynchronous operations like authentication flows and multi-endpoint data fetching.
- **Redux-Persist**: Ensures state persistence across app restarts.
- **AuthContext**: Custom context provider for managing session-wide authentication states.

### Navigation
- **React Navigation (v7)**: 
  - **Stack Navigation**: Modularized stacks for Auth, Main, and specialized flows.
  - **Bottom Tabs**: Intuitive primary navigation for core app features.
  - **Custom Flow Controllers**: Specialized navigators for processing states and errors.

### Backend & Infrastructure
- **Firebase**: Powering authentication services.
- **RESTful API backend**: Managed via Docker for product, stock, user, and QR code data.
- **Google Sign-In**: Seamless third-party authentication integration.

### UI & UX Components
- **React Native Elements**: High-quality UI primitives.
- **Vector Icons**: Comprehensive iconography support via `react-native-vector-icons`.
- **Custom Typography**: Integrated Poppins font family (Thin to Black).
- **Interactive Modals**: Enhanced user feedback using custom modal components.

---

## Project Structure

```text
src/
├── App/                # Core Redux Logic
│   ├── actions.ts      # Action creators and type definitions
│   ├── api/            # API service layers (Auth, Products, QR Codes, etc.)
│   ├── reducers/       # State reducers (Auth, Products, etc.)
│   └── sagas/          # Side effect handlers (Redux-Saga)
├── assets/             # Static Assets
│   ├── fonts/          # Custom Poppins Font Family
│   └── images/         # Brand logos, banners, and UI decorations
├── components/         # Atomic & Molecular UI Components
│   ├── Banner.tsx      # Promotional banners
│   ├── FilterChips.tsx # Category filtering chips
│   ├── ProductCard.tsx # Detailed product displays
│   └── CustomSearchbar # Interactive search interface
├── navigations/        # Navigation Architecture
│   ├── AuthNav.tsx     # Authentication entry flows
│   ├── TabNav.tsx      # Main application dashboard
│   ├── ProcessNav.tsx  # Animated login transition
│   └── ReleaseNav.tsx  # Animated logout transition
├── screens/            # Application Screens
│   ├── auth/           # Login & Registration screens
│   ├── HomeScreen.tsx  # Landing dashboard
│   ├── ProductScreen   # Marketplace & Product details
│   ├── ProfileScreen   # User settings, Profile management & QR Code
│   └── CoursesScreen   # Educational content showcase
└── utils/              # System Utilities
    ├── AuthContext.tsx # Authentication state provider
    ├── image.ts        # Centralized image mapping
    └── types.ts        # Global TypeScript interfaces
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (>= 20)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- Android SDK / Xcode for iOS
- CocoaPods (for iOS)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/OyanibTech-iii/GrowficoMobile.git
   cd APPDEV_B_SY25226
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **iOS Specific Setup:**
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the App

- **Start Metro Bundler:**
  ```bash
  npm start
  ```

- **Run on Android:**
  ```bash
  npm run android
  ```

- **Run on iOS:**
  ```bash
  npm run ios
  ```

---

## API Integration

The application communicates with a REST API for dynamic content.
- **Base URL**: `http://127.0.0.1:8000/api`
- **Protected Endpoints**:
    - `POST /login`: JWT authentication.
    - `POST /register`: User onboarding.
    - `GET /products`: Real-time gardening catalog.
    - `GET /stocks`: Inventory tracking.
    - `GET /users`: Profile data retrieval.
    - `GET /user_qr_codes`: User-specific QR code retrieval.
    - `GET /courses`: Gardening courses and tutorials.

---

## Branding

Growfico features a nature-inspired design system:
- **Primary Color Palette**: Shades of Emerald and Forest Green.
- **Typography**: Poppins (Custom implementation for all font weights).
- **Visuals**: High-quality gardening imagery located in `src/assets/images/`.

---

## License

This project is private and intended for educational and developmental purposes.

---

*Growfico Founder - Pacifico M. Oyanib III*
