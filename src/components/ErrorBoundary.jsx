import { Component } from 'react'

/** Catches render errors so the site shows a friendly message instead of a blank screen. */
export default class ErrorBoundary extends Component {
  state = { error: null, info: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    this.setState({ info })
    console.error('[Charvi World] render error:', error, info)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div
        className='fixed inset-0 flex flex-col items-center justify-center overflow-auto p-8 text-center'
        style={{ background: 'linear-gradient(160deg,#3d1146 0%,#6d227f 60%,#f97316 130%)' }}
      >
        <p className='font-display text-6xl font-bold text-cream'>🌋</p>
        <h1 className='mt-4 font-display text-3xl font-bold text-cream md:text-4xl'>
          The world hiccuped
        </h1>
        <p className='mt-3 max-w-md font-body text-base font-semibold text-cream/80'>
          Something went wrong while rendering this page. Reload to try entering again.
        </p>
        {this.props.showDebug && (
          <pre className='mt-6 max-h-40 max-w-md overflow-auto rounded-xl bg-black/30 p-4 text-left font-body text-xs text-lake-200'>
            {String(this.state.error && this.state.error.message)}
          </pre>
        )}
        <button
          onClick={() => window.location.reload()}
          className='mt-8 rounded-full bg-cream px-8 py-3 font-display text-base font-bold text-plum-800 shadow-soft'
        >
          Reload the world
        </button>
      </div>
    )
  }
}