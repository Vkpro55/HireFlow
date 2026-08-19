import axios from 'axios';

let accessToken = null;
let currentUser = null;
let refreshPromise = null;

const authApi = axios.create({
  baseURL: '/api/auth',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

function isAuthRequest(url = '') {
  return ['/login', '/register', '/refresh', '/logout'].some((path) => url.endsWith(path));
}

export function setAccessToken(token) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

export function getCurrentUser() {
  return currentUser;
}

function setSession(data) {
  setAccessToken(data.accessToken);
  currentUser = data.user || null;
}

export async function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = authApi
      .post('/refresh')
      .then(({ data }) => {
        setSession(data);
        return data;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

authApi.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isAuthRequest(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      await refreshSession();
      return authApi(originalRequest);
    } catch (refreshError) {
      setAccessToken(null);
      return Promise.reject(refreshError);
    }
  }
);

export async function register(body) {
  const response = await authApi.post('/register', body);
  setSession(response.data);
  return response.data;
}

export async function login(body) {
  const response = await authApi.post('/login', body);
  setSession(response.data);
  return response.data;
}

export async function logout() {
  await authApi.post('/logout');
  setAccessToken(null);
  currentUser = null;
}
