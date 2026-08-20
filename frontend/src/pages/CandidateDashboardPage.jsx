import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCandidateDashboard } from '../api/dashboard.js';
import ActivityList from '../components/dashboard/ActivityList.jsx';
import DashboardSection from '../components/dashboard/DashboardSection.jsx';
import MetricCard from '../components/dashboard/MetricCard.jsx';
import { useAuth } from '../hooks/useAuth.jsx';

function formatDate(value) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value));
}

function CandidateDashboardPage() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getCandidateDashboard()
      .then(setDashboard)
      .catch((requestError) => setError(requestError.response?.data?.message || 'Unable to load your dashboard'))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p className="py-12 text-center font-body-base text-body-base text-text-secondary">Loading your dashboard...</p>;
  if (error) return <div className="mx-auto max-w-5xl border border-red-200 bg-red-50 p-6 font-body-base text-body-base text-red-800">{error}</div>;

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="mb-2 font-body-sm text-body-sm uppercase tracking-[1px] text-text-muted">Candidate workspace</p><h1 className="font-display-sm text-display-sm leading-none text-text-primary">Good to see you, {user.name}</h1><p className="mt-4 font-body-base text-body-base text-text-secondary">Keep your search moving and stay close to every application.</p></div>
        <Link className="flex items-center gap-2 self-start rounded-md bg-button-bg px-4 py-3 font-body-sm-medium text-body-sm font-medium text-button-text sm:self-auto" to="/candidate/jobs">Find jobs <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard label="Total applications" value={dashboard.metrics.totalApplications} detail="All submitted applications" />
        <MetricCard label="Upcoming deadlines" value={dashboard.metrics.upcomingDeadlines} detail="Open roles you applied to" />
        <MetricCard label="Saved jobs" value={dashboard.metrics.savedJobs} detail="Bookmarks arrive in a later step" />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <DashboardSection title="Recent activity" action={<Link className="font-body-sm text-body-sm text-text-primary underline" to="/candidate/applications">View all</Link>}><ActivityList items={dashboard.recentActivity} /></DashboardSection>
        <DashboardSection title="Upcoming deadlines"><div className="flex flex-col gap-4">{dashboard.upcomingDeadlines.length ? dashboard.upcomingDeadlines.map((job) => <div key={job._id} className="flex items-start gap-3"><CalendarDays className="mt-1 shrink-0 text-text-muted" size={17} aria-hidden="true" /><div className="min-w-0"><p className="truncate font-body-base-medium text-body-base font-medium text-text-primary">{job.title}</p><p className="mt-1 font-body-sm text-body-sm text-text-secondary">{job.companyName} · Due {formatDate(job.deadline)}</p></div></div>) : <p className="font-body-base text-body-base text-text-secondary">No upcoming deadlines yet.</p>}</div></DashboardSection>
      </div>
    </section>
  );
}

export default CandidateDashboardPage;
