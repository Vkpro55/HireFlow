import mongoose from 'mongoose';
import { EMPLOYMENT_TYPES, JOB_STATUS } from '../constants/jobs.js';

const salaryRangeSchema = new mongoose.Schema(
  {
    min: { type: Number, required: true, min: 0 },
    max: { type: Number, required: true, min: 0 },
    currency: { type: String, trim: true, uppercase: true, default: 'USD' },
  },
  { _id: false }
);

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      maxlength: 120,
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
      trim: true,
      maxlength: 10000,
    },
    employmentType: {
      type: String,
      required: [true, 'Employment type is required'],
      enum: EMPLOYMENT_TYPES,
    },
    experienceRequired: {
      type: String,
      required: [true, 'Experience required is required'],
      trim: true,
      maxlength: 100,
    },
    salaryRange: {
      type: salaryRangeSchema,
      required: [true, 'Salary range is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      maxlength: 120,
    },
    skills: {
      type: [String],
      required: true,
      validate: {
        validator: (skills) => skills.length > 0 && skills.every((skill) => skill.trim()),
        message: 'At least one required skill is needed',
      },
    },
    deadline: {
      type: Date,
      required: [true, 'Application deadline is required'],
    },
    status: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.OPEN,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

jobSchema.index({ status: 1, createdAt: -1 });
jobSchema.index({ title: 'text', companyName: 'text', description: 'text' });

export const Job = mongoose.model('Job', jobSchema);