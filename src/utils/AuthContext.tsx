import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_RESET } from '../App/actions';

import { User, RootState } from './types';

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
  isReleasing: boolean;
  setIsReleasing: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  
  // Get auth state from Redux
  const { isLoggedIn, data } = useSelector((state: RootState) => state.auth);
  const user = data?.user || data?.data?.user || null;

  const [isProcessing, setIsProcessing] = useState(false);
  const [isReleasing, setIsReleasing] = useState(false);

  const login = (userData: User) => {
    // Note: login is now mostly handled by Redux actions, 
    // but we keep this for compatibility if needed.
    // In the new flow, USER_LOGIN_COMPLETED sets the user.
  };

  const logout = () => {
    setIsReleasing(true);
    dispatch({ type: LOGIN_RESET });

    setTimeout(() => {
      setIsReleasing(false);
    }, 1500); 
  };

  return (
    <AuthContext.Provider 
      value={{
        isLoggedIn, 
        user, 
        login, 
        logout,
        isProcessing, 
        setIsProcessing,
        isReleasing, 
        setIsReleasing
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};