import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { ROLE_GROUPS } from '@/constants/roles';

export const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  // If logged in, redirect to dashboard
  if (user) {
    if (ROLE_GROUPS.DASHBOARD_ACCESS.includes(user.role)) {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};
