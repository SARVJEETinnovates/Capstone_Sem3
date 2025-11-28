import { useState } from 'react'
import '../styles/Patients.css'

function Patients() {
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', age: 45, gender: 'Male', phone: '555-0101', status: 'Active', lastVisit: '2024-11-20' },
    { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', phone: '555-0102', status: 'Active', lastVisit: '2024-11-22' },
    { id: 3, name: 'Bob Johnson', age: 58, gender: 'Male', phone: '555-0103', status: 'Inactive', lastVisit: '2024-10-15' },
    { id: 4, name: 'Alice Williams', age: 28, gender: 'Female', phone: '555-0104', status: 'Active', lastVisit: '2024-11-25' }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [showModal, setShowModal] = useState(false)

  const filteredPatients = patients
    .filter(p => 
      (filterStatus === 'all' || p.status.toLowerCase() === filterStatus) &&
      (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       p.phone.includes(searchTerm))
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'age') return a.age - b.age
      return 0
    })

  return (
    <div className="patients-page">
      <div className="page-header">
        <div>
          <h1>Patients Management</h1>
          <p>Manage and track all patient records</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          ➕ Add New Patient
        </button>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
          <option value="name">Sort by Name</option>
          <option value="age">Sort by Age</option>
        </select>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Last Visit</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id}>
                <td>#{patient.id}</td>
                <td className="patient-name">
                  <div className="avatar">{patient.name[0]}</div>
                  {patient.name}
                </td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.phone}</td>
                <td>{patient.lastVisit}</td>
                <td>
                  <span className={`status-badge ${patient.status.toLowerCase()}`}>
                    {patient.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="View">👁️</button>
                    <button className="btn-icon" title="Edit">✏️</button>
                    <button className="btn-icon danger" title="Delete">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Patient</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter full name" />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input type="number" placeholder="Age" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Gender</label>
                  <select>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" placeholder="Phone number" />
                </div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea placeholder="Enter address" rows="3"></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Patients
