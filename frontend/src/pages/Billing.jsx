import { useState } from 'react'
import '../styles/Billing.css'

function Billing() {
  const [bills, setBills] = useState([
    { id: 1, patient: 'John Doe', amount: 450, status: 'Paid', date: '2024-11-20', services: 'Consultation, Lab Tests' },
    { id: 2, patient: 'Jane Smith', amount: 1200, status: 'Pending', date: '2024-11-22', services: 'Surgery, Medication' },
    { id: 3, patient: 'Bob Johnson', amount: 350, status: 'Paid', date: '2024-11-25', services: 'Checkup' },
    { id: 4, patient: 'Alice Williams', amount: 800, status: 'Overdue', date: '2024-11-10', services: 'X-Ray, Consultation' }
  ])

  const [filterStatus, setFilterStatus] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    patient: '',
    services: '',
    amount: '',
    date: '',
    paymentMethod: 'Cash'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.patient || !formData.services || !formData.amount || !formData.date) {
      alert('Please fill in all required fields')
      return
    }

    const newBill = {
      id: bills.length + 1,
      patient: formData.patient,
      amount: parseFloat(formData.amount),
      status: 'Pending',
      date: formData.date,
      services: formData.services
    }

    setBills([...bills, newBill])
    setShowModal(false)
    setFormData({
      patient: '',
      services: '',
      amount: '',
      date: '',
      paymentMethod: 'Cash'
    })
    alert('Bill generated successfully!')
  }

  const filteredBills = bills.filter(bill => 
    filterStatus === 'all' || bill.status.toLowerCase() === filterStatus
  )

  const totalRevenue = bills.filter(b => b.status === 'Paid').reduce((sum, b) => sum + b.amount, 0)
  const pendingAmount = bills.filter(b => b.status === 'Pending').reduce((sum, b) => sum + b.amount, 0)
  const overdueAmount = bills.filter(b => b.status === 'Overdue').reduce((sum, b) => sum + b.amount, 0)

  return (
    <div className="billing-page">
      <div className="page-header">
        <div>
          <h1>Billing & Invoices</h1>
          <p>Manage payments and generate invoices</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
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
        <div className="stat-card-small stat-danger">
          <div className="stat-icon-small">⚠️</div>
          <div>
            <div className="stat-label-small">Overdue</div>
            <div className="stat-value-small">${overdueAmount}</div>
          </div>
        </div>
      </div>

      <div className="filters-bar">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

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
            {filteredBills.map(bill => (
              <tr key={bill.id}>
                <td>#{bill.id.toString().padStart(4, '0')}</td>
                <td className="patient-name">
                  <div className="avatar">{bill.patient[0]}</div>
                  {bill.patient}
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
                    <button className="btn-icon" title="View">👁️</button>
                    <button className="btn-icon" title="Download">📥</button>
                    <button className="btn-icon" title="Print">🖨️</button>
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
              <h2>Create New Bill</h2>
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
