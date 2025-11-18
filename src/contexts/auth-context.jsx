import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '@/api/axios';
import { USER_ROLES } from '@/constants/roles';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user data
  const fetchUser = async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const res = await axiosInstance.get('/api/auth/me');
        setUser(res.data);
      } catch (error) {
        localStorage.removeItem('access_token');
        setUser(null);
      }
    }
  };

  // Get user info on mount
  useEffect(() => {
    fetchUser().finally(() => setLoading(false));
  }, []);

  const value = {
    user,
    loading,
    isAdmin: user?.role === USER_ROLES.ADMINISTRATOR,
    isRecruiter: user?.role === USER_ROLES.RECRUITER,
    isEvaluator: user?.role === USER_ROLES.TECHNICAL_EVALUATOR,
    refetchUser: fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
