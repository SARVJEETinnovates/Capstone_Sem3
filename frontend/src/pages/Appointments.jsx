import { useState } from 'react'
import '../styles/Appointments.css'

function Appointments() {
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', date: '2024-11-28', time: '10:00 AM', status: 'Confirmed', type: 'Checkup' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Johnson', date: '2024-11-28', time: '11:30 AM', status: 'Pending', type: 'Consultation' },
    { id: 3, patient: 'Bob Johnson', doctor: 'Dr. Williams', date: '2024-11-29', time: '02:00 PM', status: 'Confirmed', type: 'Follow-up' },
    { id: 4, patient: 'Alice Williams', doctor: 'Dr. Brown', date: '2024-11-29', time: '03:30 PM', status: 'Cancelled', type: 'Surgery' }
  ])

  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDate, setFilterDate] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filteredAppointments = appointments.filter(apt => 
    (filterStatus === 'all' || apt.status.toLowerCase() === filterStatus) &&
    (!filterDate || apt.date === filterDate)
  )

  return (
    <div className="appointments-page">
      <div className="page-header">
        <div>
          <h1>Appointments</h1>
          <p>Schedule and manage patient appointments</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          📅 New Appointment
        </button>
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
            <div className="appointment-actions">
              <button className="btn-icon">✏️</button>
              <button className="btn-icon">✓</button>
              <button className="btn-icon danger">✕</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Schedule New Appointment</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form className="modal-form">
              <div className="form-group">
                <label>Patient Name</label>
                <input type="text" placeholder="Select or enter patient name" />
              </div>
              <div className="form-group">
                <label>Doctor</label>
                <select>
                  <option>Dr. Smith</option>
                  <option>Dr. Johnson</option>
                  <option>Dr. Williams</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input type="time" />
                </div>
              </div>
              <div className="form-group">
                <label>Appointment Type</label>
                <select>
                  <option>Checkup</option>
                  <option>Consultation</option>
                  <option>Follow-up</option>
                  <option>Surgery</option>
                </select>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea placeholder="Additional notes..." rows="3"></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Appointments
