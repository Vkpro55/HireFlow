import crypto from 'node:crypto';

export function createRefreshToken() {
  const token = crypto.randomBytes(48).toString('base64url');
  return {
    token,
    hash: hashRefreshToken(token),
  };
}

export function hashRefreshToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function createTokenFamilyId() {
  return crypto.randomUUID();
}