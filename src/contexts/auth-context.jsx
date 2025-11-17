import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '@/api/axios';
import { ROLES } from '@/constants/roles';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get user info on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      axiosInstance.get('/api/auth/me')
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('access_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    loading,
    isAdmin: user?.role === ROLES.ADMINISTRATOR,
    isRecruiter: user?.role === ROLES.RECRUITER,
    isEvaluator: user?.role === ROLES.TECHNICAL_EVALUATOR,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
