import { useState } from 'react'
import '../styles/Patients.css'

function Patients() {
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', age: 45, gender: 'Male', phone: '555-0101', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', phone: '555-0102', email: 'jane@example.com', status: 'Active' },
    { id: 3, name: 'Bob Johnson', age: 58, gender: 'Male', phone: '555-0103', email: 'bob@example.com', status: 'Inactive' },
    { id: 4, name: 'Alice Williams', age: 28, gender: 'Female', phone: '555-0104', email: 'alice@example.com', status: 'Active' },
    { id: 5, name: 'Charlie Brown', age: 52, gender: 'Male', phone: '555-0105', email: 'charlie@example.com', status: 'Active' }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  const filteredPatients = patients
    .filter(p => 
      (filterStatus === 'all' || p.status === filterStatus) &&
      (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       p.phone.includes(searchTerm) ||
       p.email.toLowerCase().includes(searchTerm.toLowerCase()))
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
          <p>View and search patient records</p>
        </div>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
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
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan="6" style={{textAlign: 'center', padding: '40px', color: '#666'}}>
                  No patients found
                </td>
              </tr>
            ) : (
              filteredPatients.map(patient => (
                <tr key={patient.id}>
                  <td className="patient-name">
                    <div className="avatar">{patient.name[0]}</div>
                    {patient.name}
                  </td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.email}</td>
                  <td>
                    <span className={`status-badge ${patient.status.toLowerCase()}`}>
                      {patient.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Patients
