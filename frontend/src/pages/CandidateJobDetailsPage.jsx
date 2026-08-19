import { ArrowLeft, CalendarDays, CheckCircle2, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getJob } from '../api/jobs.js';

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

  useEffect(() => {
    getJob(id)
      .then(setJob)
      .catch((requestError) => setError(requestError.response?.data?.message || 'Unable to load this job'))
      .finally(() => setIsLoading(false));
  }, [id]);

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
          <span className="self-start rounded-full bg-green-100 px-3 py-1 font-body-xs text-body-xs text-green-800">Open</span>
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
          <p className="font-body-base text-body-base text-text-secondary">Applications will be available in the next step.</p>
        </div>
      </div>
    </section>
  );
}

export default CandidateJobDetailsPage;