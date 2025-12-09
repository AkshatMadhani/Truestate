```
# TruEstate — Retail Sales Management System

A full-stack sales analytics dashboard featuring:

- 🔍 Full-text search
- 🎯 Advanced filters
- 🔄 Sorting
- 📄 Pagination
- 📊 Clean, responsive UI
- 🚀 Deployed on Railway + Vercel

Designed with modular architecture, maintainability, and scalability.

---

## 🚀 Tech Stack

### Backend

| Tech         | Usage        |
|-------------|--------------|
| Node.js     | Runtime      |
| Express.js  | REST API     |
| MongoDB     | Database     |
| Railway     | Deployment   |

### Frontend

| Tech       | Usage        |
|-----------|--------------|
| React 18  | UI Framework |
| Vite      | Dev/Build    |
| CSS       | Styling      |
| Vercel    | Deployment   |

---

## 🔎 Search

Full-text, case-insensitive search on:

- Customer Name
- Phone Number

Features:

✔ Real-time  
✔ Works with all filters  
✔ Resets to page 1  
✔ Regex-based matching

---

## 🎛️ Filters

### Multi-Select Filters

- Regions
- Genders
- Categories
- Tags
- Payment Methods

### Range Filters

- Age Range (ageMin, ageMax)
- Date Range (dateFrom, dateTo)

**Behavior:**

✔ Combine together  
✔ Empty filters ignored  
✔ Invalid ranges auto-corrected

---

## 🔄 Sorting

### Supported fields:

| Field        | Description          |
|-------------|----------------------|
| date        | Newest → Oldest      |
| quantity    | High → Low           |
| customerName| A → Z                |

Features:

✔ Toggle direction (asc/desc)  
✔ Preserves filters & pagination  
✔ Visual indicators in UI

---

## 📄 Pagination

10 results per page (configurable)

Pagination metadata:

```
{
  total,
  page,
  pageSize,
  totalPages,
  hasNextPage,
  hasPreviousPage
}
```

Behavior:

✔ Works with search & filters  
✔ Resets when query changes

---

## 🧩 API Endpoints

### GET /api/sales/transactions

Supports query params:

- search
- regions
- genders
- ageMin, ageMax
- categories
- tags
- paymentMethods
- dateFrom, dateTo
- sortBy, sortDir
- page, pageSize

**Example:**

```
/api/sales/transactions?page=1&sortBy=date&sortDir=desc
```

---

### GET /api/sales/filter-options

Returns:

```
{
  regions: [],
  genders: [],
  categories: [],
  tags: [],
  paymentMethods: []
}
```

---

### GET /health

Health check:

```
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## 🧪 Setup Instructions

### Backend

```
cd backend
npm install
npm run dev
```

### Frontend

```
cd frontend
npm install
npm run dev
```

---

## 🏗️ Production Build

### Backend

```
npm start
```

### Frontend

```
npm run build
```

Output:

```
📁 frontend/dist
```

---

## 📁 Project Structure

```
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
│   │   ├── services/
│   │   └── App.jsx
│   ├── public/
│   └── index.html
│
└── docs/
    └── architecture.md
```

---

## ⭐ Features

✔ Full-text search  
✔ Multi-select filters  
✔ Range filters  
✔ Sorting  
✔ Pagination  
✔ Loading & error states  
✔ Responsive UI  
✔ Clean architecture

---

## 🧠 Code Quality

- Modular service layer
- Separation of concerns
- Graceful error handling
- Pure React hooks (no state libraries)
- Component-scoped styling

---

## 📦 Deployment

### Backend (Railway)

Environment variables:

```
NODE_ENV=production
PORT=4000
MONGO_URL=
FRONTEND_URL=
```

### Frontend (Vercel)

```
VITE_API_URL=https://<railway-url>.up.railway.app/api/sales
```

---

## 🧭 Health Check

Visit:

```
/health
```

If you see:

```
{ "status": "OK" }
```

Backend is correct.

---

## 📜 License

This project is developed as part of a TruEstate assignment.
```
