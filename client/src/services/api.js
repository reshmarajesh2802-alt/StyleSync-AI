import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('stylesync_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const authAPI = {
  signup: (userData) => api.post('/auth/signup', userData),
  signin: (credentials) => api.post('/auth/signin', credentials),
  getProfile: () => api.get('/auth/profile'),
  checkUser: () => api.get('/auth/check-user'),
  checkAdmin: () => api.get('/auth/check-admin'),
  logout: () => api.post('/auth/logout'),
};

export const productAPI = {
  getProducts: (params) => api.get('/products', { params }),
  getProductById: (id) => api.get(`/products/${id}`),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

export const stylistAPI = {
  recommend: (payload) => api.post('/stylist/recommend', payload),
  getPreferences: () => api.get('/stylist/preferences'),
  savePreferences: (data) => api.post('/stylist/preferences', data),
};

export const orderAPI = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getUserOrders: () => api.get('/orders'),
  getAllOrders: () => api.get('/orders/admin'),
  updateOrderStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
};

export const adminAPI = {
  getMetrics: () => api.get('/admin/metrics'),
};

export default api;
