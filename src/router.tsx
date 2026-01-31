import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LockPage } from './pages/LockPage';
import { DesktopPage } from './pages/DesktopPage';
import { GroqTest } from './components/GroqTest';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LockPage />,
  },
  {
    path: '/desktop',
    element: (
      <ProtectedRoute>
        <DesktopPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/groq-test',
    element: <GroqTest />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
