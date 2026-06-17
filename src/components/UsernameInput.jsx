import { useState } from 'react'

export default function UsernameInput({ onSearch }) {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim()) onSearch(value.trim())
  }

  return (
    <div className="input-page">

      {/* GitHub-style header */}
      <div className="input-header">
        <svg height="48" viewBox="0 0 16 16" width="48" className="gh-logo">
          <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 
          2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 
          0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
          -.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 
          2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 
          0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 
          .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 
          2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 
          2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 
          3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 
          0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          />
        </svg>
        <h1 className="input-title">GitHub Wrapped</h1>
        <p className="input-subtitle">
          Your year in code — beautifully visualized
        </p>
      </div>

      {/* Search form */}
      <form className="input-form" onSubmit={handleSubmit}>
        <div className={`input-wrapper ${focused ? 'focused' : ''}`}>
          <svg className="input-icon" viewBox="0 0 16 16" width="16" height="16">
            <path fillRule="evenodd" d="M10.5 5a4.5 4.5 0 11-9 0 
            4.5 4.5 0 019 0zm-.82 4.74a6 6 0 111.06-1.06l3.04 
            3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"/>
          </svg>
          <input
            className="gh-input"
            type="text"
            placeholder="Enter a GitHub username..."
            value={value}
            onChange={e => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoFocus
          />
        </div>
        <button
          className="gh-btn gh-btn-primary submit-btn"
          type="submit"
          disabled={!value.trim()}
        >
          Generate Wrapped
        </button>
      </form>

      {/* Example usernames */}
      <div className="input-examples">
        <span className="gh-text-muted">Try: </span>
        {['torvalds', 'gaearon', 'sindresorhus'].map(name => (
          <button
            key={name}
            className="example-chip"
            onClick={() => onSearch(name)}
          >
            @{name}
          </button>
        ))}
      </div>

      {/* Stats bar at bottom */}
      <div className="input-footer">
        <span className="gh-text-muted">
          Powered by GitHub REST API • No login required • Public profiles only
        </span>
      </div>

      <style>{`
        .input-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 16px;
          background: var(--gh-bg-primary);
        }
        .input-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .gh-logo {
          fill: var(--gh-text-primary);
          margin-bottom: 16px;
        }
        .input-title {
          font-size: 32px;
          font-weight: 600;
          color: var(--gh-text-primary);
          margin-bottom: 8px;
        }
        .input-subtitle {
          font-size: 16px;
          color: var(--gh-text-secondary);
        }
        .input-form {
          width: 100%;
          max-width: 440px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }
        .input-wrapper {
          display: flex;
          align-items: center;
          background: var(--gh-bg-primary);
          border: 1px solid var(--gh-border);
          border-radius: var(--gh-radius);
          padding: 0 12px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-wrapper.focused {
          border-color: var(--gh-accent);
          box-shadow: 0 0 0 3px var(--gh-accent-subtle);
        }
        .input-icon {
          fill: var(--gh-text-muted);
          margin-right: 8px;
          flex-shrink: 0;
        }
        .input-wrapper .gh-input {
          border: none;
          box-shadow: none;
          padding: 10px 0;
          font-size: 15px;
        }
        .input-wrapper .gh-input:focus {
          border: none;
          box-shadow: none;
        }
        .submit-btn {
          width: 100%;
          justify-content: center;
          padding: 10px;
          font-size: 15px;
          border-radius: var(--gh-radius);
        }
        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .input-examples {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 40px;
        }
        .example-chip {
          background: var(--gh-bg-secondary);
          border: 1px solid var(--gh-border);
          border-radius: 20px;
          padding: 4px 12px;
          color: var(--gh-text-link);
          font-size: 13px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          font-family: var(--gh-font-mono);
        }
        .example-chip:hover {
          background: var(--gh-bg-tertiary);
          border-color: var(--gh-accent);
        }
        .input-footer {
          position: absolute;
          bottom: 24px;
          text-align: center;
          font-size: 12px;
        }
      `}</style>
    </div>
  )
}