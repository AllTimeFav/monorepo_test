# React + Express Monorepo

A lightweight and robust monorepo setup using **npm workspaces**, **React** (with Vite & TypeScript), and **Express** (with TypeScript).

---

## Repository Structure

```text
├── apps/
│   ├── frontend/         # React 19 + Vite 6 + TypeScript client
│   └── backend/          # Express 5 + TypeScript API server
├── package.json          # Root workspace configuration & scripts
└── .gitignore
```

---

## Quick Start

### 1. Install Dependencies
All dependencies across the workspaces are managed from the root:
```bash
npm install
```

### 2. Run in Development Mode
Start both frontend and backend concurrently in one command:
```bash
npm run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

> **Note**: Vite is preconfigured with a development proxy so any frontend request to `/api/*` is automatically forwarded to the Express backend (`http://localhost:5000`).

---

## Available Scripts

Run these from the monorepo root:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs backend and frontend concurrently |
| `npm run dev:frontend` | Runs only the React frontend dev server |
| `npm run dev:backend` | Runs only the Express backend with hot-reload (`tsx watch`) |
| `npm run build` | Builds both frontend and backend for production |
| `npm run build:frontend` | Builds frontend production assets with Vite |
| `npm run build:backend` | Compiles backend TypeScript to `./dist` |
| `npm run start` | Runs the compiled backend server (`node dist/index.js`) |
| `npm run lint -w frontend` | Runs ESLint on frontend code |

---

## API Endpoints (Preconfigured)

- `GET /api/health` - Health check status
- `GET /api/message` - Sample JSON response consumed by frontend
