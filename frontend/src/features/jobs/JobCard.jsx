import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

function formatDeadline(deadline) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(deadline));
}

function formatSalary(salaryRange) {
  if (!salaryRange) return 'Salary not listed';
  return `${salaryRange.currency || 'USD'} ${Number(salaryRange.min).toLocaleString()} - ${Number(salaryRange.max).toLocaleString()}`;
}

function JobCard({ job }) {
  return (
    <article className="flex min-w-0 flex-col gap-5 border border-border-light bg-bg-white p-5 transition-colors hover:border-border-default sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate font-body-sm text-body-sm text-text-muted">{job.companyName}</p>
          <h2 className="mt-1 break-words font-body-lg-semibold text-body-lg-semibold font-semibold text-text-primary">{job.title}</h2>
        </div>
        <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 font-body-xs text-body-xs text-green-800">Open</span>
      </div>

      <div className="grid grid-cols-2 gap-3 font-body-sm text-body-sm text-text-secondary">
        <span className="flex min-w-0 items-center gap-2"><MapPin size={15} className="shrink-0" aria-hidden="true" /><span className="truncate">{job.location}</span></span>
        <span className="flex min-w-0 items-center gap-2"><CalendarDays size={15} className="shrink-0" aria-hidden="true" /><span className="truncate">Due {formatDeadline(job.deadline)}</span></span>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-bg-primary px-3 py-1 font-body-xs text-body-xs text-text-secondary">{job.employmentType}</span>
        <span className="rounded-full bg-bg-primary px-3 py-1 font-body-xs text-body-xs text-text-secondary">{job.experienceRequired}</span>
      </div>

      <div className="mt-auto flex items-center justify-between gap-4 border-t border-border-light pt-4">
        <p className="truncate font-body-sm-medium text-body-sm font-medium text-text-primary">{formatSalary(job.salaryRange)}</p>
        <Link className="flex shrink-0 items-center gap-1 font-body-sm-medium text-body-sm font-medium text-text-primary underline" to={`/candidate/jobs/${job._id}`}>
          View details <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default JobCard;