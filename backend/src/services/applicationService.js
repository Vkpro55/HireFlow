import mongoose from 'mongoose';
import { APPLICATION_STATUS } from '../constants/applications.js';
import { JOB_STATUS } from '../constants/jobs.js';
import { Application } from '../models/Application.js';
import { Job } from '../models/Job.js';

function createError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function ensureObjectId(id, label) {
  if (!mongoose.isValidObjectId(id)) throw createError(`Invalid ${label}`, 400);
}

export async function applyToJob({ jobId, resumeUrl, coverLetter }, candidateId) {
  ensureObjectId(jobId, 'job id');

  const job = await Job.findOne({ _id: jobId, status: JOB_STATUS.OPEN });
  if (!job) throw createError('Job is not available for applications', 404);
  if (job.deadline <= new Date()) throw createError('The application deadline has passed', 400);

  const existingApplication = await Application.exists({ job: jobId, candidate: candidateId });
  if (existingApplication) throw createError('You have already applied to this job', 409);

  try {
    return await Application.create({
      job: jobId,
      candidate: candidateId,
      resumeUrl: resumeUrl.trim(),
      coverLetter: coverLetter.trim(),
      status: APPLICATION_STATUS.APPLIED,
    });
  } catch (error) {
    if (error.code === 11000) throw createError('You have already applied to this job', 409);
    throw error;
  }
}

export async function listMyApplications(candidateId, query = {}) {
  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(query.limit, 10) || 20, 1), 100);
  const filters = { candidate: candidateId };
  if (query.status) filters.status = query.status;

  const [applications, total] = await Promise.all([
    Application.find(filters)
      .sort({ appliedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('job', 'title companyName location employmentType deadline status'),
    Application.countDocuments(filters),
  ]);

  return { applications, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
}

export async function listJobApplications(jobId, recruiterId, query = {}) {
  ensureObjectId(jobId, 'job id');
  const job = await Job.findOne({ _id: jobId, postedBy: recruiterId });
  if (!job) throw createError('Job not found', 404);

  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(query.limit, 10) || 20, 1), 100);
  const filters = { job: jobId };
  if (query.status) filters.status = query.status;

  const [applications, total] = await Promise.all([
    Application.find(filters)
      .sort({ appliedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('candidate', 'name email role'),
    Application.countDocuments(filters),
  ]);

  return { applications, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
}

export async function updateApplicationStatus(applicationId, status, recruiterId) {
  ensureObjectId(applicationId, 'application id');

  const application = await Application.findById(applicationId);
  if (!application) throw createError('Application not found', 404);

  const ownsJob = await Job.exists({ _id: application.job, postedBy: recruiterId });
  if (!ownsJob) throw createError('Application not found', 404);

  application.status = status;
  return application.save();
}