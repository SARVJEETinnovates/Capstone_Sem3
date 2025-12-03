import { useState, useEffect } from 'react'
import Pagination from '../components/Pagination'
import '../styles/Billing.css'
import '../styles/Loading.css'

function Billing() {
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [editingBill, setEditingBill] = useState(null)
  const [formData, setFormData] = useState({
    patient: '',
    services: '',
    amount: '',
    date: '',
    status: 'Pending',
    paymentMethod: 'Cash'
  })

  useEffect(() => {
    fetchBills()
  }, [filterStatus, currentPage])

  const fetchBills = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const params = new URLSearchParams({
        status: filterStatus,
        page: currentPage,
        limit: 10
      })

      const response = await fetch(`http://localhost:3001/api/billing?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        setBills(data.bills || [])
        setTotalPages(data.pagination?.totalPages || 1)
      }
    } catch (error) {
      console.error('Failed to fetch bills:', error)
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
      const url = editingBill 
        ? `http://localhost:3001/api/billing/${editingBill.id}`
        : 'http://localhost:3001/api/billing'
      
      const response = await fetch(url, {
        method: editingBill ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          patientName: formData.patient,
          services: formData.services,
          amount: parseFloat(formData.amount),
          date: formData.date,
          status: formData.status || 'Pending',
          paymentMethod: formData.paymentMethod
        })
      })

      if (response.ok) {
        setShowModal(false)
        setEditingBill(null)
        resetForm()
        fetchBills()
        alert(editingBill ? 'Bill updated successfully!' : 'Bill generated successfully!')
      } else {
        alert('Failed to save bill')
      }
    } catch (error) {
      console.error('Failed to save bill:', error)
      alert('Failed to save bill')
    }
  }

  const handleEdit = (bill) => {
    setEditingBill(bill)
    setFormData({
      patient: bill.patientName,
      services: bill.services,
      amount: bill.amount.toString(),
      date: bill.date,
      status: bill.status,
      paymentMethod: bill.paymentMethod
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:3001/api/billing/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        })

        if (response.ok) {
          fetchBills()
        } else {
          alert('Failed to delete bill')
        }
      } catch (error) {
        console.error('Failed to delete bill:', error)
        alert('Failed to delete bill')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      patient: '',
      services: '',
      amount: '',
      date: '',
      status: 'Pending',
      paymentMethod: 'Cash'
    })
  }

  const openAddModal = () => {
    setEditingBill(null)
    resetForm()
    setShowModal(true)
  }

  const totalRevenue = bills.filter(b => b.status === 'Paid').reduce((sum, b) => sum + b.amount, 0)
  const pendingAmount = bills.filter(b => b.status === 'Pending').reduce((sum, b) => sum + b.amount, 0)

  return (
    <div className="billing-page">
      <div className="page-header">
        <div>
          <h1>Billing & Invoices</h1>
          <p>Manage payments and generate invoices</p>
        </div>
        <button className="btn-primary" onClick={openAddModal}>
          💰 Create New Bill
        </button>
      </div>

      <div className="billing-stats">
        <div className="stat-card-small stat-success">
          <div className="stat-icon-small">✓</div>
          <div>
            <div className="stat-label-small">Total Revenue</div>
            <div className="stat-value-small">${totalRevenue}</div>
          </div>
        </div>
        <div className="stat-card-small stat-warning">
          <div className="stat-icon-small">⏳</div>
          <div>
            <div className="stat-label-small">Pending</div>
            <div className="stat-value-small">${pendingAmount}</div>
          </div>
        </div>
      </div>

      <div className="filters-bar">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
          <option value="all">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading bills</div>
      ) : (
        <>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Patient</th>
                  <th>Services</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{textAlign: 'center', padding: '40px', color: '#666'}}>
                      No bills found. Click "Create New Bill" to generate one.
                    </td>
                  </tr>
                ) : (
                  bills.map(bill => (
                    <tr key={bill.id}>
                      <td>#{bill.id.substring(0, 8)}</td>
                      <td className="patient-name">
                        <div className="avatar">{bill.patientName[0]}</div>
                        {bill.patientName}
                      </td>
                      <td>{bill.services}</td>
                      <td>{bill.date}</td>
                      <td className="amount">${bill.amount}</td>
                      <td>
                        <span className={`status-badge ${bill.status.toLowerCase()}`}>
                          {bill.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon" onClick={() => handleEdit(bill)} title="Edit">✏️</button>
                          <button className="btn-icon danger" onClick={() => handleDelete(bill.id)} title="Delete">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
              <h2>{editingBill ? 'Edit Bill' : 'Create New Bill'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Patient Name *</label>
                <input 
                  type="text" 
                  name="patient"
                  placeholder="Enter patient name" 
                  value={formData.patient}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Services *</label>
                <textarea 
                  name="services"
                  placeholder="List of services provided" 
                  rows="3"
                  value={formData.services}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Amount *</label>
                  <input 
                    type="number" 
                    name="amount"
                    placeholder="0.00" 
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
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
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <select 
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                >
                  <option>Cash</option>
                  <option>Card</option>
                  <option>Insurance</option>
                  <option>Bank Transfer</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Generate Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Billing
