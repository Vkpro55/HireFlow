import { createContext, useContext, useEffect, useState } from 'react';
import {
  getSessionUser,
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
  restoreSession,
} from '../services/auth.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSessionUser);
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    restoreSession()
      .then(({ user: restoredUser }) => setUser(restoredUser))
      .catch(() => setUser(null))
      .finally(() => setIsRestoring(false));
  }, []);

  async function login(body) {
    const response = await loginRequest(body);
    setUser(response.user);
    return response;
  }

  async function register(body) {
    const response = await registerRequest(body);
    setUser(response.user);
    return response;
  }

  async function logout() {
    await logoutRequest();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isRestoring, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}