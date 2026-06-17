# GitHub Wrapped 🎁

> Your year in code — beautifully visualized. Inspired by Spotify Wrapped.

![GitHub Wrapped Preview](preview.png)

## 🚀 Live Demo
[github-wrapped on Netlify](githubwrapped-aniqa.netlify.app) <!-- update this link after deploying -->

## ✨ Features

- 🔍 Search any public GitHub profile by username
- 📊 Top languages donut chart
- ⭐ Top repositories by stars
- 📅 Contribution activity heatmap
- ⚡ Activity stats — member since, most active day & month
- 📸 Export your Wrapped as a PNG to share on LinkedIn or Twitter
- 🎨 Authentic GitHub dark theme UI

## 🛠️ Tech Stack

- **React** — component-based UI
- **Vite** — fast dev server and build tool
- **Chart.js** — language donut chart
- **GitHub REST API** — public profile & repo data, no auth required
- **html-to-image** — PNG export

## 🏃 Run Locally

```bash
git clone https://github.com/aniqafatimaa/github-wrapped.git
cd github-wrapped
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## 📁 Project Structure

src/

├── components/

│   ├── UsernameInput.jsx      # Landing search screen

│   ├── StatsCard.jsx          # Main stats wrapper

│   ├── LanguageChart.jsx      # Top languages donut chart

│   ├── StreakStats.jsx        # Activity stats grid

│   ├── ContributionHeatmap.jsx# 6-month activity heatmap

│   ├── RepoHighlights.jsx     # Top repos by stars

│   └── ExportButton.jsx       # PNG export

├── hooks/

│   └── useGitHubData.js       # GitHub API data fetching

├── utils/

│   └── formatStats.js         # Helper functions

└── styles/

└── github-theme.css       # GitHub design tokens

## 👩‍💻 Built By

**Aniqa Fatima** — Frontend Developer  
[GitHub](https://github.com/aniqafatimaa) • [LinkedIn](www.linkedin.com/in/aniqa-fatima-bb8698335)

---

> ⭐ If you like this project, give it a star!