import { useEffect, useState } from 'react'
import '../styles/Dashboard.css'

function Dashboard() {
  const [stats, setStats] = useState({
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
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening today.</p>
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
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn">
              <span>➕</span>
              Add Patient
            </button>
            <button className="action-btn">
              <span>📅</span>
              New Appointment
            </button>
            <button className="action-btn">
              <span>💰</span>
              Create Bill
            </button>
            <button className="action-btn">
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
