import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

interface ApiResponse {
  message?: string
  status?: string
  timestamp?: string
}

function App() {
  const [count, setCount] = useState(0)
  const [apiData, setApiData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [serverOnline, setServerOnline] = useState<boolean | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const checkBackendHealth = async () => {
    setLoading(true)
    setErrorMsg(null)
    try {
      const res = await fetch('/api/health')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setServerOnline(true)
      setApiData(data)
    } catch (err: unknown) {
      setServerOnline(false)
      const message = err instanceof Error ? err.message : 'Failed to connect to backend'
      setErrorMsg(message)
    } finally {
      setLoading(false)
    }
  }

  const fetchBackendMessage = async () => {
    setLoading(true)
    setErrorMsg(null)
    try {
      const res = await fetch('/api/message')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setServerOnline(true)
      setApiData(data)
    } catch (err: unknown) {
      setServerOnline(false)
      const message = err instanceof Error ? err.message : 'Failed to connect to backend'
      setErrorMsg(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkBackendHealth()
  }, [])

  return (
    <div className="monorepo-container">
      <header className="monorepo-header">
        <div className="logos-row">
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="tech-logo vite" alt="Vite logo" />
          </a>
          <span className="plus">+</span>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="tech-logo react" alt="React logo" />
          </a>
          <span className="plus">+</span>
          <div className="express-badge">
            <span>EXPRESS</span>
          </div>
        </div>

        <h1>Monorepo Workspace</h1>
        <p className="subtitle">
          React 19 Frontend + Express 5 Backend powered by npm workspaces
        </p>
      </header>

      <main className="content-grid">
        {/* API Connection Tester */}
        <section className="card api-card">
          <div className="card-header">
            <div className="title-with-pill">
              <h2>Express Backend API</h2>
              <span
                className={`status-pill ${
                  serverOnline === true
                    ? 'online'
                    : serverOnline === false
                    ? 'offline'
                    : 'checking'
                }`}
              >
                <span className="pulse-dot"></span>
                {serverOnline === true
                  ? 'Online (:5000)'
                  : serverOnline === false
                  ? 'Offline / Connecting'
                  : 'Checking...'}
              </span>
            </div>
            <p>Direct communication via Vite dev proxy (<code>/api/*</code> &rarr; <code>http://localhost:5000</code>)</p>
          </div>

          <div className="api-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={fetchBackendMessage}
              disabled={loading}
            >
              {loading ? 'Requesting...' : 'Fetch /api/message'}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={checkBackendHealth}
              disabled={loading}
            >
              Check /api/health
            </button>
          </div>

          {errorMsg && (
            <div className="api-error">
              <span>⚠️ Backend not reachable: {errorMsg}</span>
              <small>Make sure backend is running with <code>npm run dev</code> or <code>npm run dev:backend</code></small>
            </div>
          )}

          {apiData && (
            <div className="json-viewer">
              <div className="json-header">Response Payload</div>
              <pre>{JSON.stringify(apiData, null, 2)}</pre>
            </div>
          )}
        </section>

        {/* Counter demo */}
        <section className="card">
          <h2>React State & HMR</h2>
          <p>Client-side interactive state with React 19 and Vite HMR:</p>
          <div className="counter-box">
            <button
              type="button"
              className="counter-btn"
              onClick={() => setCount((c) => c + 1)}
            >
              Count: <span className="counter-val">{count}</span>
            </button>
          </div>
        </section>

        {/* Workspaces overview */}
        <section className="card full-width">
          <h2>Monorepo Architecture</h2>
          <div className="packages-grid">
            <div className="package-item">
              <div className="pkg-badge">apps/frontend</div>
              <h3>React Client</h3>
              <ul>
                <li>React 19 & React DOM</li>
                <li>Vite 6 Bundler & Dev Server</li>
                <li>TypeScript 5.8</li>
                <li>API Proxy to Backend</li>
              </ul>
            </div>

            <div className="package-item">
              <div className="pkg-badge backend-pkg">apps/backend</div>
              <h3>Express Server</h3>
              <ul>
                <li>Express 5 REST API</li>
                <li>TypeScript with tsx hot-reload</li>
                <li>CORS & dotenv configured</li>
                <li>Ready for routes & controllers</li>
              </ul>
            </div>

            <div className="package-item">
              <div className="pkg-badge root-pkg">Root Monorepo</div>
              <h3>npm Workspaces</h3>
              <ul>
                <li><code>npm run dev</code> - Run both apps</li>
                <li><code>npm run build</code> - Build all</li>
                <li><code>npm run dev:frontend</code></li>
                <li><code>npm run dev:backend</code></li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
