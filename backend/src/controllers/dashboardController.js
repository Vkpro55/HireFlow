import * as dashboardService from '../services/dashboardService.js';

function sendError(res, error) {
  return res.status(error.status || 500).json({ message: error.message || 'Unable to load dashboard' });
}

export async function candidateDashboard(req, res) {
  try {
    return res.status(200).json(await dashboardService.getCandidateDashboard(req.user.id));
  } catch (error) {
    return sendError(res, error);
  }
}

export async function recruiterDashboard(req, res) {
  try {
    return res.status(200).json(await dashboardService.getRecruiterDashboard(req.user.id));
  } catch (error) {
    return sendError(res, error);
  }
}