import { useState } from 'react'
import '../styles/Reports.css'

function Reports() {
  const [dateRange, setDateRange] = useState('month')

  const reportData = {
    totalPatients: 1247,
    newPatients: 89,
    totalAppointments: 456,
    completedAppointments: 398,
    revenue: 45680,
    expenses: 12340
  }

  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>View comprehensive hospital statistics and insights</p>
        </div>
        <div className="date-range-selector">
          <button 
            className={dateRange === 'week' ? 'active' : ''} 
            onClick={() => setDateRange('week')}
          >
            Week
          </button>
          <button 
            className={dateRange === 'month' ? 'active' : ''} 
            onClick={() => setDateRange('month')}
          >
            Month
          </button>
          <button 
            className={dateRange === 'year' ? 'active' : ''} 
            onClick={() => setDateRange('year')}
          >
            Year
          </button>
        </div>
      </div>

      <div className="reports-grid">
        <div className="report-card">
          <div className="report-header">
            <h3>Patient Statistics</h3>
            <span className="report-icon">👥</span>
          </div>
          <div className="report-stats">
            <div className="report-stat">
              <div className="report-stat-value">{reportData.totalPatients}</div>
              <div className="report-stat-label">Total Patients</div>
            </div>
            <div className="report-stat">
              <div className="report-stat-value">{reportData.newPatients}</div>
              <div className="report-stat-label">New This Month</div>
            </div>
          </div>
          <div className="report-chart">
            <div className="chart-placeholder">📊 Patient Growth Chart</div>
          </div>
        </div>

        <div className="report-card">
          <div className="report-header">
            <h3>Appointments Overview</h3>
            <span className="report-icon">📅</span>
          </div>
          <div className="report-stats">
            <div className="report-stat">
              <div className="report-stat-value">{reportData.totalAppointments}</div>
              <div className="report-stat-label">Total Appointments</div>
            </div>
            <div className="report-stat">
              <div className="report-stat-value">{reportData.completedAppointments}</div>
              <div className="report-stat-label">Completed</div>
            </div>
          </div>
          <div className="report-chart">
            <div className="chart-placeholder">📈 Appointment Trends</div>
          </div>
        </div>

        <div className="report-card">
          <div className="report-header">
            <h3>Financial Summary</h3>
            <span className="report-icon">💰</span>
          </div>
          <div className="report-stats">
            <div className="report-stat">
              <div className="report-stat-value">${reportData.revenue.toLocaleString()}</div>
              <div className="report-stat-label">Total Revenue</div>
            </div>
            <div className="report-stat">
              <div className="report-stat-value">${reportData.expenses.toLocaleString()}</div>
              <div className="report-stat-label">Total Expenses</div>
            </div>
          </div>
          <div className="report-chart">
            <div className="chart-placeholder">💹 Revenue vs Expenses</div>
          </div>
        </div>

        <div className="report-card">
          <div className="report-header">
            <h3>Department Performance</h3>
            <span className="report-icon">🏥</span>
          </div>
          <div className="department-list">
            <div className="department-item">
              <div className="department-name">Cardiology</div>
              <div className="department-bar">
                <div className="department-progress" style={{width: '85%'}}></div>
              </div>
              <div className="department-value">85%</div>
            </div>
            <div className="department-item">
              <div className="department-name">Neurology</div>
              <div className="department-bar">
                <div className="department-progress" style={{width: '72%'}}></div>
              </div>
              <div className="department-value">72%</div>
            </div>
            <div className="department-item">
              <div className="department-name">Orthopedics</div>
              <div className="department-bar">
                <div className="department-progress" style={{width: '90%'}}></div>
              </div>
              <div className="department-value">90%</div>
            </div>
            <div className="department-item">
              <div className="department-name">Pediatrics</div>
              <div className="department-bar">
                <div className="department-progress" style={{width: '68%'}}></div>
              </div>
              <div className="department-value">68%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="export-section">
        <h3>Export Reports</h3>
        <div className="export-buttons">
          <button className="export-btn">📄 Export as PDF</button>
          <button className="export-btn">📊 Export as Excel</button>
          <button className="export-btn">📧 Email Report</button>
        </div>
      </div>
    </div>
  )
}

export default Reports
