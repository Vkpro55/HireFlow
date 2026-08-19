import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute, RoleHomeRedirect, RoleRoute } from '../components/auth/RouteGuards.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RoleDashboardPage from '../pages/RoleDashboardPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AuthenticatedLayout />,
        children: [
          { index: true, element: <RoleHomeRedirect /> },
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
