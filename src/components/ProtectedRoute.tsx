import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isUnlocked = sessionStorage.getItem('unlocked') === 'true';
  
  if (!isUnlocked) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};
