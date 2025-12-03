# Healio – Hospital Management System

A comprehensive MERN-based hospital management system with authentication, CRUD operations, advanced filtering, sorting, pagination, and analytics.

## 🏥 Project Overview

**Problem Statement:**  
Hospitals face challenges in managing patient records, appointments, billing, staff coordination, and inventory. Manual or outdated systems lead to errors, delays, poor record tracking, and administrative overload. Healio provides a centralized, efficient, and secure digital system to manage hospital operations.

**System Architecture:**  
Frontend → Backend (API) → Database

## ✨ Key Features

### Authentication & Authorization
- ✅ Secure JWT-based login/signup
- ✅ Role-based access control (admin/staff)
- ✅ Protected routes and API endpoints

### CRUD Operations
- ✅ Add, view, update, and delete patients
- ✅ Manage appointments with conflict prevention
- ✅ Generate and track billing records
- ✅ Complete data management system

### Advanced Features
- ✅ **Search:** Find patients, appointments, bills by name, ID, phone, date
- ✅ **Sorting:** Sort by name, date, age, status (ascending/descending)
- ✅ **Filtering:** Filter by status, date range, payment status
- ✅ **Pagination:** Navigate through records smoothly (10 per page)
- ✅ **Reports & Analytics:** Generate hospital summary reports

### Patient Management
- ✅ Complete patient profiles with contact info
- ✅ Track patient status (Active/Inactive)
- ✅ Search and filter patient records

### Appointment Scheduling
- ✅ Book, update, and cancel appointments
- ✅ Track appointment status (Pending/Confirmed/Cancelled)
- ✅ Filter by date and status

### Billing & Invoicing
- ✅ Generate bills with service details
- ✅ Track payment status (Paid/Pending/Overdue)
- ✅ Calculate revenue and pending amounts

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React.js, React Router, Vite |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (Neon) |
| **ORM** | Prisma |
| **Authentication** | JWT (JSON Web Token) |
| **Hosting** | Vercel (Frontend), Render (Backend), Neon (Database) |

## 📡 API Endpoints

| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/auth/signup` | POST | Register new user | Public |
| `/api/auth/login` | POST | Authenticate user | Public |
| `/api/patients` | GET | Fetch patients (search, sort, filter, paginate) | Authenticated |
| `/api/patients` | POST | Add new patient | Authenticated |
| `/api/patients/:id` | PUT | Update patient | Authenticated |
| `/api/patients/:id` | DELETE | Delete patient | Authenticated |
| `/api/appointments` | GET | Fetch appointments (search, sort, filter, paginate) | Authenticated |
| `/api/appointments` | POST | Create appointment | Authenticated |
| `/api/appointments/:id` | PUT | Update appointment | Authenticated |
| `/api/appointments/:id` | DELETE | Delete appointment | Authenticated |
| `/api/billing` | GET | Fetch bills (search, sort, filter, paginate) | Authenticated |
| `/api/billing` | POST | Create bill | Authenticated |
| `/api/billing/:id` | PUT | Update bill | Authenticated |
| `/api/billing/:id` | DELETE | Delete bill | Authenticated |
| `/api/reports/summary` | GET | Hospital summary report | Authenticated |

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16+)
- PostgreSQL database (Neon account)
- Git

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/SARVJEETinnovates/Capstone_Sem3.git
cd Capstone_Sem3/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
DATABASE_URL="your-neon-postgresql-connection-string"
JWT_SECRET="your-secret-key"
PORT=3001
```

4. Run Prisma migrations:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. Start the server:
```bash
npm run dev
```

Backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to frontend:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🌐 Live Deployment

- **Frontend:** Deployed on Vercel
- **Backend:** https://capstone-sem3-u392.onrender.com
- **Database:** Hosted on Neon (PostgreSQL)

## 📊 Project Requirements Checklist

### Backend ✅
- [x] Authentication and Authorization (JWT)
- [x] Create, Read, Update, Delete operations
- [x] Filtering by status, date, payment
- [x] Searching by name, phone, email
- [x] Sorting (ascending/descending)
- [x] Pagination (10 records per page)
- [x] Hosted on Render

### Database ✅
- [x] PostgreSQL (Relational)
- [x] Prisma ORM
- [x] Hosted on Neon

### Frontend ✅
- [x] React Router for multiple pages
- [x] Dynamic data fetching from API
- [x] Search, filter, sort functionality
- [x] Pagination component
- [x] Clean, minimal UI design
- [x] Hosted on Vercel

## 🎨 UI Features

- Clean white background with black text
- Minimal, professional design
- Responsive layout
- Smooth animations and transitions
- Modal dialogs for forms
- Status badges and icons
- Pagination controls
- Loading states

## 👥 Team

- **Developer:** Sarvjeet Yadav
- **Project:** Capstone Semester 3

## 📝 License

This project is created for educational purposes.

---

**Built with ❤️ using MERN Stack**
