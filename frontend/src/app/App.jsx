import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../routes/index.jsx';
import { restoreSession } from '../services/auth.js';

function App() {
  useEffect(() => {
    restoreSession().catch(() => {});
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
