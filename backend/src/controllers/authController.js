import * as authService from '../services/authService.js';

const REFRESH_COOKIE = 'hireflow_refresh_token';

function refreshCookieOptions(maxAge) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api/auth',
    ...(maxAge ? { maxAge } : {}),
  };
}

function sendSession(res, result) {
  const { refreshToken, refreshDays, ...response } = result;
  const maxAge = refreshDays ? refreshDays * 24 * 60 * 60 * 1000 : undefined;
  res.cookie(REFRESH_COOKIE, refreshToken, refreshCookieOptions(maxAge));
  return response;
}

export async function register(req, res) {
  try {
    const result = await authService.register(req.body);
    return res.status(201).json({
      message: 'Registered successfully',
      ...sendSession(res, result),
    });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || 'Server error' });
  }
}

export async function login(req, res) {
  try {
    const result = await authService.login(req.body);
    return res.status(200).json({
      message: 'Login successful',
      ...sendSession(res, result),
    });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || 'Server error' });
  }
}

export async function refresh(req, res) {
  try {
    const token = req.cookies[REFRESH_COOKIE];
    if (!token) {
      return res.status(401).json({ message: 'Refresh token is required' });
    }

    const result = await authService.refreshSession(token);
    return res.status(200).json(sendSession(res, result));
  } catch (err) {
    return res.status(401).json({ message: err.message || 'Unable to refresh session' });
  }
}

export async function logout(req, res) {
  const token = req.cookies[REFRESH_COOKIE];
  if (token) {
    await authService.revokeRefreshSession(token);
  }

  res.clearCookie(REFRESH_COOKIE, refreshCookieOptions());
  return res.status(204).send();
}
