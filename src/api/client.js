// Thin wrapper around the CivicSync REST API.
// In development, CRA proxies /api to the backend (see "proxy" in package.json).
const API_BASE = process.env.REACT_APP_API_URL || '/api';

const request = async (path, { method = 'GET', body } = {}) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);
  return data;
};

const api = {
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
  getWorkers: () => request('/workers'),
  getComplaints: () => request('/complaints'),
  createComplaint: (payload) => request('/complaints', { method: 'POST', body: payload }),
  assignWorker: (id, payload) => request(`/complaints/${id}/assign`, { method: 'PATCH', body: payload }),
  updateStatus: (id, payload) => request(`/complaints/${id}/status`, { method: 'PATCH', body: payload }),
  upvote: (id) => request(`/complaints/${id}/upvote`, { method: 'PATCH' }),
  resetData: () => request('/admin/reset', { method: 'POST' })
};

export default api;
