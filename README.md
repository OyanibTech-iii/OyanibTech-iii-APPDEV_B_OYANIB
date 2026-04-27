#  Growfico - Your Digital Gardening Companion

**Growfico** is a comprehensive React Native application designed to empower gardening enthusiasts. Whether you're a beginner looking for courses or an experienced gardener seeking quality products, Growfico provides a seamless platform to transform and manage your garden.

---

##  Key Features

- **Secure Authentication**: Integrated with **Firebase** and **Google Sign-In** for easy and secure access.
- **Dynamic Home Screen**: Personalized welcome messages and featured banners using a robust Redux-managed state.
- **Product Showcase**: Explore a wide range of gardening products with an interactive carousel and detailed product cards.
- **Gardening Courses**: Access educational content to help your garden thrive.
- **User Profiles**: Manage your personal information and preferences.
- **Multi-Region Support**: Features content tailored for local regions like Negros Oriental.
- **Offline-Ready State**: Powered by **Redux-Saga** and **Redux-Persist** for a consistent experience even without connectivity.

---

##  Tech Stack

### Frontend & Framework
- **React Native (v0.83.1)**: Building a cross-platform mobile experience.
- **TypeScript**: Ensuring type safety and better developer productivity.
- **React Navigation**: Seamless routing between Home, Product, and Course screens.

### State Management & Storage
- **Redux & React-Redux**: Centralized state management for application-wide data.
- **Redux-Saga**: Handling asynchronous side effects and API communication.
- **API-Driven Architecture**: All data is fetched and managed through the Symfony backend, ensuring a single source of truth without local persistence.

### Backend & Infrastructure
- **Symfony (PHP)**: Powering the RESTful API with robust security and data management.
- **Docker**: Containerized environment for consistent deployment and local development.
- **Firebase**: Integration for social authentication and cloud services.
- **MariaDB/MySQL**: Managed via Symfony/Docker for secure and scalable data storage.

### UI & UX
- **React Native Elements**: High-quality UI components for a consistent look.
- **Vector Icons**: Customizable icons to enhance navigation and visual appeal.
- **Lottie/Modals**: Engaging user feedback and interactive modals.
- **Poppins Font Family**: Custom typography for a modern and clean aesthetic.

### API Reference
The application integrates with a RESTful API to manage dynamic content and user data.
- **Base URL**: `http://127.0.0.1:8000/api` (Local Development)
- **Authentication**: JWT-based security for protected routes (`/products`, `/users`, `/stocks`).
- **Endpoints**:
    - `POST /login`: User authentication.
    - `POST /register`: New user registration.
    - `GET /products`: Fetching available gardening items.
    - `GET /stocks`: Real-time stock tracking.
    - `GET /users`: User directory and profile data.

---

## Project Structure

```text
src/
├── App/                # Redux store, actions, reducers, and sagas
├── assets/             # Images, custom Poppins fonts, and icons
├── components/         # Reusable UI components (CustomButton, Banner, etc.)
├── navigations/        # Navigation stacks (Auth, Main, Tab, Process)
├── screens/            # Application screens (Home, Profile, Product, Courses)
└── utils/              # Helper functions, routes, and image constants
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (>= 20)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- Android SDK / Xcode for iOS

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

3. **iOS Specific (macOS only):**
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

## Visuals & Branding

Growfico uses a natural, green-themed color palette to match its gardening focus.
- **Fonts**: Poppins (Regular, Medium, SemiBold, Bold)
- **Logos**: Located in `src/assets/images/`

---

## License

This project is private and intended for educational/developmental purposes.

---

*Growfico Founder - Pacifico M. Oyanib III*
