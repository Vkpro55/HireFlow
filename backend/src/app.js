import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

const app = express();

app.use(cors({ origin: env.frontendOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

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
