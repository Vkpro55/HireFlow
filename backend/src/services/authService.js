import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';
import { ROLES } from '../constants/roles.js';
import { RefreshToken } from '../models/RefreshToken.js';
import { User } from '../models/User.js';
import { createRefreshToken, createTokenFamilyId, hashRefreshToken } from '../utils/refreshToken.js';
import { generateAccessToken } from '../utils/generateToken.js';

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
    accessToken: generateAccessToken(user),
    user: toPublicUser(user),
  };
}

async function issueSession(user, remember) {
  const refreshToken = createRefreshToken();
  const refreshDays = remember ? env.rememberedRefreshTokenDays : env.refreshTokenDays;

  await RefreshToken.create({
    user: user._id,
    tokenHash: refreshToken.hash,
    familyId: createTokenFamilyId(),
    expiresAt: new Date(Date.now() + refreshDays * 24 * 60 * 60 * 1000),
    remember,
  });

  return {
    ...toAuthResult(user),
    refreshToken: refreshToken.token,
    refreshDays,
  };
}

export async function register({ name, email, password, role, remember = false }) {
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

  return issueSession(user, remember);
}

export async function login({ email, password, remember = false }) {
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

  return issueSession(user, remember);
}

export async function refreshSession(token) {
  const tokenHash = hashRefreshToken(token);
  const storedToken = await RefreshToken.findOne({ tokenHash }).populate('user');

  if (!storedToken) {
    throw new Error('Invalid refresh token');
  }

  if (storedToken.revokedAt || storedToken.expiresAt <= new Date()) {
    if (storedToken.revokedAt) {
      await RefreshToken.updateMany(
        { familyId: storedToken.familyId, revokedAt: null },
        { revokedAt: new Date() }
      );
    }
    throw new Error('Invalid or expired refresh token');
  }

  const replacement = createRefreshToken();
  storedToken.revokedAt = new Date();
  storedToken.replacedByHash = replacement.hash;
  await storedToken.save();

  await RefreshToken.create({
    user: storedToken.user._id,
    tokenHash: replacement.hash,
    familyId: storedToken.familyId,
    expiresAt: storedToken.expiresAt,
    remember: storedToken.remember,
  });

  return {
    ...toAuthResult(storedToken.user),
    refreshToken: replacement.token,
    refreshDays: storedToken.remember ? env.rememberedRefreshTokenDays : undefined,
  };
}

export async function revokeRefreshSession(token) {
  const tokenHash = hashRefreshToken(token);
  await RefreshToken.updateOne(
    { tokenHash, revokedAt: null },
    { revokedAt: new Date() }
  );
}
