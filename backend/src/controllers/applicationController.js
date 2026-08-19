import * as applicationService from '../services/applicationService.js';

function sendError(res, error) {
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(({ message }) => message);
    return res.status(400).json({ message: errors[0] || 'Invalid application data', errors });
  }
  if (error.code === 11000) {
    return res.status(409).json({ message: 'You have already applied to this job' });
  }
  return res.status(error.status || 500).json({ message: error.message || 'Server error' });
}

export async function applyToJob(req, res) {
  try {
    const application = await applicationService.applyToJob(req.body, req.user.id);
    return res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function listMyApplications(req, res) {
  try {
    const result = await applicationService.listMyApplications(req.user.id, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return sendError(res, error);
  }
}

export async function listJobApplications(req, res) {
  try {
    const result = await applicationService.listJobApplications(req.params.jobId, req.user.id, req.query);
    return res.status(200).json(result);
  } catch (error) {
    return sendError(res, error);
  }
}

export async function updateApplicationStatus(req, res) {
  try {
    const application = await applicationService.updateApplicationStatus(
      req.params.id,
      req.body.status,
      req.user.id
    );
    return res.status(200).json({ message: 'Application status updated successfully', application });
  } catch (error) {
    return sendError(res, error);
  }
}