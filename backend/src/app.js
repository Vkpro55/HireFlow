import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors({ origin: env.frontendOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);

async function start() {
  await connectDb();
  app.listen(env.port, () => {
    console.log(`HireFlow API listening on port ${env.port}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});

export default app;
