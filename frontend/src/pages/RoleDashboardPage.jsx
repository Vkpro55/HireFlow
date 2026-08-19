import { useAuth } from '../hooks/useAuth.jsx';

function RoleDashboardPage({ role }) {
  const { user } = useAuth();
  const isRecruiter = role === 'recruiter';

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-8">
      <div>
        <p className="mb-2 font-body-sm text-body-sm uppercase tracking-[1px] text-text-muted">{user.role}</p>
        <h1 className="font-display-sm text-display-sm leading-none text-text-primary">
          {isRecruiter ? 'Recruiter dashboard' : 'Candidate dashboard'}
        </h1>
        <p className="mt-4 font-body-base text-body-base text-text-secondary">
          {isRecruiter ? 'Manage your openings and hiring pipeline from here.' : 'Discover opportunities and track your applications from here.'}
        </p>
      </div>

      <div className="border border-border-light bg-bg-white p-6 md:p-8">
        <p className="font-body-lg-semibold text-body-lg-semibold font-semibold text-text-primary">Your dashboard is ready</p>
        <p className="mt-3 max-w-2xl font-body-base text-body-base leading-6 text-text-secondary">
          {isRecruiter
            ? 'Job management, candidate review, and hiring statistics will appear here in the next milestones.'
            : 'Job discovery, saved jobs, applications, and deadlines will appear here in the next milestones.'}
        </p>
      </div>
    </section>
  );
}

export default RoleDashboardPage;