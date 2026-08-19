import * as authService from '../services/authService.js';

export async function register(req, res) {
  try {
    const result = await authService.register(req.body);
    return res.status(201).json({
      message: 'Registered successfully',
      ...result,
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
      ...result,
    });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || 'Server error' });
  }
}
