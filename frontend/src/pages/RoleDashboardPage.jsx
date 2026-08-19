import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

function RoleDashboardPage({ role }) {
  const { user } = useAuth();
  const isRecruiter = role === 'recruiter';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-bg-primary px-6 text-center">
      <p className="font-body-sm text-body-sm text-text-secondary">{user.email}</p>
      <h1 className="font-display-sm text-display-sm text-text-primary">
        {isRecruiter ? 'Recruiter dashboard' : 'Candidate dashboard'}
      </h1>
      <p className="font-body-base text-body-base text-text-secondary">
        {isRecruiter ? 'Your job management workspace is ready.' : 'Your opportunity workspace is ready.'}
      </p>
      <Link className="font-body-base text-body-base text-text-primary underline" to="/">
        Back to workspace
      </Link>
    </main>
  );
}

export default RoleDashboardPage;