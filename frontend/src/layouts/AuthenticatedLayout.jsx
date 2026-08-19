import { BriefcaseBusiness, LayoutDashboard, LogOut, UserRound } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Logo from '../components/ui/Logo.jsx';
import { useAuth } from '../hooks/useAuth.jsx';

function AuthenticatedLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dashboardPath = user.role === 'recruiter' ? '/recruiter' : '/candidate';
  const roleLabel = user.role === 'recruiter' ? 'Recruiter' : 'Candidate';

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  const navItems = [
    { label: 'Dashboard', path: dashboardPath, icon: LayoutDashboard },
    { label: 'Jobs', icon: BriefcaseBusiness, disabled: true },
    { label: 'Profile', icon: UserRound, disabled: true },
  ];

  return (
    <div className="flex min-h-screen bg-bg-primary text-text-primary">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border-light bg-bg-white px-5 py-7 md:flex">
        <div className="mb-12 px-2">
          <Logo />
        </div>

        <div className="mb-6 px-2">
          <p className="font-ui-base text-ui-base font-medium uppercase tracking-[1px] text-text-muted">
            {roleLabel} workspace
          </p>
        </div>

        <nav className="flex flex-1 flex-col gap-2" aria-label="Main navigation">
          {navItems.map(({ label, path, icon: Icon, disabled }) => (
            disabled ? (
              <div
                key={label}
                className="flex cursor-not-allowed items-center gap-3 rounded-md px-3 py-3 font-body-base text-body-base text-text-muted opacity-60"
                aria-disabled="true"
              >
                <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                {label}
              </div>
            ) : (
              <NavLink
                key={label}
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-3 font-body-base text-body-base ${
                    isActive
                      ? 'bg-bg-dark text-text-inverse'
                      : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary'
                  }`
                }
              >
                <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                {label}
              </NavLink>
            )
          ))}
        </nav>

        <button
          className="flex items-center gap-3 rounded-md px-3 py-3 text-left font-body-base text-body-base text-text-secondary hover:bg-bg-primary hover:text-text-primary"
          type="button"
          onClick={handleLogout}
        >
          <LogOut size={18} strokeWidth={1.8} aria-hidden="true" />
          Sign out
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border-light bg-bg-white px-5 py-4 md:px-8 md:py-5">
          <div className="md:hidden">
            <Logo />
          </div>
          <div className="hidden md:block">
            <p className="font-body-base text-body-base text-text-secondary">{roleLabel} workspace</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-bg-dark font-body-base-medium text-body-base text-text-inverse">
              {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
            </div>
            <div className="hidden text-right sm:block">
              <p className="font-body-base-medium text-body-base font-medium text-text-primary">{user.name}</p>
              <p className="font-body-xs text-body-xs text-text-muted">{user.email}</p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-5 py-8 md:px-8 md:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AuthenticatedLayout;