import {
  getAccessToken,
  login as loginRequest,
  logout as logoutRequest,
  refreshSession,
  register as registerRequest,
} from '../api/auth.js';

export function register(body) {
  return registerRequest(body);
}

export function login(body) {
  return loginRequest(body);
}

export function restoreSession() {
  return refreshSession();
}

export function getSessionToken() {
  return getAccessToken();
}

export function logout() {
  return logoutRequest();
}
