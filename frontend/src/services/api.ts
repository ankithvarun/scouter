import axios from 'axios';

// Determine the base URL based on the environment
const getBaseUrl = () => {
  // In production, use relative URL which will be handled by nginx proxy
  if (import.meta.env.PROD) {
    return '/api';
  }

  // In development with Docker, use the service name
  if (import.meta.env.VITE_DOCKER === 'true') {
    return 'http://backend:5000/api';
  }

  // In local development, use localhost
  return 'http://localhost:5000/api';
};

// const API_BASE_URL = getBaseUrl();
const API_BASE_URL = '/api';

console.log('Environment:', import.meta.env.MODE);
console.log('Using API URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

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