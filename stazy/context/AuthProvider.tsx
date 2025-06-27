// src/context/AuthProvider.tsx
import React, { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "../types/AuthContextType";
import { User } from "../types/User";
import { SimulatedTokenStore } from "../services/SimulatedTokenStore";
import { createUpdateProfileAction } from "./actions/updateProfile";
// Import action creators
import { createLoginAction } from "./actions/login";
import { createSignupAction } from "./actions/signup";
import { createVerifyOTPAction } from "./actions/verifyOTP";
import { createCompleteProfileAction } from "./actions/completeProfile";
import { createForgotPasswordAction } from "./actions/forgotPassword";
import { createResetPasswordAction } from "./actions/resetPassword";
import { createLogoutAction } from "./actions/logout";
import { createRefreshUserDataAction } from "./actions/refreshUserData";
import { createResendVerificationAction } from "./actions/resendVerification";

const tokenStore = new SimulatedTokenStore();

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Initialize actions
  const login = createLoginAction(tokenStore, setUser, setIsAuthenticated);
  const signup = createSignupAction(tokenStore);
  const verifyOTP = createVerifyOTPAction(tokenStore);
  const completeProfile = createCompleteProfileAction(
    tokenStore,
    setIsAuthenticated
  );
  const forgotPassword = createForgotPasswordAction();
  const resetPassword = createResetPasswordAction(setIsAuthenticated);
  const resendVerification = createResendVerificationAction(tokenStore);
  const logout = createLogoutAction(tokenStore, setUser, setIsAuthenticated);
  const refreshUserData = createRefreshUserDataAction(tokenStore, setUser);
  const updateProfile = createUpdateProfileAction(
    tokenStore,
    setIsAuthenticated
  );
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await tokenStore.getToken();
      if (token) {
        await refreshUserData();
        const userData = await tokenStore.getUserData();
        if (userData) {
          setIsAuthenticated(true);
        } else {
          await tokenStore.clearAll();
        }
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      await tokenStore.clearAll();
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    login,
    signup,
    verifyOTP,
    completeProfile,
    forgotPassword,
    resetPassword,
    logout,
    refreshUserData,
    resendVerification,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
