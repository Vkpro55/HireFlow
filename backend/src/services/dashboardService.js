import mongoose from 'mongoose';
import { APPLICATION_STATUS } from '../constants/applications.js';
import { JOB_STATUS } from '../constants/jobs.js';
import { Application } from '../models/Application.js';
import { Job } from '../models/Job.js';

function toObjectId(id) {
  return new mongoose.Types.ObjectId(id);
}

export async function getCandidateDashboard(candidateId) {
  const candidateObjectId = toObjectId(candidateId);
  const applications = await Application.find({ candidate: candidateObjectId })
    .sort({ appliedAt: -1 })
    .limit(5)
    .populate('job', 'title companyName deadline location');

  const [totalApplications, statusCounts, upcomingDeadlines] = await Promise.all([
    Application.countDocuments({ candidate: candidateObjectId }),
    Application.aggregate([
      { $match: { candidate: candidateObjectId } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Application.find({ candidate: candidateObjectId })
      .populate({ path: 'job', match: { deadline: { $gte: new Date() }, status: JOB_STATUS.OPEN }, select: 'title companyName deadline' })
      .sort({ appliedAt: -1 })
      .limit(5),
  ]);

  return {
    metrics: {
      totalApplications,
      savedJobs: 0,
      upcomingDeadlines: upcomingDeadlines.filter(({ job }) => job).length,
    },
    statusCounts: statusCounts.reduce((result, item) => ({ ...result, [item._id]: item.count }), {}),
    upcomingDeadlines: upcomingDeadlines.filter(({ job }) => job).map(({ job }) => job),
    recentActivity: applications,
  };
}

export async function getRecruiterDashboard(recruiterId) {
  const recruiterObjectId = toObjectId(recruiterId);
  const jobs = await Job.find({ postedBy: recruiterObjectId }).select('_id title companyName status createdAt');
  const jobIds = jobs.map(({ _id }) => _id);

  const [totalApplications, statusCounts, recentApplications] = await Promise.all([
    Application.countDocuments({ job: { $in: jobIds } }),
    Application.aggregate([
      { $match: { job: { $in: jobIds } } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Application.find({ job: { $in: jobIds } })
      .sort({ appliedAt: -1 })
      .limit(5)
      .populate('candidate', 'name email')
      .populate('job', 'title'),
  ]);

  const statusMap = statusCounts.reduce((result, item) => ({ ...result, [item._id]: item.count }), {});
  const activeJobs = jobs.filter(({ status }) => status === JOB_STATUS.OPEN);

  return {
    metrics: {
      activeJobs: activeJobs.length,
      totalApplications,
      openPositions: activeJobs.length,
      recentCandidates: recentApplications.length,
    },
    hiringStatistics: {
      applied: statusMap[APPLICATION_STATUS.APPLIED] || 0,
      shortlisted: statusMap[APPLICATION_STATUS.SHORTLISTED] || 0,
      interviewScheduled: statusMap[APPLICATION_STATUS.INTERVIEW_SCHEDULED] || 0,
      rejected: statusMap[APPLICATION_STATUS.REJECTED] || 0,
      selected: statusMap[APPLICATION_STATUS.SELECTED] || 0,
    },
    recentCandidates: recentApplications,
    jobs: activeJobs,
  };
}