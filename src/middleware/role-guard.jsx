import { useAuth } from '@/contexts/auth-context';

export const RoleGuard = ({ children, allowedRoles = [] }) => {
  const { user } = useAuth();
  
  if (!user || !allowedRoles.includes(user.role)) return null;
  return children;
};
