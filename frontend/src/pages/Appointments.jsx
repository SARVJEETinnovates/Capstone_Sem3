import { useState } from 'react'
import '../styles/Appointments.css'

function Appointments() {
  const [appointments] = useState([
    { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', date: '2024-11-28', time: '10:00 AM', status: 'Confirmed', type: 'Checkup' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Johnson', date: '2024-11-28', time: '11:30 AM', status: 'Pending', type: 'Consultation' },
    { id: 3, patient: 'Bob Johnson', doctor: 'Dr. Williams', date: '2024-11-29', time: '02:00 PM', status: 'Confirmed', type: 'Follow-up' },
    { id: 4, patient: 'Alice Williams', doctor: 'Dr. Brown', date: '2024-11-29', time: '03:30 PM', status: 'Cancelled', type: 'Surgery' },
    { id: 5, patient: 'Charlie Brown', doctor: 'Dr. Davis', date: '2024-11-30', time: '09:00 AM', status: 'Confirmed', type: 'Checkup' },
    { id: 6, patient: 'Diana Prince', doctor: 'Dr. Smith', date: '2024-11-30', time: '01:00 PM', status: 'Pending', type: 'Consultation' }
  ])

  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDate, setFilterDate] = useState('')

  const filteredAppointments = appointments.filter(apt => 
    (filterStatus === 'all' || apt.status.toLowerCase() === filterStatus) &&
    (!filterDate || apt.date === filterDate)
  )

  return (
    <div className="appointments-page">
      <div className="page-header">
        <div>
          <h1>Appointments</h1>
          <p>View and manage patient appointments</p>
        </div>
      </div>

      <div className="filters-bar">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="filter-select"
        />

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
          <option value="all">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="appointments-grid">
        {filteredAppointments.map(apt => (
          <div key={apt.id} className="appointment-card">
            <div className="appointment-header">
              <span className={`status-badge ${apt.status.toLowerCase()}`}>
                {apt.status}
              </span>
              <span className="appointment-type">{apt.type}</span>
            </div>
            <div className="appointment-body">
              <div className="appointment-info">
                <span className="info-icon">👤</span>
                <div>
                  <div className="info-label">Patient</div>
                  <div className="info-value">{apt.patient}</div>
                </div>
              </div>
              <div className="appointment-info">
                <span className="info-icon">👨‍⚕️</span>
                <div>
                  <div className="info-label">Doctor</div>
                  <div className="info-value">{apt.doctor}</div>
                </div>
              </div>
              <div className="appointment-info">
                <span className="info-icon">📅</span>
                <div>
                  <div className="info-label">Date & Time</div>
                  <div className="info-value">{apt.date} at {apt.time}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Appointments
