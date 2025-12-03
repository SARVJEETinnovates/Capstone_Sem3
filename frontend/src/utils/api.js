const API_URL = 'https://capstone-sem3-u392.onrender.com/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  // Patients
  getPatients: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/patients?${query}`, {
      headers: getAuthHeader()
    });
    return response.json();
  },

  createPatient: async (data) => {
    const response = await fetch(`${API_URL}/patients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  updatePatient: async (id, data) => {
    const response = await fetch(`${API_URL}/patients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  deletePatient: async (id) => {
    const response = await fetch(`${API_URL}/patients/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return response.json();
  },

  // Appointments
  getAppointments: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/appointments?${query}`, {
      headers: getAuthHeader()
    });
    return response.json();
  },

  createAppointment: async (data) => {
    const response = await fetch(`${API_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  updateAppointment: async (id, data) => {
    const response = await fetch(`${API_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  deleteAppointment: async (id) => {
    const response = await fetch(`${API_URL}/appointments/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return response.json();
  },

  // Billing
  getBills: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/billing?${query}`, {
      headers: getAuthHeader()
    });
    return response.json();
  },

  createBill: async (data) => {
    const response = await fetch(`${API_URL}/billing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  updateBill: async (id, data) => {
    const response = await fetch(`${API_URL}/billing/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  deleteBill: async (id) => {
    const response = await fetch(`${API_URL}/billing/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return response.json();
  },

  // Reports
  getSummaryReport: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/reports/summary?${query}`, {
      headers: getAuthHeader()
    });
    return response.json();
  }
};
