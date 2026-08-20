import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecruiterDashboard } from '../api/dashboard.js';
import ActivityList from '../components/dashboard/ActivityList.jsx';
import DashboardSection from '../components/dashboard/DashboardSection.jsx';
import HiringStats from '../components/dashboard/HiringStats.jsx';
import MetricCard from '../components/dashboard/MetricCard.jsx';
import { useAuth } from '../hooks/useAuth.jsx';

function RecruiterDashboardPage() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getRecruiterDashboard()
      .then(setDashboard)
      .catch((requestError) => setError(requestError.response?.data?.message || 'Unable to load your dashboard'))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p className="py-12 text-center font-body-base text-body-base text-text-secondary">Loading your dashboard...</p>;
  if (error) return <div className="mx-auto max-w-5xl border border-red-200 bg-red-50 p-6 font-body-base text-body-base text-red-800">{error}</div>;

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="mb-2 font-body-sm text-body-sm uppercase tracking-[1px] text-text-muted">Recruiter workspace</p><h1 className="font-display-sm text-display-sm leading-none text-text-primary">Good to see you, {user.name}</h1><p className="mt-4 font-body-base text-body-base text-text-secondary">A clear view of your openings and candidate pipeline.</p></div>
        <Link className="flex items-center gap-2 self-start rounded-md bg-button-bg px-4 py-3 font-body-sm-medium text-body-sm font-medium text-button-text sm:self-auto" to="/recruiter/jobs/new">Post a job <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Active jobs" value={dashboard.metrics.activeJobs} detail="Currently accepting applications" />
        <MetricCard label="Total applications" value={dashboard.metrics.totalApplications} detail="Across your openings" />
        <MetricCard label="Open positions" value={dashboard.metrics.openPositions} detail="Roles still hiring" />
        <MetricCard label="Recent candidates" value={dashboard.metrics.recentCandidates} detail="Latest five applications" />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <DashboardSection title="Recent candidates" action={<Link className="font-body-sm text-body-sm text-text-primary underline" to="/recruiter/jobs">View jobs</Link>}><ActivityList items={dashboard.recentCandidates} recruiter /></DashboardSection>
        <DashboardSection title="Hiring statistics"><HiringStats values={dashboard.hiringStatistics} /></DashboardSection>
      </div>

      <DashboardSection title="Active openings"><div className="grid gap-3 sm:grid-cols-2">{dashboard.jobs.length ? dashboard.jobs.map((job) => <Link key={job._id} className="flex items-center justify-between gap-4 border border-border-light p-4 hover:border-border-default" to={`/recruiter/jobs/${job._id}/applications`}><div className="min-w-0"><p className="truncate font-body-base-medium text-body-base font-medium text-text-primary">{job.title}</p><p className="mt-1 truncate font-body-sm text-body-sm text-text-secondary">{job.companyName}</p></div><ArrowUpRight className="shrink-0" size={17} aria-hidden="true" /></Link>) : <p className="font-body-base text-body-base text-text-secondary">No active openings yet.</p>}</div></DashboardSection>
    </section>
  );
}

export default RecruiterDashboardPage;
