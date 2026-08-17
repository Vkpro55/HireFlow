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

## Conventions

Commit messages follow [Commit_Writing_Guide.md](./Commit_Writing_Guide.md).
