import { Link } from 'react-router-dom';
import ApplicationStatusBadge from '../applications/ApplicationStatusBadge.jsx';

function formatDate(value) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value));
}

function ActivityList({ items, recruiter = false }) {
  if (!items.length) return <p className="font-body-base text-body-base text-text-secondary">No recent activity yet.</p>;

  return (
    <div className="flex flex-col divide-y divide-border-light">
      {items.map((item) => {
        const title = recruiter ? item.candidate?.name : item.job?.title;
        const subtitle = recruiter ? item.job?.title : item.job?.companyName;
        return (
          <div key={item._id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="truncate font-body-base-medium text-body-base font-medium text-text-primary">{title}</p>
              <p className="mt-1 truncate font-body-sm text-body-sm text-text-secondary">{subtitle} · {formatDate(item.appliedAt)}</p>
            </div>
            <div className="flex items-center gap-3">
              <ApplicationStatusBadge status={item.status} />
              {recruiter ? <Link className="font-body-sm text-body-sm text-text-primary underline" to={`/recruiter/jobs/${item.job?._id}/applications`}>Review</Link> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ActivityList;