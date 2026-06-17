import { useState, useEffect } from 'react'

const BASE_URL = 'https://api.github.com'

export default function useGitHubData(username) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        // Fetch user profile
        const userRes = await fetch(`${BASE_URL}/users/${username}`)
        if (!userRes.ok) throw new Error('User not found')
        const user = await userRes.json()

        // Fetch user repos
        const reposRes = await fetch(
          `${BASE_URL}/users/${username}/repos?per_page=100&sort=updated`
        )
        const repos = await reposRes.json()

        // Calculate language stats
        const langCount = {}
        repos.forEach(repo => {
          if (repo.language) {
            langCount[repo.language] = (langCount[repo.language] || 0) + 1
          }
        })

        // Sort languages by usage
        const languages = Object.entries(langCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)

        // Top repos by stars
        const topRepos = [...repos]
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 4)

        // Total stats
        const totalStars = repos.reduce(
          (sum, repo) => sum + repo.stargazers_count, 0
        )
        const totalForks = repos.reduce(
          (sum, repo) => sum + repo.forks_count, 0
        )

        setData({
          user,
          repos,
          languages,
          topRepos,
          totalStars,
          totalForks,
        })

      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [username])

  return { data, loading, error }
}