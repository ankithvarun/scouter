import axios from 'axios';

// In Docker, use the service name 'backend' instead of localhost
const API_BASE_URL = "http://backend:5000/api";

console.log('Using API URL:', API_BASE_URL);
if (!API_BASE_URL) {
  console.error('API_BASE_URL is not set');
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Game APIs
export const gameAPI = {
  create: (data: any) => api.post('/games', data),
  getAll: () => api.get('/games'),
  getById: (id: string) => api.get(`/games/${id}`),
  update: (id: string, data: any) => api.patch(`/games/${id}`, data),
  updateStatus: (id: string, data: any) => api.patch(`/games/${id}/status`, data),
  addPlayer: (id: string, data: any) => api.post(`/games/${id}/players`, data),
  removePlayer: (id: string, playerId: string) => api.delete(`/games/${id}/players/${playerId}`),
};

// Player APIs
export const playerAPI = {
  create: (data: any) => api.post('/players', data),
  getAll: () => api.get('/players'),
  getById: (id: string) => api.get(`/players/${id}`),
  update: (id: string, data: any) => api.patch(`/players/${id}`, data),
  updateStats: (id: string, data: any) => api.patch(`/players/${id}/stats`, data),
};

export default api; 