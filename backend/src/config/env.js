import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  refreshTokenDays: Number(process.env.REFRESH_TOKEN_DAYS) || 1,
  rememberedRefreshTokenDays: Number(process.env.REMEMBERED_REFRESH_TOKEN_DAYS) || 30,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
};
