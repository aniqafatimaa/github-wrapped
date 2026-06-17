export default function ContributionHeatmap({ repos }) {
  if (!repos?.length) return null

  // Build a 52-week grid from repo update dates
  const today = new Date()
  const weeks = 26 // show 26 weeks (6 months)
  const days = weeks * 7

  // Count activity per day
  const activityMap = {}
  repos.forEach(repo => {
    const date = new Date(repo.updated_at).toISOString().split('T')[0]
    activityMap[date] = (activityMap[date] || 0) + 1
  })

  // Build grid data
  const grid = []
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const key = date.toISOString().split('T')[0]
    grid.push({
      date: key,
      count: activityMap[key] || 0,
      day: date.getDay(),
    })
  }

  // Split into weeks
  const weekGrid = []
  for (let i = 0; i < grid.length; i += 7) {
    weekGrid.push(grid.slice(i, i + 7))
  }

  // Get color based on activity level
  const getColor = (count) => {
    if (count === 0) return 'var(--gh-bg-tertiary)'
    if (count === 1) return 'var(--gh-green-1)'
    if (count === 2) return 'var(--gh-green-2)'
    if (count === 3) return 'var(--gh-green-3)'
    return 'var(--gh-green-4)'
  }

  const totalActive = Object.values(activityMap).length
  const maxActivity = Math.max(...Object.values(activityMap), 1)

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="heatmap-card gh-card">
      <h2 className="section-title">
        <span className="title-icon">▦</span>
        Contribution Activity
      </h2>

      <p className="heatmap-sub">
        {totalActive} active days in the last 6 months
      </p>

      <div className="heatmap-layout">
        {/* Day labels */}
        <div className="day-labels">
          {dayLabels.map((d, i) => (
            <span key={i} className="day-label">
              {i % 2 === 1 ? d : ''}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div className="heatmap-grid">
          {weekGrid.map((week, wi) => (
            <div key={wi} className="heatmap-week">
              {week.map((cell, di) => (
                <div
                  key={di}
                  className="heatmap-cell"
                  style={{ background: getColor(cell.count) }}
                  title={`${cell.date}: ${cell.count} update${cell.count !== 1 ? 's' : ''}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="heatmap-legend">
        <span className="legend-label">Less</span>
        {[0, 1, 2, 3, 4].map(level => (
          <div
            key={level}
            className="legend-cell"
            style={{ background: getColor(level) }}
          />
        ))}
        <span className="legend-label">More</span>
      </div>

      <style>{`
        .heatmap-card { padding: 20px; }
        .heatmap-sub {
          font-size: 13px;
          color: var(--gh-text-secondary);
          margin-bottom: 16px;
          margin-top: -12px;
        }
        .heatmap-layout {
          display: flex;
          gap: 4px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .day-labels {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding-top: 2px;
        }
        .day-label {
          font-size: 10px;
          color: var(--gh-text-muted);
          height: 13px;
          line-height: 13px;
          width: 24px;
        }
        .heatmap-grid {
          display: flex;
          gap: 3px;
        }
        .heatmap-week {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .heatmap-cell {
          width: 13px;
          height: 13px;
          border-radius: 2px;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .heatmap-cell:hover { opacity: 0.7; }
        .heatmap-legend {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 12px;
          justify-content: flex-end;
        }
        .legend-label {
          font-size: 11px;
          color: var(--gh-text-muted);
        }
        .legend-cell {
          width: 13px;
          height: 13px;
          border-radius: 2px;
        }
      `}</style>
    </div>
  )
}