import ContributionHeatmap from './ContributionHeatmap'
import LanguageChart from './LanguageChart'
import RepoHighlights from './RepoHighlights'
import StreakStats from './StreakStats'
import ExportButton from './ExportButton'

export default function StatsCard({ data, loading, error, username, onReset }) {

  if (loading) return (
    <div className="loading-screen">
      <div className="loading-spinner" />
      <p className="loading-text">Fetching <strong>@{username}</strong>'s GitHub story...</p>
      <p className="gh-text-muted" style={{marginTop: 8}}>Analyzing repos, languages & contributions</p>
    </div>
  )

  if (error) return (
    <div className="error-screen">
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">User not found</h2>
      <p className="gh-text-muted">
        Could not find GitHub user <strong>@{username}</strong>
      </p>
      <button className="gh-btn gh-btn-primary" onClick={onReset}
        style={{marginTop: 24}}>
        Try another username
      </button>
    </div>
  )

  if (!data) return null

  const { user, languages, topRepos, totalStars, totalForks } = data

  return (
    <div className="stats-page">

      {/* Top navigation bar - GitHub style */}
      <div className="stats-navbar">
        <div className="navbar-left">
          <svg height="24" viewBox="0 0 16 16" width="24" className="gh-logo-sm">
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
            0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          <span className="navbar-title">GitHub Wrapped</span>
        </div>
        <button className="gh-btn" onClick={onReset}>
          ← Search again
        </button>
      </div>

      {/* Main content */}
      <div className="stats-content" id="stats-export" style={{maxWidth:'900px',margin:'0 auto'}}>

        {/* Profile header */}
        <div className="profile-header gh-card">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="profile-avatar"
          />
          <div className="profile-info">
            <h1 className="profile-name">{user.name || user.login}</h1>
            <p className="profile-login">@{user.login}</p>
            {user.bio && <p className="profile-bio">{user.bio}</p>}
            <div className="profile-meta">
              {user.location && (
                <span className="meta-item">📍 {user.location}</span>
              )}
              {user.company && (
                <span className="meta-item">🏢 {user.company}</span>
              )}
              <span className="meta-item">
                👥 {user.followers} followers · {user.following} following
              </span>
            </div>
          </div>
        </div>

        {/* Quick stats row */}
        <div className="quick-stats">
          <div className="stat-box gh-card">
            <span className="stat-number">{user.public_repos}</span>
            <span className="stat-label">Repositories</span>
          </div>
          <div className="stat-box gh-card">
            <span className="stat-number">{totalStars}</span>
            <span className="stat-label">Total Stars ⭐</span>
          </div>
          <div className="stat-box gh-card">
            <span className="stat-number">{totalForks}</span>
            <span className="stat-label">Total Forks 🍴</span>
          </div>
          <div className="stat-box gh-card">
            <span className="stat-number">{user.followers}</span>
            <span className="stat-label">Followers</span>
          </div>
        </div>

        {/* Language chart */}
        <LanguageChart languages={languages} />

        {/* Streak stats */}
        <StreakStats user={user} repos={data.repos} />

        {/* Contribution heatmap */}
        <ContributionHeatmap repos={data.repos} />

        {/* Top repos */}
        <RepoHighlights repos={topRepos} />

      </div>

      {/* Export button */}
      <ExportButton username={username} />

      <style>{`
        .stats-page {
          min-height: 100vh;
          background: var(--gh-bg-primary);
        }
        .stats-navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-bottom: 1px solid var(--gh-border);
          background: var(--gh-bg-secondary);
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .navbar-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .gh-logo-sm { fill: var(--gh-text-primary); }
        .navbar-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--gh-text-primary);
        }
        .stats-content {
  width: 860px;
  margin: 0 auto;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
        .profile-header {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }
        .profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 2px solid var(--gh-border);
          flex-shrink: 0;
        }
        .profile-name {
          font-size: 22px;
          font-weight: 600;
          color: var(--gh-text-primary);
        }
        .profile-login {
          font-size: 16px;
          color: var(--gh-text-secondary);
          margin-top: 2px;
        }
        .profile-bio {
          font-size: 14px;
          color: var(--gh-text-secondary);
          margin-top: 8px;
        }
        .profile-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 10px;
        }
        .meta-item {
          font-size: 13px;
          color: var(--gh-text-secondary);
        }
        .quick-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .stat-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 16px;
          text-align: center;
        }
        .stat-number {
          font-size: 28px;
          font-weight: 600;
          color: var(--gh-text-primary);
          font-family: var(--gh-font-mono);
        }
        .stat-label {
          font-size: 12px;
          color: var(--gh-text-secondary);
          margin-top: 4px;
        }
        .loading-screen, .error-screen {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--gh-border);
          border-top-color: var(--gh-accent);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .loading-text {
          font-size: 16px;
          color: var(--gh-text-primary);
        }
        .error-icon { font-size: 40px; }
        .error-title {
          font-size: 20px;
          font-weight: 600;
          color: var(--gh-text-primary);
        }
        @media (max-width: 600px) {
          .quick-stats { grid-template-columns: repeat(2, 1fr); }
          .profile-header { flex-direction: column; }
        }
      `}</style>
    </div>
  )
}