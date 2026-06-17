import { toPng } from 'html-to-image'
import { useState } from 'react'

export default function ExportButton({ username }) {
  const [exporting, setExporting] = useState(false)
  const [done, setDone] = useState(false)

  const handleExport = async () => {
    setExporting(true)
    setDone(false)

    const node = document.getElementById('stats-export')

    try {
      // Save original styles
      const originalWidth = node.style.width
      const originalMaxWidth = node.style.maxWidth
      const originalOverflow = node.style.overflow
      const bodyOriginalOverflow = document.body.style.overflow
      const htmlOriginalOverflow = document.documentElement.style.overflow

      // Force full width rendering - remove constraints
      node.style.width = 'auto'
      node.style.maxWidth = 'none'
      node.style.overflow = 'visible'
      document.body.style.overflow = 'visible'
      document.documentElement.style.overflow = 'visible'

      // Wait for layout to settle
      await new Promise(resolve => setTimeout(resolve, 500))

      // Get actual rendered dimensions
      const width = Math.ceil(node.scrollWidth)
      const height = Math.ceil(node.scrollHeight)

      console.log('Exporting dimensions:', { width, height })

      const dataUrl = await toPng(node, {
        cacheBust: true,
        backgroundColor: '#0d1117',
        pixelRatio: 2,
        width: width,
        height: height,
        style: {
          width: width + 'px',
          margin: '0',
          padding: '32px 16px',
          maxWidth: 'none',
          overflow: 'visible',
        }
      })

      // Restore original styles
      node.style.width = originalWidth
      node.style.maxWidth = originalMaxWidth
      node.style.overflow = originalOverflow
      document.body.style.overflow = bodyOriginalOverflow
      document.documentElement.style.overflow = htmlOriginalOverflow

      // Download
      const link = document.createElement('a')
      link.download = `${username}-github-wrapped.png`
      link.href = dataUrl
      link.click()

      setDone(true)
      setTimeout(() => setDone(false), 3000)

    } catch (err) {
      console.error('Export failed:', err)
      alert('Export failed — try again!')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="export-wrapper">
      <button
        className={`export-btn ${done ? 'done' : ''}`}
        onClick={handleExport}
        disabled={exporting}
      >
        {exporting ? (
          <>
            <span className="export-spinner" />
            Generating image...
          </>
        ) : done ? (
          <>✅ Downloaded!</>
        ) : (
          <>
            <svg viewBox="0 0 16 16" width="16" height="16"
              className="export-icon">
              <path fillRule="evenodd" d="M7.47 10.78a.75.75 0
              001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L8.75
              8.44V1.75a.75.75 0 00-1.5 0v6.69L4.78 5.97a.75.75
              0 00-1.06 1.06l3.75 3.75zM3.75 13a.75.75 0 000
              1.5h8.5a.75.75 0 000-1.5h-8.5z"/>
            </svg>
            Export as PNG
          </>
        )}
      </button>
      <p className="export-hint">
        Share your GitHub Wrapped on LinkedIn, Twitter or anywhere!
      </p>

      <style>{`
        .export-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 32px 16px;
        }
        .export-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          background: var(--gh-accent);
          color: #ffffff;
          border: none;
          border-radius: var(--gh-radius);
          font-size: 15px;
          font-weight: 600;
          font-family: var(--gh-font);
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }
        .export-btn:hover:not(:disabled) {
          background: var(--gh-accent-hover);
          transform: translateY(-1px);
        }
        .export-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .export-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .export-btn.done {
          background: var(--gh-success);
        }
        .export-icon { fill: #ffffff; }
        .export-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .export-hint {
          font-size: 12px;
          color: var(--gh-text-muted);
        }
      `}</style>
    </div>
  )
}