import mongoose from 'mongoose';
import { APPLICATION_STATUSES } from '../constants/applications.js';

export function validateApply(req, res, next) {
  const { jobId, resumeUrl, coverLetter } = req.body;
  const errors = [];

  if (!jobId || !mongoose.isValidObjectId(jobId)) errors.push('Valid job id is required');
  if (!resumeUrl?.trim()) errors.push('Resume URL is required');
  if (!coverLetter?.trim()) errors.push('Cover letter is required');

  if (errors.length) return res.status(400).json({ message: errors[0], errors });
  next();
}

export function validateApplicationStatus(req, res, next) {
  if (!APPLICATION_STATUSES.includes(req.body.status)) {
    return res.status(400).json({
      message: `Status must be one of: ${APPLICATION_STATUSES.join(', ')}`,
    });
  }
  next();
}