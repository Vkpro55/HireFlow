import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Job } from '../models/Job.js';

function objectId(id, label) {
  if (!mongoose.isValidObjectId(id)) {
    const error = new Error(`Invalid ${label}`);
    error.status = 400;
    throw error;
  }
  return id;
}

function publicProfile(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    headline: user.headline,
    bio: user.bio,
    skills: user.skills,
    experience: user.experience,
    education: user.education,
  };
}

export async function getProfile(userId) {
  const user = await User.findById(userId);
  return publicProfile(user);
}

export async function updateProfile(userId, data) {
  const allowed = ['name', 'headline', 'bio', 'skills', 'experience', 'education'];
  const updates = Object.fromEntries(Object.entries(data).filter(([key]) => allowed.includes(key)));
  for (const key of ['skills', 'experience', 'education']) {
    if (Array.isArray(updates[key])) updates[key] = [...new Set(updates[key].map((item) => String(item).trim()).filter(Boolean))];
  }
  if (updates.name) updates.name = updates.name.trim();
  const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
  return publicProfile(user);
}

export async function toggleSavedJob(userId, jobId) {
  objectId(jobId, 'job id');
  const job = await Job.findOne({ _id: jobId, status: 'open' });
  if (!job) {
    const error = new Error('Open job not found');
    error.status = 404;
    throw error;
  }
  const user = await User.findById(userId);
  const saved = user.savedJobs.some((savedId) => savedId.toString() === jobId);
  user.savedJobs = saved ? user.savedJobs.filter((savedId) => savedId.toString() !== jobId) : [...user.savedJobs, jobId];
  await user.save();
  return { saved: !saved };
}

export async function listSavedJobs(userId) {
  const user = await User.findById(userId).populate({ path: 'savedJobs', match: { status: 'open' }, options: { sort: { createdAt: -1 } } });
  return user.savedJobs;
}