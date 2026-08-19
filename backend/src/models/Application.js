import mongoose from 'mongoose';
import { APPLICATION_STATUS, APPLICATION_STATUSES } from '../constants/applications.js';

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
      index: true,
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    resumeUrl: {
      type: String,
      required: [true, 'Resume URL is required'],
      trim: true,
      maxlength: 2000,
    },
    coverLetter: {
      type: String,
      required: [true, 'Cover letter is required'],
      trim: true,
      maxlength: 5000,
    },
    status: {
      type: String,
      enum: APPLICATION_STATUSES,
      default: APPLICATION_STATUS.APPLIED,
      index: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

applicationSchema.index({ job: 1, candidate: 1 }, { unique: true });
applicationSchema.index({ candidate: 1, appliedAt: -1 });

export const Application = mongoose.model('Application', applicationSchema);