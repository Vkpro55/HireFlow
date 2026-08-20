import { apiClient } from './client.js';

export async function getCandidateDashboard() {
  const { data } = await apiClient.get('/dashboard/candidate');
  return data;
}

export async function getRecruiterDashboard() {
  const { data } = await apiClient.get('/dashboard/recruiter');
  return data;
}