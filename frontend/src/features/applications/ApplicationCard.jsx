import { CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import ApplicationStatusBadge from '../../components/applications/ApplicationStatusBadge.jsx';

function formatDate(date) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(date));
}

function ApplicationCard({ application, recruiter = false, onStatusChange, isUpdating }) {
  const job = application.job;
  return (
    <article className="flex min-w-0 flex-col gap-5 border border-border-light bg-bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          {recruiter ? <p className="truncate font-body-sm text-body-sm text-text-muted">{application.candidate?.email}</p> : <p className="truncate font-body-sm text-body-sm text-text-muted">{job?.companyName}</p>}
          <h2 className="mt-1 wrap-break-word font-body-lg-semibold text-body-lg-semibold font-semibold text-text-primary">{recruiter ? application.candidate?.name : job?.title}</h2>
        </div>
        <ApplicationStatusBadge status={application.status} />
      </div>
      {recruiter ? (
        <p className="font-body-sm text-body-sm text-text-secondary">Applied {formatDate(application.appliedAt)}</p>
      ) : (
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-body-sm text-body-sm text-text-secondary">
          <span className="flex items-center gap-2"><MapPin size={15} aria-hidden="true" />{job?.location}</span>
          <span className="flex items-center gap-2"><CalendarDays size={15} aria-hidden="true" />Applied {formatDate(application.appliedAt)}</span>
        </div>
      )}
      {recruiter ? (
        <div className="flex flex-col gap-3 border-t border-border-light pt-4 sm:flex-row sm:items-center sm:justify-between">
          <a className="truncate font-body-sm text-body-sm text-text-primary underline" href={application.resumeUrl} target="_blank" rel="noreferrer">View resume</a>
          <select className="rounded-md border border-border-default bg-input-bg px-3 py-2 font-body-sm text-body-sm text-text-primary" value={application.status} onChange={(event) => onStatusChange(application, event.target.value)} disabled={isUpdating} aria-label={`Update status for ${application.candidate?.name}`}>
            <option value="applied">Applied</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interview-scheduled">Interview scheduled</option>
            <option value="rejected">Rejected</option>
            <option value="selected">Selected</option>
          </select>
        </div>
      ) : (
        <Link className="self-start font-body-sm-medium text-body-sm font-medium text-text-primary underline" to={`/candidate/jobs/${job?._id}`}>View job</Link>
      )}
    </article>
  );
}

export default ApplicationCard;
