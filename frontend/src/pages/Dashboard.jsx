import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Dashboard({ setAuth }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setAuth(false)
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <h1>Welcome to Dashboard! 🎉</h1>
        <p>Hello, {user?.name || user?.email}!</p>
        <p>You are successfully logged in.</p>
        <button onClick={handleLogout} className="btn btn-logout">
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard
