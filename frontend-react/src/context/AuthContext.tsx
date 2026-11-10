import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  AuthUser,
  apiGetMe,
  apiLogin,
  apiLogout,
  apiRegister,
  apiUpdateProfile,
  getStoredToken,
} from '../services/api';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginOfflineDemo: () => { success: boolean };
  register: (payload: {
    name: string;
    email: string;
    password: string;
    institution?: string;
    track?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (payload: {
    name?: string;
    institution?: string;
    track?: string;
    current_password?: string;
    new_password?: string;
  }) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(getStoredToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check current session on mount
  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    const storedToken = getStoredToken();
    if (storedToken) {
      const response = await apiGetMe();
      if (response && response.success && response.user) {
        setUser(response.user);
        setToken(storedToken);
      } else {
        setUser(null);
        setToken(null);
      }
    } else {
      setUser(null);
      setToken(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const res = await apiLogin({ email, password });
    setIsLoading(false);
    if (res.success && res.user && res.token) {
      setUser(res.user);
      setToken(res.token);
      return { success: true };
    }
    return {
      success: false,
      error: res.error?.message || 'Login failed. Please check your credentials.',
    };
  };

  const loginOfflineDemo = () => {
    const demoUser: AuthUser = {
      id: 1,
      name: 'Situ Chandra',
      email: 'situsavvy1111@gmail.com',
      institution: 'Jawaharlal Nehru University (JNU), New Delhi',
      track: 'Software Developer',
      overallProgress: 0,
      practiceDone: 0,
      projectsBuilt: 0,
      streakDays: 0,
      isActive: true,
    };
    setUser(demoUser);
    setToken('demo-offline-session');
    return { success: true };
  };

  const register = async (payload: {
    name: string;
    email: string;
    password: string;
    institution?: string;
    track?: string;
  }) => {
    setIsLoading(true);
    const res = await apiRegister(payload);
    setIsLoading(false);
    if (res.success && res.user && res.token) {
      setUser(res.user);
      setToken(res.token);
      return { success: true };
    }
    return {
      success: false,
      error: res.error?.message || 'Registration failed.',
    };
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
    setToken(null);
  };

  const updateProfile = async (payload: {
    name?: string;
    institution?: string;
    track?: string;
    current_password?: string;
    new_password?: string;
  }) => {
    const res = await apiUpdateProfile(payload);
    if (res.success && res.user) {
      setUser(res.user);
      return { success: true };
    }
    return {
      success: false,
      error: res.error?.message || 'Profile update failed.',
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginOfflineDemo,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
