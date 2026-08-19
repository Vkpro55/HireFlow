import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute, RoleRoute } from '../components/auth/RouteGuards.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RoleDashboardPage from '../pages/RoleDashboardPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <DashboardPage /> },
      {
        element: <RoleRoute role="recruiter" />,
        children: [{ path: 'recruiter', element: <RoleDashboardPage role="recruiter" /> }],
      },
      {
        element: <RoleRoute role="candidate" />,
        children: [{ path: 'candidate', element: <RoleDashboardPage role="candidate" /> }],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
]);
