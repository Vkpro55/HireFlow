import { useEffect, useState } from 'react';
import { getMyApplications } from '../api/applications.js';
import ApplicationCard from '../features/applications/ApplicationCard.jsx';
import SelectField from '../components/ui/SelectField.jsx';

const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'applied', label: 'Applied' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'interview-scheduled', label: 'Interview scheduled' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'selected', label: 'Selected' },
];

function CandidateApplicationsPage() {
  const [status, setStatus] = useState('');
  const [applications, setApplications] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);
    setError('');
    getMyApplications({ status: status || undefined, limit: 12 })
      .then((response) => {
        if (!isCurrent) return;
        setApplications(response.applications);
        setPagination(response.pagination);
      })
      .catch((requestError) => {
        if (isCurrent) setError(requestError.response?.data?.message || 'Unable to load applications');
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });
    return () => { isCurrent = false; };
  }, [status]);

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 font-body-sm text-body-sm uppercase tracking-[1px] text-text-muted">Candidate workspace</p>
          <h1 className="font-display-sm text-display-sm leading-none text-text-primary">My applications</h1>
          <p className="mt-4 max-w-xl font-body-base text-body-base text-text-secondary">Keep track of every opportunity and where it stands.</p>
        </div>
        <div className="w-full sm:max-w-[220px]"><SelectField id="status" label="Filter status" value={status} onChange={(event) => setStatus(event.target.value)} options={STATUS_OPTIONS} /></div>
      </div>
      {error ? <div className="border border-red-200 bg-red-50 p-6 font-body-base text-body-base text-red-800">{error}</div> : null}
      {isLoading ? <p className="py-12 text-center font-body-base text-body-base text-text-secondary">Loading applications...</p> : null}
      {!isLoading && !error && applications.length === 0 ? <div className="border border-dashed border-border-default bg-bg-white px-6 py-14 text-center"><h2 className="font-body-lg-semibold text-body-lg-semibold font-semibold text-text-primary">No applications found</h2><p className="mx-auto mt-2 max-w-md font-body-base text-body-base text-text-secondary">Applications you submit will appear here with their latest status.</p></div> : null}
      {!isLoading && !error && applications.length > 0 ? <div className="grid gap-5 md:grid-cols-2">{applications.map((application) => <ApplicationCard key={application._id} application={application} />)}</div> : null}
      {pagination.pages > 1 ? <p className="text-center font-body-sm text-body-sm text-text-muted">Showing page {pagination.page} of {pagination.pages}</p> : null}
    </section>
  );
}

export default CandidateApplicationsPage;
