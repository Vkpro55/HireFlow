import { login as loginRequest, register as registerRequest } from '../api/auth.js';

const TOKEN_KEY = 'hireflow_token';
const USER_KEY = 'hireflow_user';

export function saveSession({ token, user }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function register(body) {
  return registerRequest(body);
}

export function login(body) {
  return loginRequest(body);
}
