import { useEffect, useState } from 'react';
import { getSavedJobs, toggleSavedJob } from '../api/profile.js';
import SavedJobCard from '../components/profile/SavedJobCard.jsx';

function SavedJobsPage() {
  const [jobs, setJobs] = useState([]); const [isLoading, setIsLoading] = useState(true); const [error, setError] = useState('');
  useEffect(() => { getSavedJobs().then(setJobs).catch((requestError) => setError(requestError.response?.data?.message || 'Unable to load saved jobs')).finally(() => setIsLoading(false)); }, []);
  async function removeJob(jobId) { try { await toggleSavedJob(jobId); setJobs((current) => current.filter((job) => job._id !== jobId)); } catch (requestError) { setError(requestError.response?.data?.message || 'Unable to remove saved job'); } }
  return <section className="mx-auto flex max-w-6xl flex-col gap-7"><div><p className="mb-2 font-body-sm text-body-sm uppercase tracking-[1px] text-text-muted">Candidate workspace</p><h1 className="font-display-sm text-display-sm leading-none text-text-primary">Saved jobs</h1><p className="mt-4 font-body-base text-body-base text-text-secondary">Keep interesting opportunities close while you decide where to apply.</p></div>{error ? <p className="border border-red-200 bg-red-50 p-5 font-body-sm text-body-sm text-red-800">{error}</p> : null}{isLoading ? <p className="py-12 text-center font-body-base text-body-base text-text-secondary">Loading saved jobs...</p> : null}{!isLoading && !error && !jobs.length ? <div className="border border-dashed border-border-default bg-bg-white px-6 py-14 text-center"><h2 className="font-body-lg-semibold text-body-lg-semibold font-semibold text-text-primary">No saved jobs yet</h2><p className="mt-2 font-body-base text-body-base text-text-secondary">Bookmark a job from its details page to find it here.</p></div> : null}{!isLoading && jobs.length ? <div className="grid gap-5 md:grid-cols-2">{jobs.map((job) => <SavedJobCard key={job._id} job={job} onRemove={removeJob} />)}</div> : null}</section>;
}
export default SavedJobsPage;
