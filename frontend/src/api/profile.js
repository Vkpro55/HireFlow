import { apiClient } from './client.js';

export async function getProfile() {
  const { data } = await apiClient.get('/profile');
  return data.profile;
}

export async function updateProfile(body) {
  const { data } = await apiClient.put('/profile', body);
  return data.profile;
}

export async function getSavedJobs() {
  const { data } = await apiClient.get('/profile/saved-jobs');
  return data.jobs;
}

export async function toggleSavedJob(jobId) {
  const { data } = await apiClient.patch(`/profile/saved-jobs/${jobId}`);
  return data.saved;
}
