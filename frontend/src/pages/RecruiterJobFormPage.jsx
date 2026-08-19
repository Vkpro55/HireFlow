import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import JobForm from '../features/jobs/JobForm.jsx';
import { createJob, getMyJobs, updateJob } from '../api/jobs.js';

function RecruiterJobFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (!id) return;

    getMyJobs()
      .then(({ jobs }) => {
        const existingJob = jobs.find((item) => item._id === id);
        if (!existingJob) {
          setError('Job not found');
          return;
        }
        setJob(existingJob);
      })
      .catch((requestError) => {
        setError(requestError.response?.data?.message || 'Unable to load this job');
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  async function handleSubmit(values) {
    try {
      setError('');
      setIsSubmitting(true);
      if (id) await updateJob(id, values);
      else await createJob(values);
      navigate('/recruiter/jobs');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to save this job');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-7">
      <div>
        <Link className="font-body-sm text-body-sm text-text-secondary underline" to="/recruiter/jobs">Back to jobs</Link>
        <h1 className="mt-5 font-display-sm text-display-sm leading-none text-text-primary">{id ? 'Edit job' : 'Create a job'}</h1>
        <p className="mt-4 font-body-base text-body-base text-text-secondary">Add the details candidates need to understand this opportunity.</p>
      </div>
      <div className="border border-border-light bg-bg-white p-5 sm:p-8">
        {error ? <p className="mb-6 border border-red-200 bg-red-50 px-4 py-3 font-body-sm text-body-sm text-red-800">{error}</p> : null}
        {isLoading ? <p className="py-8 text-center font-body-base text-body-base text-text-secondary">Loading job...</p> : null}
        {!isLoading && !error ? <JobForm job={job} isSubmitting={isSubmitting} onSubmit={handleSubmit} onCancel={() => navigate('/recruiter/jobs')} /> : null}
      </div>
    </section>
  );
}

export default RecruiterJobFormPage;