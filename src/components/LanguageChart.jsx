import { useEffect, useRef } from 'react'
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js'

Chart.register(ArcElement, Tooltip, Legend, DoughnutController)

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Shell: '#89e051',
  Vue: '#41b883',
  default: '#8b949e',
}

export default function LanguageChart({ languages }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (!languages?.length) return

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext('2d')
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: languages.map(([lang]) => lang),
        datasets: [{
          data: languages.map(([, count]) => count),
          backgroundColor: languages.map(
            ([lang]) => LANG_COLORS[lang] || LANG_COLORS.default
          ),
          borderColor: '#161b22',
          borderWidth: 3,
          hoverOffset: 8,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.raw} repos`
            }
          }
        }
      }
    })

    return () => {
      if (chartInstance.current) chartInstance.current.destroy()
    }
  }, [languages])

  if (!languages?.length) return null

  const total = languages.reduce((sum, [, count]) => sum + count, 0)

  return (
    <div className="lang-card gh-card">
      <h2 className="section-title">
        <span className="title-icon">{'<>'}</span>
        Top Languages
      </h2>

      <div className="lang-layout">

        {/* Donut chart */}
        <div className="chart-wrapper">
          <canvas ref={chartRef} />
          <div className="chart-center">
            <span className="chart-center-num">{languages.length}</span>
            <span className="chart-center-label">languages</span>
          </div>
        </div>

        {/* Language list */}
        <div className="lang-list">
          {languages.map(([lang, count]) => {
            const pct = Math.round((count / total) * 100)
            const color = LANG_COLORS[lang] || LANG_COLORS.default
            return (
              <div key={lang} className="lang-item">
                <div className="lang-top">
                  <div className="lang-name-row">
                    <span
                      className="lang-dot"
                      style={{ background: color }}
                    />
                    <span className="lang-name">{lang}</span>
                  </div>
                  <span className="lang-pct">{pct}%</span>
                </div>
                <div className="lang-bar-bg">
                  <div
                    className="lang-bar-fill"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .lang-card { padding: 20px; }
        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--gh-text-primary);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .title-icon {
          color: var(--gh-accent);
          font-family: var(--gh-font-mono);
          font-size: 14px;
        }
        .lang-layout {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 32px;
          align-items: center;
        }
        .chart-wrapper {
          position: relative;
          width: 200px;
          height: 200px;
        }
        .chart-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          pointer-events: none;
        }
        .chart-center-num {
          display: block;
          font-size: 28px;
          font-weight: 600;
          color: var(--gh-text-primary);
          font-family: var(--gh-font-mono);
        }
        .chart-center-label {
          font-size: 11px;
          color: var(--gh-text-secondary);
        }
        .lang-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .lang-item { display: flex; flex-direction: column; gap: 4px; }
        .lang-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .lang-name-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .lang-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .lang-name {
          font-size: 13px;
          font-weight: 500;
          color: var(--gh-text-primary);
          font-family: var(--gh-font-mono);
        }
        .lang-pct {
          font-size: 12px;
          color: var(--gh-text-secondary);
          font-family: var(--gh-font-mono);
        }
        .lang-bar-bg {
          height: 4px;
          background: var(--gh-bg-tertiary);
          border-radius: 2px;
          overflow: hidden;
        }
        .lang-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.6s ease;
        }
        @media (max-width: 600px) {
          .lang-layout {
            grid-template-columns: 1fr;
          }
          .chart-wrapper { margin: 0 auto; }
        }
      `}</style>
    </div>
  )
}