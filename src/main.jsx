import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

// GitHub Pages serves the site under /3D_portfolio/, so the router must strip
// that prefix to match your /about, /projects … routes. Vite replaces
// import.meta.env.BASE_URL with the configured base at build time, so this
// always stays in sync with vite.config.js.
const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary showDebug={false}>
      <BrowserRouter basename={BASENAME}>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)