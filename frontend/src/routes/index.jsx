import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute, RoleHomeRedirect, RoleRoute } from '../components/auth/RouteGuards.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import CandidateDashboardPage from '../pages/CandidateDashboardPage.jsx';
import RecruiterDashboardPage from '../pages/RecruiterDashboardPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.jsx';
import RecruiterJobFormPage from '../pages/RecruiterJobFormPage.jsx';
import RecruiterJobsPage from '../pages/RecruiterJobsPage.jsx';
import CandidateJobsPage from '../pages/CandidateJobsPage.jsx';
import CandidateJobDetailsPage from '../pages/CandidateJobDetailsPage.jsx';
import CandidateApplicationsPage from '../pages/CandidateApplicationsPage.jsx';
import RecruiterApplicationsPage from '../pages/RecruiterApplicationsPage.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';
import SavedJobsPage from '../pages/SavedJobsPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AuthenticatedLayout />,
        children: [
          { index: true, element: <RoleHomeRedirect /> },
          { path: 'profile', element: <ProfilePage /> },
          {
            element: <RoleRoute role="recruiter" />,
            children: [
              { path: 'recruiter', element: <RecruiterDashboardPage /> },
              { path: 'recruiter/jobs', element: <RecruiterJobsPage /> },
              { path: 'recruiter/jobs/new', element: <RecruiterJobFormPage /> },
              { path: 'recruiter/jobs/:id/edit', element: <RecruiterJobFormPage /> },
              { path: 'recruiter/jobs/:jobId/applications', element: <RecruiterApplicationsPage /> },
            ],
          },
          {
            element: <RoleRoute role="candidate" />,
            children: [
              { path: 'candidate', element: <CandidateDashboardPage /> },
              { path: 'candidate/jobs', element: <CandidateJobsPage /> },
              { path: 'candidate/jobs/:id', element: <CandidateJobDetailsPage /> },
              { path: 'candidate/applications', element: <CandidateApplicationsPage /> },
              { path: 'candidate/saved-jobs', element: <SavedJobsPage /> },
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
