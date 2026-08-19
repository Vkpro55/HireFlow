import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute, RoleHomeRedirect, RoleRoute } from '../components/auth/RouteGuards.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RoleDashboardPage from '../pages/RoleDashboardPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.jsx';
import RecruiterJobFormPage from '../pages/RecruiterJobFormPage.jsx';
import RecruiterJobsPage from '../pages/RecruiterJobsPage.jsx';
import CandidateJobsPage from '../pages/CandidateJobsPage.jsx';
import CandidateJobDetailsPage from '../pages/CandidateJobDetailsPage.jsx';

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
            children: [
              { path: 'recruiter', element: <RoleDashboardPage role="recruiter" /> },
              { path: 'recruiter/jobs', element: <RecruiterJobsPage /> },
              { path: 'recruiter/jobs/new', element: <RecruiterJobFormPage /> },
              { path: 'recruiter/jobs/:id/edit', element: <RecruiterJobFormPage /> },
            ],
          },
          {
            element: <RoleRoute role="candidate" />,
            children: [
              { path: 'candidate', element: <RoleDashboardPage role="candidate" /> },
              { path: 'candidate/jobs', element: <CandidateJobsPage /> },
              { path: 'candidate/jobs/:id', element: <CandidateJobDetailsPage /> },
            ],
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
