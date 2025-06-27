// src/types/AuthContextType.ts
import { User } from './User';

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  signup: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<{ success: boolean; message?: string; userId?: string }>;
  verifyOTP: (
    userId: string,
    otpCode: string
  ) => Promise<{ success: boolean; message?: string }>;
  completeProfile: (
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) => Promise<{ success: boolean; message?: string }>;
  forgotPassword: (
    email: string
  ) => Promise<{ success: boolean; message?: string }>;
  resetPassword: (
    email: string,
    resetCode: string,
    newPassword: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
  resendVerification: () => Promise<{ success: boolean; message: string }>;
  updateProfile: (
    firstName: string,
    lastName: string,
    phoneNumber: string,
    address?: string,
    dateOfBirth?: string
  ) => Promise<{ success: boolean; message?: string }>;
}