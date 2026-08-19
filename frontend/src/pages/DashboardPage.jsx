import { Link } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import { useAuth } from '../hooks/useAuth.jsx';

function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg-primary px-6 text-center">
      <p className="font-body-sm text-body-sm text-text-secondary">Signed in as {user.email}</p>
      <h1 className="font-display-sm text-display-sm text-text-primary">Your HireFlow workspace</h1>
      <p className="font-body-base text-body-base text-text-secondary">Role: {user.role}</p>
      <div className="flex gap-4">
        <Link to={user.role === 'recruiter' ? '/recruiter' : '/candidate'}>
          <Button type="button">Open dashboard</Button>
        </Link>
        <Button type="button" onClick={logout}>Sign out</Button>
      </div>
    </main>
  );
}

export default DashboardPage;