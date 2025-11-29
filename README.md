# Nexo Spend Management System

## Overview
Nexo is a **MERN stack spend management system** designed for enterprise compliance and audit readiness.  
Key features:
- 🔑 Role‑based access (**Admin, Maker, Checker**)
- 🔐 Authentication lifecycle (Signup, Login, Forgot/Reset/Change Password)
- 📄 Invoice lifecycle (Maker submits, Checker approves/rejects with mandatory comments)
- 👥 User Management (Admin creates/updates/deactivates users)
- 📝 Audit logging (Admin actions + invoice events)
- 📊 Exportable audit reports (CSV/Excel)
- 📈 Dashboard widget with filters for recent audit events

---

## Tech Stack
- **Frontend:** React + Vite + TailwindCSS  
- **Backend:** Node.js + Express + MongoDB  
- **Auth:** JWT  
- **Deployment:** Docker Compose (MongoDB, server, client)

---

## Setup

### 1. Clone Repo
```bash
git clone https://github.com/your-org/nexo.git
cd nexo
```

### 2. Environment Variables

**server/.env**
```
PORT=4000
MONGO_URI=mongodb://localhost:27017/nexo
JWT_SECRET=supersecretkey
FRONTEND_URL=http://localhost:5173
```

**client/.env**
```
VITE_API_URL=http://localhost:4000/api
```

### 3. Run Locally

**Backend**
```bash
cd server
npm install
npm run dev
```

**Frontend**
```bash
cd client
npm install
npm run dev
```

Visit: `http://localhost:5173`

### 4. Docker Deployment
```bash
docker-compose up --build
```

Services:
- `mongo` → MongoDB  
- `server` → Express backend  
- `client` → React frontend  

---

## Roles
- **Admin:** Manage users, view/export audit logs, dashboard  
- **Maker:** Create & submit invoices  
- **Checker:** Approve/reject invoices (mandatory comment)  

---

## Audit Logging
- Admin actions (create/update/deactivate user) logged  
- Invoice events (create, submit, approve, reject) logged  
- Export logs: `/api/audit/admin/export/csv` or `/xlsx`  

---

## Project Structure
```
nexo/
├─ client/ (React + Vite + Tailwind)
│  └─ src/pages/auth, invoices, users, reports
├─ server/ (Express + MongoDB)
│  └─ src/models, routes, controllers, middleware, utils
├─ docker-compose.yml
└─ README.md
```

---

## Security
- Password policy enforced (min 8 chars, letters + numbers + special char)  
- JWT authentication  
- Role‑based access control  
- Audit trail for compliance  

---

## Next Steps
- CI/CD pipeline (GitHub Actions)  
- Scheduled audit report emails  
- Charts for audit trends  
```


