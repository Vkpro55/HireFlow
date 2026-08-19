import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getJobs } from '../api/jobs.js';
import JobCard from '../features/jobs/JobCard.jsx';
import SelectField from '../components/ui/SelectField.jsx';
import TextField from '../components/ui/TextField.jsx';

const EMPLOYMENT_TYPES = [
  { value: '', label: 'All job types' },
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
];

const EMPTY_FILTERS = { search: '', location: '', experience: '', employmentType: '' };

function CandidateJobsPage() {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [submittedFilters, setSubmittedFilters] = useState(EMPTY_FILTERS);
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  function updateFilter(event) {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  }

  function submitFilters(event) {
    event.preventDefault();
    setPage(1);
    setSubmittedFilters(filters);
  }

  function clearFilters() {
    setFilters(EMPTY_FILTERS);
    setSubmittedFilters(EMPTY_FILTERS);
    setPage(1);
  }

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);
    setError('');

    getJobs({ ...submittedFilters, page, limit: 9 })
      .then((response) => {
        if (!isCurrent) return;
        setJobs(response.jobs);
        setPagination(response.pagination);
      })
      .catch((requestError) => {
        if (isCurrent) setError(requestError.response?.data?.message || 'Unable to load jobs');
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [page, submittedFilters]);

  const hasFilters = Object.values(submittedFilters).some(Boolean);

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-7">
      <div>
        <p className="mb-2 font-body-sm text-body-sm uppercase tracking-[1px] text-text-muted">Candidate workspace</p>
        <h1 className="font-display-sm text-display-sm leading-none text-text-primary">Find your next opportunity</h1>
        <p className="mt-4 max-w-2xl font-body-base text-body-base text-text-secondary">Explore open roles from teams looking for their next great hire.</p>
      </div>

      <form className="border border-border-light bg-bg-white p-5 sm:p-6" onSubmit={submitFilters}>
        <div className="mb-5 flex items-center gap-2 font-body-base-medium text-body-base font-medium text-text-primary"><SlidersHorizontal size={18} aria-hidden="true" /> Search and filter jobs</div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <TextField id="search" label="Search" value={filters.search} onChange={updateFilter} placeholder="Title or company" />
          <TextField id="location" label="Location" value={filters.location} onChange={updateFilter} placeholder="Remote, city, or region" />
          <TextField id="experience" label="Experience" value={filters.experience} onChange={updateFilter} placeholder="3+ years" />
          <SelectField id="employmentType" label="Job type" value={filters.employmentType} onChange={updateFilter} options={EMPLOYMENT_TYPES} />
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button className="flex items-center justify-center gap-2 py-3 font-body-sm-medium text-body-sm font-medium text-text-secondary underline" type="button" onClick={clearFilters} disabled={!hasFilters}>
            <X size={16} aria-hidden="true" /> Clear filters
          </button>
          <button className="flex items-center justify-center gap-2 rounded-md bg-button-bg px-5 py-3 font-body-base-medium text-body-base font-medium text-button-text" type="submit">
            <Search size={17} aria-hidden="true" /> Search jobs
          </button>
        </div>
      </form>

      <div className="flex items-center justify-between gap-4">
        <p className="font-body-base text-body-base text-text-secondary">{pagination.total ?? 0} open jobs</p>
        {hasFilters ? <p className="font-body-sm text-body-sm text-text-muted">Filtered results</p> : null}
      </div>

      {error ? <div className="border border-red-200 bg-red-50 p-6 font-body-base text-body-base text-red-800">{error}</div> : null}
      {isLoading ? <p className="py-12 text-center font-body-base text-body-base text-text-secondary">Finding open roles...</p> : null}
      {!isLoading && !error && jobs.length === 0 ? (
        <div className="border border-dashed border-border-default bg-bg-white px-6 py-14 text-center">
          <h2 className="font-body-lg-semibold text-body-lg-semibold font-semibold text-text-primary">No matching jobs</h2>
          <p className="mx-auto mt-2 max-w-md font-body-base text-body-base text-text-secondary">Try a broader search or clear your filters to see all open opportunities.</p>
        </div>
      ) : null}
      {!isLoading && !error && jobs.length > 0 ? <div className="grid gap-5 md:grid-cols-2">{jobs.map((job) => <JobCard key={job._id} job={job} />)}</div> : null}

      {pagination.pages > 1 ? (
        <div className="flex items-center justify-center gap-4 pt-2">
          <button className="rounded-md border border-border-default px-4 py-2 font-body-sm-medium text-body-sm font-medium disabled:cursor-not-allowed disabled:opacity-40" type="button" disabled={page === 1 || isLoading} onClick={() => setPage((current) => current - 1)}>Previous</button>
          <span className="font-body-sm text-body-sm text-text-secondary">Page {page} of {pagination.pages}</span>
          <button className="rounded-md border border-border-default px-4 py-2 font-body-sm-medium text-body-sm font-medium disabled:cursor-not-allowed disabled:opacity-40" type="button" disabled={page === pagination.pages || isLoading} onClick={() => setPage((current) => current + 1)}>Next</button>
        </div>
      ) : null}
    </section>
  );
}

export default CandidateJobsPage;