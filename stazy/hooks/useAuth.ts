import { useState, useEffect, createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  apple: () => Promise<void>;
  google: () => Promise<void>;
  facebook: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  authenticate: () => void;
}

interface SignupData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthContext };
export type { AuthContextType, SignupData };