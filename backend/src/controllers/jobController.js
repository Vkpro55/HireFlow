import * as jobService from '../services/jobService.js';

function sendError(res, error) {
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(({ message }) => message);
    return res.status(400).json({ message: errors[0] || 'Invalid job data', errors });
  }
  if (error.code === 11000) {
    return res.status(409).json({ message: 'A job with these details already exists' });
  }
  return res.status(error.status || 500).json({ message: error.message || 'Server error' });
}

export async function createJob(req, res) {
  try {
    const job = await jobService.createJob(req.body, req.user.id);
    return res.status(201).json({ message: 'Job created successfully', job });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function listJobs(req, res) {
  try {
    const result = await jobService.listJobs(req.query);
    return res.status(200).json(result);
  } catch (error) {
    return sendError(res, error);
  }
}

export async function listMyJobs(req, res) {
  try {
    const result = await jobService.listJobs(req.query, req.user.id);
    return res.status(200).json(result);
  } catch (error) {
    return sendError(res, error);
  }
}

export async function getJob(req, res) {
  try {
    const job = await jobService.getJob(req.params.id);
    return res.status(200).json({ job });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function updateJob(req, res) {
  try {
    const job = await jobService.updateJob(req.params.id, req.body, req.user.id);
    return res.status(200).json({ message: 'Job updated successfully', job });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function deleteJob(req, res) {
  try {
    await jobService.deleteJob(req.params.id, req.user.id);
    return res.status(204).send();
  } catch (error) {
    return sendError(res, error);
  }
}

export async function updateJobStatus(req, res) {
  try {
    const job = await jobService.updateJobStatus(req.params.id, req.body.status, req.user.id);
    return res.status(200).json({ message: 'Job status updated successfully', job });
  } catch (error) {
    return sendError(res, error);
  }
}