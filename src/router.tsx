import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LockPage } from './pages/LockPage';
import { DesktopPage } from './pages/DesktopPage';
import { GroqTest } from './components/GroqTest';

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isUnlocked = sessionStorage.getItem('unlocked') === 'true';
  
  if (!isUnlocked) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

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
