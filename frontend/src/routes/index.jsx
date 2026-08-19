import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>HireFlow</div>,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);
