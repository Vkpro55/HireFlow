import axios from 'axios';

const authApi = axios.create({
  baseURL: '/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function register(body) {
  const response = await authApi.post('/register', body);
  return response.data;
}

export async function login(body) {
  const response = await authApi.post('/login', body);
  return response.data;
}
