import mongoose from 'mongoose';
import { JOB_STATUS } from '../constants/jobs.js';
import { Job } from '../models/Job.js';

function createError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function ensureObjectId(id) {
  if (!mongoose.isValidObjectId(id)) throw createError('Invalid job id', 400);
}

function normalizeJobInput(data) {
  const { status, postedBy, ...input } = data;
  if (Array.isArray(input.skills)) {
    input.skills = [...new Set(input.skills.map((skill) => String(skill).trim()).filter(Boolean))];
  }
  if (input.salaryRange) {
    input.salaryRange = {
      ...input.salaryRange,
      min: Number(input.salaryRange.min),
      max: Number(input.salaryRange.max),
    };
  }
  return input;
}

async function findOwnedJob(jobId, recruiterId) {
  ensureObjectId(jobId);
  const job = await Job.findOne({ _id: jobId, postedBy: recruiterId });
  if (!job) throw createError('Job not found', 404);
  return job;
}

export async function createJob(data, recruiterId) {
  return Job.create({ ...normalizeJobInput(data), postedBy: recruiterId });
}

export async function listJobs(query = {}, recruiterId = null) {
  const filters = recruiterId ? { postedBy: recruiterId } : { status: JOB_STATUS.OPEN };
  const search = String(query.search || '').trim();
  if (search) {
    const pattern = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filters.$or = [{ title: pattern }, { companyName: pattern }, { description: pattern }];
  }
  if (query.location) filters.location = new RegExp(String(query.location).trim(), 'i');
  if (query.experience) filters.experienceRequired = new RegExp(String(query.experience).trim(), 'i');
  if (query.employmentType) filters.employmentType = query.employmentType;
  if (recruiterId && query.status) filters.status = query.status;

  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(query.limit, 10) || 20, 1), 100);
  const [jobs, total] = await Promise.all([
    Job.find(filters).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).populate('postedBy', 'name email'),
    Job.countDocuments(filters),
  ]);

  return { jobs, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
}

export async function getJob(jobId) {
  ensureObjectId(jobId);
  const job = await Job.findOne({ _id: jobId, status: JOB_STATUS.OPEN }).populate('postedBy', 'name email');
  if (!job) throw createError('Job not found', 404);
  return job;
}

export async function updateJob(jobId, data, recruiterId) {
  const job = await findOwnedJob(jobId, recruiterId);
  Object.assign(job, normalizeJobInput(data));
  return job.save();
}

export async function deleteJob(jobId, recruiterId) {
  const job = await findOwnedJob(jobId, recruiterId);
  await job.deleteOne();
}

export async function updateJobStatus(jobId, status, recruiterId) {
  const job = await findOwnedJob(jobId, recruiterId);
  job.status = status;
  return job.save();
}