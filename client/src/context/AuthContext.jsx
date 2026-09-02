import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('stylesync_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await authAPI.getProfile();
        setUser(res.data.user);
      } catch (err) {
        console.error('Failed to load user session:', err);
        localStorage.removeItem('stylesync_token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await authAPI.signin({ email, password });
    const { token: newToken, user: userData } = res.data;
    localStorage.setItem('stylesync_token', newToken);
    setToken(newToken);
    setUser(userData);
    return userData;
  };

  const signup = async (name, email, password, role = 'customer') => {
    const res = await authAPI.signup({ name, email, password, role });
    const { token: newToken, user: userData } = res.data;
    localStorage.setItem('stylesync_token', newToken);
    setToken(newToken);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('stylesync_token');
    setToken(null);
    setUser(null);
  };

  const isAdmin = user && user.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
