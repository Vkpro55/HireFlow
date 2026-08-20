import { ArrowLeft, Bookmark, CalendarDays, CheckCircle2, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { applyToJob, getMyApplications } from '../api/applications.js';
import { getJob } from '../api/jobs.js';
import { getSavedJobs, toggleSavedJob } from '../api/profile.js';
import ApplicationForm from '../features/applications/ApplicationForm.jsx';
import ApplicationStatusBadge from '../components/applications/ApplicationStatusBadge.jsx';
import Button from '../components/ui/Button.jsx';

function formatDeadline(deadline) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date(deadline));
}

function formatSalary(salaryRange) {
  if (!salaryRange) return 'Salary not listed';
  return `${salaryRange.currency || 'USD'} ${Number(salaryRange.min).toLocaleString()} - ${Number(salaryRange.max).toLocaleString()}`;
}

function CandidateJobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [application, setApplication] = useState(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applyError, setApplyError] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    Promise.allSettled([getJob(id), getMyApplications({ limit: 100 }), getSavedJobs()])
      .then(([jobResult, applicationsResult, savedJobsResult]) => {
        if (jobResult.status === 'rejected') {
          setError(jobResult.reason.response?.data?.message || 'Unable to load this job');
          return;
        }
        setJob(jobResult.value);
        if (applicationsResult.status === 'fulfilled') {
          setApplication(applicationsResult.value.applications.find((item) => item.job?._id === id) || null);
        }
        if (savedJobsResult.status === 'fulfilled') setIsSaved(savedJobsResult.value.some((item) => item._id === id));
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  async function handleApply(values) {
    try {
      setApplyError('');
      setIsSubmitting(true);
      const submittedApplication = await applyToJob({ jobId: id, ...values });
      setApplication(submittedApplication);
      setIsApplyOpen(false);
    } catch (requestError) {
      setApplyError(requestError.response?.data?.message || 'Unable to submit application');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSave() {
    try {
      setIsSaving(true);
      setIsSaved(await toggleSavedJob(id));
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) return <p className="py-12 text-center font-body-base text-body-base text-text-secondary">Loading job details...</p>;
  if (error) return <div className="mx-auto max-w-3xl border border-red-200 bg-red-50 p-6 font-body-base text-body-base text-red-800">{error}</div>;
  if (!job) return null;

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-7">
      <Link className="flex items-center gap-2 self-start font-body-sm text-body-sm text-text-secondary underline" to="/candidate/jobs"><ArrowLeft size={16} aria-hidden="true" /> Back to jobs</Link>
      <div className="border border-border-light bg-bg-white p-5 sm:p-8 md:p-10">
        <div className="flex flex-col gap-5 border-b border-border-light pb-7 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-body-sm text-body-sm text-text-muted">{job.companyName}</p>
            <h1 className="mt-2 wrap-break-word font-display-sm text-display-sm leading-none text-text-primary">{job.title}</h1>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 font-body-sm text-body-sm text-text-secondary">
              <span className="flex items-center gap-2"><MapPin size={16} aria-hidden="true" />{job.location}</span>
              <span className="flex items-center gap-2"><CalendarDays size={16} aria-hidden="true" />Apply by {formatDeadline(job.deadline)}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 self-start"><button className="flex items-center gap-2 rounded-md border border-border-default px-3 py-2 font-body-sm text-body-sm text-text-primary" type="button" onClick={handleSave} disabled={isSaving}><Bookmark size={16} className={isSaved ? 'fill-current' : ''} aria-hidden="true" />{isSaved ? 'Saved' : 'Save job'}</button><span className="rounded-full bg-green-100 px-3 py-1 font-body-xs text-body-xs text-green-800">Open</span></div>
        </div>

        <div className="grid gap-6 border-b border-border-light py-7 sm:grid-cols-3">
          <div><p className="font-body-sm text-body-sm text-text-muted">Employment type</p><p className="mt-1 font-body-base text-body-base text-text-primary">{job.employmentType}</p></div>
          <div><p className="font-body-sm text-body-sm text-text-muted">Experience</p><p className="mt-1 font-body-base text-body-base text-text-primary">{job.experienceRequired}</p></div>
          <div><p className="font-body-sm text-body-sm text-text-muted">Salary range</p><p className="mt-1 font-body-base text-body-base text-text-primary">{formatSalary(job.salaryRange)}</p></div>
        </div>

        <div className="grid gap-8 py-7 md:grid-cols-[1fr_260px]">
          <div>
            <h2 className="font-body-lg-semibold text-body-lg-semibold font-semibold text-text-primary">About the role</h2>
            <p className="mt-4 whitespace-pre-line font-body-base text-body-base leading-7 text-text-secondary">{job.description}</p>
          </div>
          <aside className="h-fit bg-bg-primary p-5">
            <h2 className="font-body-lg-semibold text-body-lg-semibold font-semibold text-text-primary">Required skills</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {job.skills.map((skill) => <li key={skill} className="flex items-center gap-2 font-body-sm text-body-sm text-text-secondary"><CheckCircle2 size={16} className="shrink-0" aria-hidden="true" />{skill}</li>)}
            </ul>
          </aside>
        </div>

        <div className="border-t border-border-light pt-6">
          {application ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="font-body-base-medium text-body-base font-medium text-text-primary">Application submitted</p><p className="mt-1 font-body-sm text-body-sm text-text-secondary">Your application is being reviewed.</p></div>
              <div className="flex items-center gap-3"><ApplicationStatusBadge status={application.status} /><Link className="font-body-sm text-body-sm text-text-primary underline" to="/candidate/applications">View applications</Link></div>
            </div>
          ) : isApplyOpen ? (
            <div className="flex flex-col gap-5">
              <div><h2 className="font-body-lg-semibold text-body-lg-semibold font-semibold text-text-primary">Apply for this role</h2><p className="mt-1 font-body-sm text-body-sm text-text-secondary">Share your resume and a short note with the recruiter.</p></div>
              {applyError ? <p className="border border-red-200 bg-red-50 px-4 py-3 font-body-sm text-body-sm text-red-800">{applyError}</p> : null}
              <ApplicationForm isSubmitting={isSubmitting} onSubmit={handleApply} onCancel={() => setIsApplyOpen(false)} />
            </div>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-body-base-medium text-body-base font-medium text-text-primary">Interested in this role?</p><p className="mt-1 font-body-sm text-body-sm text-text-secondary">Submit your resume and cover letter before the deadline.</p></div><div className="sm:w-48"><Button type="button" onClick={() => setIsApplyOpen(true)}>Apply now</Button></div></div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CandidateJobDetailsPage;