import { apiClient } from './client.js';

export async function getMyJobs(params = {}) {
  const { data } = await apiClient.get('/jobs/mine', { params });
  return data;
}

export async function createJob(body) {
  const { data } = await apiClient.post('/jobs', body);
  return data.job;
}

export async function updateJob(id, body) {
  const { data } = await apiClient.put(`/jobs/${id}`, body);
  return data.job;
}

export async function deleteJob(id) {
  await apiClient.delete(`/jobs/${id}`);
}

export async function updateJobStatus(id, status) {
  const { data } = await apiClient.patch(`/jobs/${id}/status`, { status });
  return data.job;
}