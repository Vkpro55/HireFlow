import bcrypt from 'bcryptjs';
import { ROLES } from '../constants/roles.js';
import { User } from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

function toPublicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

function sanitizeRole(role) {
  return role === ROLES.RECRUITER ? ROLES.RECRUITER : ROLES.CANDIDATE;
}

function toAuthResult(user) {
  return {
    token: generateToken(user),
    user: toPublicUser(user),
  };
}

export async function register({ name, email, password, role }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('User already exists');
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: sanitizeRole(role),
  });

  return toAuthResult(user);
}

export async function login({ email, password }) {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }

  return toAuthResult(user);
}
