export default function StreakStats({ user, repos }) {

  // Calculate stats from repos
  const totalCommitEstimate = repos.reduce((sum, repo) => {
    return sum + (repo.size > 0 ? 1 : 0)
  }, 0)

  // Find most recent repo
  const mostRecent = [...repos].sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  )[0]

  // Account age
  const joinYear = new Date(user.created_at).getFullYear()
  const currentYear = new Date().getFullYear()
  const yearsOnGitHub = currentYear - joinYear

  // Most productive day (simulated from repo data)
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const dayCounts = new Array(7).fill(0)
  repos.forEach(repo => {
    const day = new Date(repo.updated_at).getDay()
    dayCounts[day]++
  })
  const busiestDayIndex = dayCounts.indexOf(Math.max(...dayCounts))
  const busiestDay = days[busiestDayIndex]

  // Most active month
  const months = ['Jan','Feb','Mar','Apr','May','Jun',
                  'Jul','Aug','Sep','Oct','Nov','Dec']
  const monthCounts = new Array(12).fill(0)
  repos.forEach(repo => {
    const month = new Date(repo.updated_at).getMonth()
    monthCounts[month]++
  })
  const busiestMonthIndex = monthCounts.indexOf(Math.max(...monthCounts))
  const busiestMonth = months[busiestMonthIndex]

  const stats = [
    {
      icon: '📅',
      label: 'Member Since',
      value: joinYear,
      sub: `${yearsOnGitHub} year${yearsOnGitHub !== 1 ? 's' : ''} on GitHub`,
    },
    {
      icon: '📦',
      label: 'Public Repos',
      value: user.public_repos,
      sub: 'total repositories',
    },
    {
      icon: '⚡',
      label: 'Most Active Day',
      value: busiestDay,
      sub: 'based on repo activity',
    },
    {
      icon: '🗓️',
      label: 'Most Active Month',
      value: busiestMonth,
      sub: 'based on repo updates',
    },
    {
      icon: '🔥',
      label: 'Active Repos',
      value: totalCommitEstimate,
      sub: 'repos with content',
    },
    {
      icon: '🌟',
      label: 'Latest Repo',
      value: mostRecent?.name?.slice(0, 14) || 'N/A',
      sub: 'most recently updated',
    },
  ]

  return (
    <div className="streak-card gh-card">
      <h2 className="section-title">
        <span className="title-icon">~/</span>
        Activity Stats
      </h2>

      <div className="streak-grid">
        {stats.map((stat, i) => (
          <div key={i} className="streak-item">
            <span className="streak-icon">{stat.icon}</span>
            <span className="streak-value">{stat.value}</span>
            <span className="streak-label">{stat.label}</span>
            <span className="streak-sub">{stat.sub}</span>
          </div>
        ))}
      </div>

      <style>{`
        .streak-card { padding: 20px; }
        .streak-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .streak-item {
          background: var(--gh-bg-tertiary);
          border: 1px solid var(--gh-border);
          border-radius: var(--gh-radius);
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 4px;
          transition: border-color 0.2s;
        }
        .streak-item:hover {
          border-color: var(--gh-accent);
        }
        .streak-icon { font-size: 22px; }
        .streak-value {
          font-size: 22px;
          font-weight: 600;
          color: var(--gh-text-primary);
          font-family: var(--gh-font-mono);
        }
        .streak-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--gh-text-secondary);
        }
        .streak-sub {
          font-size: 11px;
          color: var(--gh-text-muted);
        }
        @media (max-width: 600px) {
          .streak-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  )
}