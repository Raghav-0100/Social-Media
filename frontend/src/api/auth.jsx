// src/api/auth.js

import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach token on every request if present
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const signup        = data => API.post('/auth/signup', data);
export const login         = data => API.post('/auth/login', data);
export const getProfile    = ()   => API.get('/auth/me');
export const updateProfile = data => API.put('/auth/me', data);
