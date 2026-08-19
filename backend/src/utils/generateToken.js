import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function generateAccessToken(user) {
  if (!env.jwtSecret) {
    throw new Error('JWT_SECRET is not set');
  }

  return jwt.sign({ id: user._id, role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
}
