import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';

export function ProtectedRoute() {
  const { user, isRestoring } = useAuth();
  const location = useLocation();

  if (isRestoring) {
    return <div className="flex min-h-screen items-center justify-center bg-bg-primary">Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}

export function RoleRoute({ role }) {
  const { user } = useAuth();
  return user?.role === role ? <Outlet /> : <Navigate to="/" replace />;
}
export function RoleHomeRedirect() {
  const { user } = useAuth();
  return <Navigate to={user.role === 'recruiter' ? '/recruiter' : '/candidate'} replace />;
}