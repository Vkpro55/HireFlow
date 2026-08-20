import * as profileService from '../services/profileService.js';

function sendError(res, error) {
  return res.status(error.status || 500).json({ message: error.message || 'Profile request failed' });
}

export async function getProfile(req, res) {
  try { return res.status(200).json({ profile: await profileService.getProfile(req.user.id) }); } catch (error) { return sendError(res, error); }
}

export async function updateProfile(req, res) {
  try { return res.status(200).json({ profile: await profileService.updateProfile(req.user.id, req.body) }); } catch (error) { return sendError(res, error); }
}

export async function toggleSavedJob(req, res) {
  try { return res.status(200).json(await profileService.toggleSavedJob(req.user.id, req.params.jobId)); } catch (error) { return sendError(res, error); }
}

export async function listSavedJobs(req, res) {
  try { return res.status(200).json({ jobs: await profileService.listSavedJobs(req.user.id) }); } catch (error) { return sendError(res, error); }
}