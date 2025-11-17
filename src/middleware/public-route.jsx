import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';

export const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  // If logged in, redirect to dashboard
  if (user) {
    if (user.role === 'Administrator' || user.role === 'Recruiter') {
      return <Navigate to="/dashboard/jobs" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};
