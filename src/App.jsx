import './styles/github-theme.css'
import { useState } from 'react'
import UsernameInput from './components/UsernameInput'
import StatsCard from './components/StatsCard'
import useGitHubData from './hooks/useGitHubData'

function App() {
  const [username, setUsername] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { data, loading, error } = useGitHubData(submitted ? username : null)

  const handleSearch = (name) => {
    setUsername(name)
    setSubmitted(true)
  }

  const handleReset = () => {
    setUsername('')
    setSubmitted(false)
  }

  return (
    <div className="app">
      {!submitted ? (
        <UsernameInput onSearch={handleSearch} />
      ) : (
        <StatsCard
          data={data}
          loading={loading}
          error={error}
          username={username}
          onReset={handleReset}
        />
      )}
    </div>
  )
}

export default App