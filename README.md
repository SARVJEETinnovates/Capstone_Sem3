# Full-Stack Authentication App

A complete authentication system with React frontend and Express backend using Prisma ORM and Neon PostgreSQL database.

## Project Structure

```
├── backend/          # Express API server
│   ├── prisma/       # Prisma schema
│   └── src/          # Source code
└── frontend/         # React application
    └── src/          # Source code
```

## Setup Instructions

### 1. Database Setup (Neon)

1. Go to [Neon](https://neon.tech) and create a free account
2. Create a new project
3. Copy your connection string (it looks like: `postgresql://user:password@host/database?sslmode=require`)

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```
DATABASE_URL="your-neon-connection-string-here"
JWT_SECRET="your-secret-key-here"
PORT=5000
```

Run Prisma migrations:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## Features

- ✅ User signup with email and password
- ✅ User login with JWT authentication
- ✅ Protected dashboard route
- ✅ Beautiful gradient UI design
- ✅ Form validation
- ✅ Error handling
- ✅ Responsive design

## API Endpoints

- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user

## Tech Stack

**Backend:**
- Express.js
- Prisma ORM
- PostgreSQL (Neon)
- JWT for authentication
- bcryptjs for password hashing

**Frontend:**
- React
- React Router
- Vite
- CSS3 with animations
