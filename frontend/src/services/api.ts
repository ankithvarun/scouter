import axios from 'axios';

const API_BASE_URL = "https://game-day-production.up.railway.app/api"
console.log(API_BASE_URL);
if (!API_BASE_URL) {
  console.error('REACT_APP_API_URL environment variable is not set');
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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