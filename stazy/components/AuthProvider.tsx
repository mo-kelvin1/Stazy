import React, { useState, useEffect } from "react";
import { AuthContext } from "../hooks/useAuth";
import type { AuthContextType, SignupData } from "./../hooks/useAuth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check from AsyncStorage or auth token
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateApiCall = async (provider: string) => {
    console.log(`Signing in with ${provider}...`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAuthenticated(true);
    console.log(`${provider} sign-in successful`);
  };

  const login = async (email: string, password: string) => {
    try {
      console.log("Login attempt:", { email, password });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (userData: SignupData) => {
    try {
      console.log("Signup attempt:", userData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const apple = async () => {
    try {
      await simulateApiCall("Apple");
    } catch (error) {
      console.error("Apple sign-in failed:", error);
      throw error;
    }
  };

  const google = async () => {
    try {
      await simulateApiCall("Google");
    } catch (error) {
      console.error("Google sign-in failed:", error);
      throw error;
    }
  };

  const facebook = async () => {
    try {
      await simulateApiCall("Facebook");
    } catch (error) {
      console.error("Facebook sign-in failed:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    apple,
    google,
    facebook,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
