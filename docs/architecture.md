# Truestate — Architecture Documentation

## OVERVIEW

Truestate is a full-stack Retail Sales Management System with:

- Search
- Filtering
- Sorting
- Pagination
- Statistics

Architecture layers:

- Frontend (React + Vite)
- Backend (Node.js + Express)
- Database (MongoDB Atlas)

---

## HIGH LEVEL ARCHITECTURE

┌──────────────────────────┐
│       Client Browser     │
└───────────────┬─────────┘
                │ HTTPS REST API
┌───────────────▼─────────┐
│   Frontend (Vercel)     │
│   React + Vite          │
└───────────────┬─────────┘
                │ API Calls (fetch)
┌───────────────▼─────────┐
│   Backend (Railway)     │
│   Node.js + Express     │
└───────────────┬─────────┘
                │ Mongo Driver
┌───────────────▼─────────┐
│   MongoDB Atlas         │
└─────────────────────────┘

---

## BACKEND ARCHITECTURE

Tech Stack:
- Node.js
- Express.js
- MongoDB Atlas
- Railway (deployment)

Directory Structure:

backend/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   └── index.js
├── .env
└── package.json

Endpoints:
GET /api/sales/transactions
GET /api/sales/filter-options
GET /health

---

## FRONTEND ARCHITECTURE

Tech Stack:
- React 18
- Vite
- CSS
- Vercel (deployment)

Directory Structure:

frontend/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   └── App.jsx
├── public/
└── index.html

---

## DATA FLOW

User -> UI interaction  
↓  
Frontend builds query params  
↓  
GET /api/sales/transactions  
↓  
Backend:
- Builds Mongo query
- Applies filters
- Applies sort
- Applies pagination

↓  
Returns JSON  
↓  
Frontend renders data

---

## ENVIRONMENT VARIABLES

Backend (.env):

NODE_ENV=production
PORT=4000
MONGO_URL=your-mongodb-atlas-url
FRONTEND_URL=https://your-frontend.vercel.app

Frontend (.env):

VITE_API_URL=https://your-backend.up.railway.app/api/sales

---

## DEPLOYMENT

Frontend (Vercel):

cd frontend
npm install
npm run build

Env:
VITE_API_URL=https://your-backend-url/api/sales

Backend (Railway):

cd backend
npm install
npm start

Env:
NODE_ENV=production
PORT=4000
MONGO_URL=your-atlas-url
FRONTEND_URL=https://vercel-url

---

## API EXAMPLES

Fetch Transactions:
GET /api/sales/transactions?page=1&pageSize=10&sortBy=date&sortDir=desc

Fetch Filter Options:
GET /api/sales/filter-options

---

## SECURITY

- CORS enabled
- Environment variables used
- Mongo DB user limited to read/write
- Sanitized input
- Proper error handling

---

## FUTURE ENHANCEMENTS

- Authentication & RBAC
- Export CSV/Excel
- Analytics
- Debounced search
- Redis caching
- Live updates

---

## REPOSITORY STRUCTURE

truestate/
├── backend/
├── frontend/
├── docs/
│   └── architecture.md
└── README.md

---

## SUMMARY

This application is:

- Modular
- Scalable
- Fast
- Secure
- Production-ready

Frontend runs on Vercel.
Backend runs on Railway.
MongoDB hosted on Atlas.

