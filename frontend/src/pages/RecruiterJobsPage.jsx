import { Edit3, MoreHorizontal, Plus, Power, Trash2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import { deleteJob, getMyJobs, updateJobStatus } from '../api/jobs.js';

function formatDeadline(deadline) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(deadline));
}

function RecruiterJobsPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');

  async function loadJobs() {
    try {
      setError('');
      setIsLoading(true);
      const response = await getMyJobs();
      setJobs(response.jobs);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to load your jobs');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  async function handleStatusChange(job) {
    try {
      setActionError('');
      const updatedJob = await updateJobStatus(job._id, job.status === 'open' ? 'closed' : 'open');
      setJobs((current) => current.map((item) => (item._id === updatedJob._id ? updatedJob : item)));
    } catch (requestError) {
      setActionError(requestError.response?.data?.message || 'Unable to update job status');
    }
  }

  async function handleDelete(job) {
    if (!window.confirm(`Delete ${job.title}? This action cannot be undone.`)) return;

    try {
      setActionError('');
      await deleteJob(job._id);
      setJobs((current) => current.filter((item) => item._id !== job._id));
    } catch (requestError) {
      setActionError(requestError.response?.data?.message || 'Unable to delete job');
    }
  }

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 font-body-sm text-body-sm uppercase tracking-[1px] text-text-muted">Recruiter workspace</p>
          <h1 className="font-display-sm text-display-sm leading-none text-text-primary">My jobs</h1>
          <p className="mt-4 max-w-xl font-body-base text-body-base text-text-secondary">Create and manage the openings your team is hiring for.</p>
        </div>
        <Link to="/recruiter/jobs/new" className="w-full sm:w-auto">
          <Button type="button"><span className="flex items-center justify-center gap-2"><Plus size={18} aria-hidden="true" />Create job</span></Button>
        </Link>
      </div>

      {actionError ? <p className="border border-red-200 bg-red-50 px-4 py-3 font-body-sm text-body-sm text-red-800">{actionError}</p> : null}
      {error ? <div className="border border-red-200 bg-red-50 p-6"><p className="font-body-base text-body-base text-red-800">{error}</p><button className="mt-3 underline" type="button" onClick={loadJobs}>Try again</button></div> : null}
      {isLoading ? <p className="py-12 text-center font-body-base text-body-base text-text-secondary">Loading your jobs...</p> : null}
      {!isLoading && !error && jobs.length === 0 ? (
        <div className="border border-dashed border-border-default bg-bg-white px-6 py-14 text-center">
          <BriefcaseEmpty />
          <h2 className="mt-4 font-body-lg-semibold text-body-lg-semibold font-semibold text-text-primary">No jobs yet</h2>
          <p className="mx-auto mt-2 max-w-md font-body-base text-body-base text-text-secondary">Create your first opening to start building your hiring pipeline.</p>
          <Link to="/recruiter/jobs/new" className="mt-6 inline-block"><Button type="button">Create your first job</Button></Link>
        </div>
      ) : null}
      {!isLoading && !error && jobs.length > 0 ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {jobs.map((job) => (
            <article key={job._id} className="flex min-w-0 flex-col gap-5 border border-border-light bg-bg-white p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate font-body-sm text-body-sm text-text-muted">{job.companyName}</p>
                  <h2 className="mt-1 break-words font-body-lg-semibold text-body-lg-semibold font-semibold text-text-primary">{job.title}</h2>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 font-body-xs text-body-xs ${job.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                  {job.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-y border-border-light py-4 font-body-sm text-body-sm text-text-secondary sm:grid-cols-3">
                <div><p className="text-text-muted">Location</p><p className="mt-1 break-words text-text-primary">{job.location}</p></div>
                <div><p className="text-text-muted">Type</p><p className="mt-1 break-words text-text-primary">{job.employmentType}</p></div>
                <div><p className="text-text-muted">Deadline</p><p className="mt-1 break-words text-text-primary">{formatDeadline(job.deadline)}</p></div>
              </div>
              <p className="line-clamp-3 font-body-base text-body-base leading-6 text-text-secondary">{job.description}</p>
              <div className="mt-auto flex flex-wrap gap-2">
                <Button type="button" onClick={() => navigate(`/recruiter/jobs/${job._id}/edit`)}><span className="flex items-center justify-center gap-2"><Edit3 size={16} aria-hidden="true" />Edit</span></Button>
                <Link className="flex flex-1 items-center justify-center gap-2 rounded-md border border-border-default px-3 py-3 font-body-sm-medium text-body-sm font-medium text-text-primary" to={`/recruiter/jobs/${job._id}/applications`}><Users size={16} aria-hidden="true" />Applicants</Link>
                <button className="flex flex-1 items-center justify-center gap-2 rounded-md border border-border-default px-3 py-3 font-body-sm-medium text-body-sm font-medium text-text-primary" type="button" onClick={() => handleStatusChange(job)}><Power size={16} aria-hidden="true" />{job.status === 'open' ? 'Close' : 'Open'}</button>
                <button className="flex size-12 items-center justify-center rounded-md border border-red-200 text-red-700" type="button" onClick={() => handleDelete(job)} aria-label={`Delete ${job.title}`}><Trash2 size={17} aria-hidden="true" /></button>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function BriefcaseEmpty() {
  return <MoreHorizontal className="mx-auto text-text-muted" size={28} aria-hidden="true" />;
}

export default RecruiterJobsPage;