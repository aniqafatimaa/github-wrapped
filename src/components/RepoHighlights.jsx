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

export default function RepoHighlights({ repos }) {
  if (!repos?.length) return null

  return (
    <div className="repos-card gh-card">
      <h2 className="section-title">
        <span className="title-icon">⭐</span>
        Top Repositories
      </h2>

      <div className="repos-grid">
        {repos.map(repo => {
          const langColor = LANG_COLORS[repo.language] || LANG_COLORS.default
          return (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-item"
            >
              {/* Repo header */}
              <div className="repo-header">
                <svg viewBox="0 0 16 16" width="14" height="14"
                  className="repo-icon">
                  <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h7A2.5
                  2.5 0 0114 2.5v10.5a.5.5 0 01-.777.416L8
                  10.101l-5.223 3.315A.5.5 0 012 13V2.5zm2.5-1A1.5 1.5 0
                  003 2.5V12l4.5-2.857L12 12V2.5A1.5 1.5 0 0010.5 1h-6z"/>
                </svg>
                <span className="repo-name">{repo.name}</span>
                {repo.fork && (
                  <span className="repo-fork-badge">fork</span>
                )}
              </div>

              {/* Description */}
              <p className="repo-desc">
                {repo.description || 'No description provided'}
              </p>

              {/* Footer */}
              <div className="repo-footer">
                {repo.language && (
                  <span className="repo-lang">
                    <span
                      className="repo-lang-dot"
                      style={{ background: langColor }}
                    />
                    {repo.language}
                  </span>
                )}
                <span className="repo-stat">
                  ⭐ {repo.stargazers_count}
                </span>
                <span className="repo-stat">
                  🍴 {repo.forks_count}
                </span>
              </div>
            </a>
          )
        })}
      </div>

      <style>{`
        .repos-card { padding: 20px; }
        .repos-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .repo-item {
          background: var(--gh-bg-tertiary);
          border: 1px solid var(--gh-border);
          border-radius: var(--gh-radius);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-decoration: none;
          transition: border-color 0.2s, background 0.2s;
          cursor: pointer;
        }
        .repo-item:hover {
          border-color: var(--gh-accent);
          background: var(--gh-bg-overlay);
        }
        .repo-header {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .repo-icon { fill: var(--gh-accent); flex-shrink: 0; }
        .repo-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--gh-text-link);
          font-family: var(--gh-font-mono);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .repo-fork-badge {
          font-size: 10px;
          padding: 1px 6px;
          border: 1px solid var(--gh-border);
          border-radius: 20px;
          color: var(--gh-text-muted);
          flex-shrink: 0;
        }
        .repo-desc {
          font-size: 12px;
          color: var(--gh-text-secondary);
          line-height: 1.5;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .repo-footer {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 4px;
        }
        .repo-lang {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: var(--gh-text-secondary);
        }
        .repo-lang-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .repo-stat {
          font-size: 12px;
          color: var(--gh-text-secondary);
        }
        @media (max-width: 600px) {
          .repos-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}