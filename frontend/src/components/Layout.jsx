import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import '../styles/Layout.css'

function Layout({ setAuth }) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setAuth(false)
    navigate('/login')
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🏥</span>
            <span className="logo-text">Healio</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className="nav-item">
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/patients" className="nav-item">
            <span className="nav-icon">👥</span>
            <span>Patients</span>
          </NavLink>
          <NavLink to="/appointments" className="nav-item">
            <span className="nav-icon">📅</span>
            <span>Appointments</span>
          </NavLink>
          <NavLink to="/billing" className="nav-item">
            <span className="nav-icon">💰</span>
            <span>Billing</span>
          </NavLink>
          <NavLink to="/reports" className="nav-item">
            <span className="nav-icon">📈</span>
            <span>Reports</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user.name?.[0] || user.email?.[0] || 'U'}</div>
            <div className="user-details">
              <div className="user-name">{user.name || 'User'}</div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
