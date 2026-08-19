import { ArrowLeft, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getJobApplications, updateApplicationStatus } from '../api/applications.js';
import { getMyJobs } from '../api/jobs.js';
import ApplicationCard from '../features/applications/ApplicationCard.jsx';

function RecruiterApplicationsPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let isCurrent = true;
    Promise.all([getMyJobs({ limit: 100 }), getJobApplications(jobId, { limit: 100 })])
      .then(([jobsResponse, applicationsResponse]) => {
        if (!isCurrent) return;
        setJob(jobsResponse.jobs.find((item) => item._id === jobId) || null);
        setApplications(applicationsResponse.applications);
      })
      .catch((requestError) => {
        if (isCurrent) setError(requestError.response?.data?.message || 'Unable to load applicants');
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });
    return () => { isCurrent = false; };
  }, [jobId]);

  async function handleStatusChange(application, status) {
    try {
      setUpdatingId(application._id);
      setError('');
      const updatedApplication = await updateApplicationStatus(application._id, status);
      setApplications((current) => current.map((item) => item._id === updatedApplication._id ? { ...item, status: updatedApplication.status } : item));
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to update application status');
    } finally {
      setUpdatingId('');
    }
  }

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-7">
      <Link className="flex items-center gap-2 self-start font-body-sm text-body-sm text-text-secondary underline" to="/recruiter/jobs"><ArrowLeft size={16} aria-hidden="true" /> Back to jobs</Link>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 font-body-sm text-body-sm uppercase tracking-[1px] text-text-muted">Recruiter workspace</p>
          <h1 className="wrap-break-word font-display-sm text-display-sm leading-none text-text-primary">{job?.title || 'Applicants'}</h1>
          <p className="mt-4 font-body-base text-body-base text-text-secondary">Review candidates and move them through your hiring process.</p>
        </div>
        <div className="flex items-center gap-2 font-body-base text-body-base text-text-secondary"><Users size={18} aria-hidden="true" /> {applications.length} applicants</div>
      </div>
      {error ? <div className="border border-red-200 bg-red-50 p-6 font-body-base text-body-base text-red-800">{error}</div> : null}
      {isLoading ? <p className="py-12 text-center font-body-base text-body-base text-text-secondary">Loading applicants...</p> : null}
      {!isLoading && !error && applications.length === 0 ? <div className="border border-dashed border-border-default bg-bg-white px-6 py-14 text-center"><h2 className="font-body-lg-semibold text-body-lg-semibold font-semibold text-text-primary">No applicants yet</h2><p className="mx-auto mt-2 max-w-md font-body-base text-body-base text-text-secondary">Candidates who apply to this job will appear here.</p></div> : null}
      {!isLoading && !error && applications.length > 0 ? <div className="grid gap-5 md:grid-cols-2">{applications.map((application) => <ApplicationCard key={application._id} application={application} recruiter onStatusChange={handleStatusChange} isUpdating={updatingId === application._id} />)}</div> : null}
    </section>
  );
}

export default RecruiterApplicationsPage;
