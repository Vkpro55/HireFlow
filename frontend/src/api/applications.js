import { apiClient } from './client.js';

export async function applyToJob(body) {
  const { data } = await apiClient.post('/applications', body);
  return data.application;
}

export async function getMyApplications(params = {}) {
  const { data } = await apiClient.get('/applications/my', { params });
  return data;
}

export async function getJobApplications(jobId, params = {}) {
  const { data } = await apiClient.get(`/applications/job/${jobId}`, { params });
  return data;
}

export async function updateApplicationStatus(id, status) {
  const { data } = await apiClient.patch(`/applications/${id}/status`, { status });
  return data.application;
}
