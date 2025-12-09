TruEstate — Retail Sales Management System

A full-stack sales analytics dashboard featuring:

🔍 Full-text search

🎯 Advanced filters

🔄 Sorting

📄 Pagination

📊 Clean, responsive UI

🚀 Deployed on Railway + Vercel

Designed with modular architecture, maintainability, and scalability.

🚀 Tech Stack
Backend
Tech	Usage
Node.js	Runtime
Express.js	REST API
MongoDB Atlas	Database
Railway	Deployment
Frontend
Tech	Usage
React 18	UI Framework
Vite	Dev/Build
Tailwind/CSS	Styling
Vercel	Deployment
🔎 Search

Full-text, case-insensitive search on:

Customer Name

Phone Number

Features

✔ Real-time
✔ Works with all filters
✔ Resets to page 1
✔ Uses regex for flexible matching

🎛️ Filters
Multi-Select

Regions

Genders

Categories

Tags

Payment Methods

Range Filters

Age range (ageMin, ageMax)

Date range (dateFrom, dateTo)

Behavior

✔ Combine together
✔ Empty filters ignored
✔ Invalid ranges auto-corrected

🔄 Sorting

Supported sort fields:

Field	Description
date	Newest → Oldest
quantity	High → Low
customerName	A → Z
Features

✔ Toggle direction (asc/desc)
✔ Preserves filters & pagination
✔ Visual indicators in UI

📄 Pagination

10 results per page (configurable)

Metadata returned:

{
  total,
  page,
  pageSize,
  totalPages,
  hasNextPage,
  hasPreviousPage
}

Behavior

✔ Works with search & filters
✔ Resets when query changes

🧩 API Endpoints
GET /api/sales/transactions

Supports query params:

search
regions
genders
ageMin
ageMax
categories
tags
paymentMethods
dateFrom
dateTo
sortBy
sortDir
page
pageSize


Example:

/api/sales/transactions?page=1&sortBy=date&sortDir=desc

GET /api/sales/filter-options

Returns dropdown values:

{
  regions: [],
  genders: [],
  categories: [],
  tags: [],
  paymentMethods: []
}

GET /health

Health check endpoint:

{
  "status": "OK",
  "message": "Server is running"
}

🧪 Setup Instructions
Backend
cd backend
npm install
npm run dev



Frontend
cd frontend
npm install
npm run dev



🏗️ Production Build
Backend
npm start

Frontend
npm run build


Output:
📁 frontend/dist

📁 Project Structure
truestate/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   └── index.js
│   ├── models/
│   ├── config/
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── Services/
│   │   └── App.jsx
│   ├── public/
│   └── index.html
│
└── docs/
    └── architecture.md

⭐ Features

✔ Full-text search
✔ Multi-select filters
✔ Range filters
✔ Sorting
✔ Pagination
✔ Loading & error states
✔ Responsive UI
✔ Clean architecture

🧠 Code Quality

Modular services layer

Separation of concerns

Graceful error handling

No global state libraries — pure React hooks

Component-scoped styling

📦 Deployment
Backend (Railway)

Environment variables:

NODE_ENV=production
PORT=4000
MONGO_URL=<your mongodb atlas url>
FRONTEND_URL=<your vercel url>

Frontend (Vercel)
VITE_API_URL=https://<your-railway-app>.up.railway.app/api/sales

🧭 Health Check

Visit:

👉 /health

If you see:

{
  "status": "OK"
}


Backend is correct.

📜 License

This project is developed as part of a TruEstate assignment.