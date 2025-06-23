import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL});
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (data) => API.post('/posts', data);
export const likePost   = (id)   => API.post(`/posts/${id}/like`);