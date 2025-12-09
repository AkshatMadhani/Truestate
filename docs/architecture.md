Truestate Architecture Documentation
Overview

The system is a full-stack application designed to display and manage retail sales transactions with powerful:

Search

Filtering

Sorting

Pagination

Statistics

The architecture follows a clean separation between:

✔ Frontend (React + Vite)
✔ Backend (Node.js + Express)
✔ Database (MongoDB Atlas)

🔷 High-Level Architecture
┌──────────────────────────┐
│  Client Browser          │
└───────────────┬─────────┘
                │ HTTPS (REST API)
┌───────────────▼─────────┐
│ Frontend (Vercel)        │
│ React + Vite             │
└───────────────┬─────────┘
                │ API Calls
                │ https://backend/api/sales
┌───────────────▼─────────┐
│ Backend (Railway)        │
│ Node.js + Express        │
└───────────────┬─────────┘
                │ Mongo Driver
┌───────────────▼─────────┐
│ Database (MongoDB Atlas) │
└──────────────────────────┘

🔷 Backend Architecture
Tech Stack
Component	Technology
Runtime	Node.js
Web Framework	Express.js
Database	MongoDB Atlas
Deployment	Railway
Structure
backend/
├── src/
│   ├── controllers/        // Handle requests/responses
│   ├── services/           // Business logic & DB queries
│   ├── models/             // Mongoose schemas
│   ├── routes/             // API endpoints
│   └── index.js            // App entry point
├── .env                    // Config
└── package.json

Key Endpoints
Method	Endpoint	Purpose
GET	/api/sales/transactions	Fetch paginated data
GET	/api/sales/filter-options	Fetch filter dropdown values
GET	/health	Health check
🔷 Frontend Architecture
Tech Stack
Component	Technology
Framework	React 18
Build Tool	Vite
Deployment	Vercel
Styling	CSS
Structure
frontend/
├── src/
│   ├── components/        // UI Components
│   ├── hooks/             // Custom React hooks
│   ├── Services/          // API calls
│   ├── utils/             // Helpers
│   └── App.jsx
├── public/
└── index.html

🔷 Data Flow

User interacts with filters/search/table

Frontend creates query parameters

API call → Backend /api/sales/transactions

Backend:

Builds Mongo query

Fetches data

Applies sort & pagination

JSON returned to frontend

UI updates

🔷 Environment Variables
Backend (.env)
NODE_ENV=production
PORT=4000
MONGO_URL=your-atlas-connection-string
FRONTEND_URL=https://your-frontend.vercel.app

Frontend (.env)
VITE_API_URL=https://your-backend-url.up.railway.app/api/sales

🔷 Deployment
Frontend → Vercel

Commands:

cd frontend
npm install
npm run build


Environment:

VITE_API_URL=https://your-backend-url/api/sales

Backend → Railway

Commands:

cd backend
npm install
npm start


Environment:

NODE_ENV=production
PORT=4000
MONGO_URL=your-atlas-url
FRONTEND_URL=https://vercel-url

🔷 API Examples
Fetch Transactions
GET /api/sales/transactions?page=1&pageSize=10&sortBy=date&sortDir=desc

Fetch Filters
GET /api/sales/filter-options

🔷 Security

✔ CORS enabled
✔ Environment variables only (no secrets in code)
✔ MongoDB user limited to read/write
✔ Sanitized input & error handling
✔ Express validation

🔷 Future Enhancements

Authentication & RBAC

Export CSV/Excel

Advanced analytics

Debounced search

Redis caching

Live updates

📌 Summary

This solution is:

Modular

Scalable

Fast

Secure

Deployment-ready

Both frontend and backend are independently deployable, connected via REST APIs, with MongoDB Atlas as persistent storage.