import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  
  const [stats] = useState({
    totalPatients: 1247,
    todayAppointments: 32,
    pendingBills: 18,
    revenue: 45680
  })

  const [recentActivities] = useState([
    { id: 1, type: 'appointment', message: 'New appointment scheduled with Dr. Smith', time: '5 mins ago' },
    { id: 2, type: 'patient', message: 'New patient registered: John Doe', time: '15 mins ago' },
    { id: 3, type: 'billing', message: 'Payment received: $450', time: '1 hour ago' },
    { id: 4, type: 'appointment', message: 'Appointment completed with Dr. Johnson', time: '2 hours ago' }
  ])

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Welcome back, {user.name || 'User'}! 👋</h1>
          <p>Here's what's happening in your hospital today.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-primary">
          <div className="stat-icon">👥</div>
          <div className="stat-details">
            <div className="stat-value">{stats.totalPatients}</div>
            <div className="stat-label">Total Patients</div>
          </div>
        </div>

        <div className="stat-card stat-success">
          <div className="stat-icon">📅</div>
          <div className="stat-details">
            <div className="stat-value">{stats.todayAppointments}</div>
            <div className="stat-label">Today's Appointments</div>
          </div>
        </div>

        <div className="stat-card stat-warning">
          <div className="stat-icon">💰</div>
          <div className="stat-details">
            <div className="stat-value">{stats.pendingBills}</div>
            <div className="stat-label">Pending Bills</div>
          </div>
        </div>

        <div className="stat-card stat-info">
          <div className="stat-icon">💵</div>
          <div className="stat-details">
            <div className="stat-value">${stats.revenue.toLocaleString()}</div>
            <div className="stat-label">Monthly Revenue</div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="activity-section">
          <h2>Recent Activities</h2>
          <div className="activity-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-icon ${activity.type}`}>
                  {activity.type === 'appointment' && '📅'}
                  {activity.type === 'patient' && '👤'}
                  {activity.type === 'billing' && '💰'}
                </div>
                <div className="activity-content">
                  <div className="activity-message">{activity.message}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Links</h2>
          <div className="action-buttons">
            <button className="action-btn" onClick={() => navigate('/patients')}>
              <span>👥</span>
              View Patients
            </button>
            <button className="action-btn" onClick={() => navigate('/appointments')}>
              <span>📅</span>
              View Appointments
            </button>
            <button className="action-btn" onClick={() => navigate('/billing')}>
              <span>💰</span>
              View Billing
            </button>
            <button className="action-btn" onClick={() => navigate('/reports')}>
              <span>📊</span>
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
