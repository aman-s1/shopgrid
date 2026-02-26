# ShopGrid – Modern E-Commerce Platform

A full-stack, responsive, and visually stunning e-commerce product catalog application. Built with a robust Node.js/Express backend and a dynamic React frontend using modern tooling and best practices.

## 🚀 Live Features

- **Storefront & Product Grid**: Beautifully designed product displays utilizing modern CSS and Tailwind for a responsive layout.
- **Authentication System**: Secure user registration and login with JWT and HTTP-only cookies.
- **Role-Based Access Control**:
  - **Users**: Can view, search, and navigate products.
  - **Admins**: Can add new products directly from the home UI via secure API endpoints.
- **Advanced Filtering & Search**: Category-based filtering and live text search integrated with backend caching for optimal performance.
- **Pagination**: Efficient server-side pagination handled gracefully on the frontend.
- **Comprehensive Testing**: Full suite of unit tests for frontend hooks/components (Jest + React Testing Library) and backend API routes (Jest + SuperTest).
- **Code Quality Checks**: Prettier and ESLint configured for both ends of the stack to enforce coding standards.

## 🛠️ Tech Stack

**Frontend:**
- React 19 (Hooks, Context API)
- TypeScript
- Vite
- Tailwind CSS v4
- React Router DOM
- Jest & React Testing Library

**Backend:**
- Node.js & Express 5
- TypeScript
- MongoDB & Mongoose
- JWT (JSON Web Tokens)
- bcryptjs for password hashing
- node-cache (API Caching)
- express-validator (Input Validation)
- Jest & SuperTest (Testing)

## 📁 Project Structure

```text
shopgrid/
├── backend/      # Express API Server, MongoDB Models, Routes & Controllers
└── frontend/     # React SPA, Tailwind Styling, Hooks, Page Layouts & Tests
```

## ⚙️ Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB Database (Local or MongoDB Atlas)

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (create a `.env` file based on `.env.example` if available, typically requiring `PORT`, `MONGODB_URI`, `JWT_SECRET`, and `FRONTEND_URL`).
4. Start the development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (create a `.env` file requiring `VITE_API_URL`).
4. Start the frontend Vite server:
   ```bash
   npm run dev
   ```

## ✅ Running Tests

**Backend Tests:**
```bash
cd backend
npm test
```

**Frontend Tests:**
```bash
cd frontend
npm test
```

## 🎨 Design Philosophy
The frontend utilizes a modern aesthetic with smooth micro-animations, glassmorphism elements, and a clean typography system, all custom-built around the Tailwind CSS framework to ensure an engaging customer experience.

<img width="1919" height="979" alt="Screenshot 2026-02-26 125415" src="https://github.com/user-attachments/assets/6efaf404-d2a6-41e2-95a2-b28804e9f5c0" />
<img width="1919" height="979" alt="Screenshot 2026-02-26 125358" src="https://github.com/user-attachments/assets/97ed5670-4bf6-42d6-a307-8165787be8b3" />
<img width="1919" height="976" alt="Screenshot 2026-02-26 125337" src="https://github.com/user-attachments/assets/1be9a64d-c7f3-4d72-a033-0092f9015ccf" />
<img width="1919" height="975" alt="Screenshot 2026-02-26 125320" src="https://github.com/user-attachments/assets/3f145c6e-2f01-4189-89e2-d683098ce3ce" />
