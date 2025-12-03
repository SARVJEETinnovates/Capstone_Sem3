import { useState, useEffect } from 'react'
import Pagination from '../components/Pagination'
import '../styles/Appointments.css'
import '../styles/Loading.css'

function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDate, setFilterDate] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState(null)
  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: '',
    date: '',
    time: '',
    type: 'Checkup',
    status: 'Pending',
    notes: ''
  })

  useEffect(() => {
    fetchAppointments()
  }, [filterStatus, filterDate, currentPage])

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const params = new URLSearchParams({
        status: filterStatus,
        date: filterDate,
        page: currentPage,
        limit: 10
      })

      const response = await fetch(`https://capstone-sem3-u392.onrender.com/api/appointments?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        setAppointments(data.appointments || [])
        setTotalPages(data.pagination?.totalPages || 1)
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error)
    }
    setLoading(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const url = editingAppointment 
        ? `https://capstone-sem3-u392.onrender.com/api/appointments/${editingAppointment.id}`
        : 'https://capstone-sem3-u392.onrender.com/api/appointments'
      
      const response = await fetch(url, {
        method: editingAppointment ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setShowModal(false)
        setEditingAppointment(null)
        resetForm()
        fetchAppointments()
      } else {
        alert('Failed to save appointment')
      }
    } catch (error) {
      console.error('Failed to save appointment:', error)
      alert('Failed to save appointment')
    }
  }

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment)
    setFormData({
      patientName: appointment.patientName,
      doctorName: appointment.doctorName,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      status: appointment.status,
      notes: appointment.notes || ''
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`https://capstone-sem3-u392.onrender.com/api/appointments/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        })

        if (response.ok) {
          fetchAppointments()
        } else {
          alert('Failed to delete appointment')
        }
      } catch (error) {
        console.error('Failed to delete appointment:', error)
        alert('Failed to delete appointment')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      patientName: '',
      doctorName: '',
      date: '',
      time: '',
      type: 'Checkup',
      status: 'Pending',
      notes: ''
    })
  }

  const openAddModal = () => {
    setEditingAppointment(null)
    resetForm()
    setShowModal(true)
  }

  return (
    <div className="appointments-page">
      <div className="page-header">
        <div>
          <h1>Appointments</h1>
          <p>Schedule and manage patient appointments</p>
        </div>
        <button className="btn-primary" onClick={openAddModal}>
          📅 New Appointment
        </button>
      </div>

      <div className="filters-bar">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="filter-select"
          placeholder="Filter by date"
        />

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
          <option value="all">All Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading appointments</div>
      ) : (
        <>
          <div className="appointments-grid">
            {appointments.length === 0 ? (
              <div className="no-data">No appointments found. Click "New Appointment" to create one.</div>
            ) : (
              appointments.map(apt => (
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
                        <div className="info-value">{apt.patientName}</div>
                      </div>
                    </div>
                    <div className="appointment-info">
                      <span className="info-icon">👨‍⚕️</span>
                      <div>
                        <div className="info-label">Doctor</div>
                        <div className="info-value">{apt.doctorName}</div>
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
                    <button className="btn-icon" onClick={() => handleEdit(apt)} title="Edit">✏️</button>
                    <button className="btn-icon danger" onClick={() => handleDelete(apt.id)} title="Delete">🗑️</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingAppointment ? 'Edit Appointment' : 'New Appointment'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Patient Name *</label>
                <input
                  type="text"
                  name="patientName"
                  placeholder="Enter patient name"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Doctor Name *</label>
                <input
                  type="text"
                  name="doctorName"
                  placeholder="Enter doctor name"
                  value={formData.doctorName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Type</label>
                  <select name="type" value={formData.type} onChange={handleInputChange}>
                    <option>Checkup</option>
                    <option>Consultation</option>
                    <option>Follow-up</option>
                    <option>Surgery</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  name="notes"
                  placeholder="Additional notes..."
                  rows="3"
                  value={formData.notes}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingAppointment ? 'Update' : 'Create'} Appointment
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
