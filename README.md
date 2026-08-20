# HireFlow

Hiring workflow app with a Node.js backend and a React frontend.

## Project structure

```
HireFlow/
├── backend/          Node.js API
└── frontend/         Vite + React
```

### Backend (`backend/src`)

| Folder | Purpose |
| --- | --- |
| `config/` | Environment and app configuration |
| `controllers/` | Request handlers |
| `services/` | Business logic |
| `models/` | Data models |
| `routes/` | Route definitions |
| `middleware/` | Auth, errors, and shared request logic |
| `validators/` | Input validation |
| `utils/` | Shared helpers |
| `constants/` | App-wide constants |
| `app.js` | Application entry |

### Frontend (`frontend/src`)

| Folder | Purpose |
| --- | --- |
| `app/` | Root app shell |
| `components/` | Shared UI components |
| `features/` | Feature-specific modules |
| `pages/` | Page-level views |
| `layouts/` | Page layouts |
| `hooks/` | Custom React hooks |
| `services/` | API clients |
| `store/` | Client state |
| `types/` | Shared type notes / JSDoc types |
| `utils/` | Shared helpers |
| `routes/` | Route config |

## Setup

Requires Node.js.

MongoDB is also required. The project does not use Firebase or Supabase.

### Environment variables

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/hireflow
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_DAYS=1
REMEMBERED_REFRESH_TOKEN_DAYS=30
FRONTEND_ORIGIN=http://localhost:5173
NODE_ENV=development
```

Never commit `.env` or production secrets.

### Backend

```bash
cd backend
npm install
npm run dev
```

- `npm start` — run once
- `npm run dev` — run with file watching

### Frontend

```bash
cd frontend
npm install
npm run dev
```

- `npm run build` — production build
- `npm run preview` — preview the production build

The Vite frontend proxies `/api` requests to the backend during development. Start both processes in separate terminals.

## Current features

- JWT authentication with HTTP-only refresh-token cookies
- Candidate and recruiter role-based access control
- Responsive authenticated shell and navigation
- Recruiter job CRUD and open/close hiring status
- Candidate job search, filters, pagination, and job details
- Candidate applications and recruiter applicant review
- Application status workflow: applied, shortlisted, interview scheduled, rejected, selected
- Candidate saved jobs
- Candidate and recruiter profile management
- Role-specific dashboard metrics and activity
- Loading, empty, error, and retry states

## API overview

Authentication:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/me
```

Jobs:

```text
GET    /api/jobs
GET    /api/jobs/:id
GET    /api/jobs/mine              recruiter
POST   /api/jobs                   recruiter
PUT    /api/jobs/:id               recruiter, owner only
DELETE /api/jobs/:id               recruiter, owner only
PATCH  /api/jobs/:id/status        recruiter, owner only
```

Applications:

```text
POST  /api/applications             candidate
GET   /api/applications/my          candidate
GET   /api/applications/job/:jobId  recruiter, owner only
PATCH /api/applications/:id/status  recruiter, owner only
```

Dashboards and profiles:

```text
GET   /api/dashboard/candidate      candidate
GET   /api/dashboard/recruiter      recruiter
GET   /api/profile                  authenticated user
PUT   /api/profile                  authenticated user
GET   /api/profile/saved-jobs       candidate
PATCH /api/profile/saved-jobs/:id   candidate
```

Backend authorization is authoritative. Frontend route guards control navigation and visibility, while every protected API route verifies the JWT and role on the server.

## End-to-end workflow

```text
Register or log in
	-> Open the role-specific workspace
	-> Recruiter creates a job
	-> Candidate discovers and saves a job
	-> Candidate applies with a resume URL and cover letter
	-> Recruiter reviews the applicant
	-> Recruiter updates application status
	-> Candidate sees the updated status
```

## Validation

Frontend production build:

```bash
cd frontend
npm run build
```

Backend syntax check example:

```bash
cd backend
node --check src/app.js
```

## Remaining optional work

- Automated unit/integration tests
- Resume file storage instead of resume URLs
- Interview scheduling
- Password change and forgot-password flow
- Email verification
- Notifications and activity logs
- Seed data and deployment configuration

## Conventions

Commit messages follow [Commit_Writing_Guide.md](./Commit_Writing_Guide.md).
