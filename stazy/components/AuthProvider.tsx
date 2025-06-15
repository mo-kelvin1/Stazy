import React, { createContext, useState, useEffect, ReactNode } from "react";

// Types
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  isProfileComplete?: boolean;
  password?: string; // For simulation only
}

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
}

export const AuthContext = createContext<AuthContextType | null>(null);

// Simulated file storage
class SimulatedFileStorage {
  private users: Map<string, User> = new Map();
  private sessions: Map<string, string> = new Map(); // token -> userId
  private pendingVerifications: Map<string, { email: string; otp: string }> =
    new Map();
  private resetCodes: Map<string, string> = new Map(); // email -> resetCode

  constructor() {
    this.initializeDefaultUsers();
  }

  private initializeDefaultUsers() {
    // Add some default users for testing
    const defaultUsers: User[] = [
      {
        id: "user1",
        email: "test@example.com",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "+1234567890",
        isProfileComplete: true,
      },
      {
        id: "user2",
        email: "demo@example.com",
        password: "demo123",
        isProfileComplete: false,
      },
    ];

    defaultUsers.forEach((user) => {
      this.users.set(user.email, user);
    });
  }

  async saveUser(user: User): Promise<void> {
    // Simulate file write delay
    await this.delay(100);
    this.users.set(user.email, user);
    console.log(`User saved to simulated file: ${user.email}`);
  }

  async getUser(email: string): Promise<User | null> {
    // Simulate file read delay
    await this.delay(50);
    return this.users.get(email) || null;
  }

  async getUserById(id: string): Promise<User | null> {
    // Simulate file read delay
    await this.delay(50);
    for (const user of this.users.values()) {
      if (user.id === id) {
        return user;
      }
    }
    return null;
  }

  async createSession(userId: string): Promise<string> {
    const token = `token_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    this.sessions.set(token, userId);
    return token;
  }

  async validateSession(token: string): Promise<User | null> {
    const userId = this.sessions.get(token);
    if (!userId) return null;
    return this.getUserById(userId);
  }

  async deleteSession(token: string): Promise<void> {
    this.sessions.delete(token);
  }

  async setPendingVerification(
    userId: string,
    email: string,
    otp: string
  ): Promise<void> {
    this.pendingVerifications.set(userId, { email, otp });
  }

  async getPendingVerification(
    userId: string
  ): Promise<{ email: string; otp: string } | null> {
    return this.pendingVerifications.get(userId) || null;
  }

  async deletePendingVerification(userId: string): Promise<void> {
    this.pendingVerifications.delete(userId);
  }

  async setResetCode(email: string, resetCode: string): Promise<void> {
    this.resetCodes.set(email, resetCode);
  }

  async getResetCode(email: string): Promise<string | null> {
    return this.resetCodes.get(email) || null;
  }

  async deleteResetCode(email: string): Promise<void> {
    this.resetCodes.delete(email);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Simulated token store
class SimulatedTokenStore {
  private token: string | null = null;
  private userData: User | null = null;

  async getToken(): Promise<string | null> {
    return this.token;
  }

  async setToken(token: string): Promise<void> {
    this.token = token;
  }

  async getUserData(): Promise<User | null> {
    return this.userData;
  }

  async setUserData(user: User): Promise<void> {
    this.userData = user;
  }

  async clearAll(): Promise<void> {
    this.token = null;
    this.userData = null;
  }
}

const fileStorage = new SimulatedFileStorage();
const tokenStore = new SimulatedTokenStore();

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Check if user is already authenticated on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await tokenStore.getToken();
      const userData = await tokenStore.getUserData();

      if (token && userData) {
        // Verify token is still valid
        const validUser = await fileStorage.validateSession(token);
        if (validUser) {
          setUser(validUser);
          setIsAuthenticated(true);
        } else {
          // Token is invalid, clear stored data
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

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const user = {
        id: "1",
        email,
        password,
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "+1234567890",
        isProfileComplete: true,
      };

      if (!user) {
        return { success: false, message: "User not found" };
      }

      if (user.password !== password) {
        return { success: false, message: "Invalid password" };
      }

      // Create session
      const token = await fileStorage.createSession(user.id);

      // Store token and user data
      await tokenStore.setToken(token);
      await tokenStore.setUserData(user);

      setUser(user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const signup = async (
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<{ success: boolean; message?: string; userId?: string }> => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (password !== confirmPassword) {
        return { success: false, message: "Passwords do not match" };
      }

      // Check if user already exists
      const existingUser = await fileStorage.getUser(email);
      if (existingUser) {
        return { success: false, message: "User already exists" };
      }

      // Create new user
      const userId = `user_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      const newUser: User = {
        id: userId,
        email,
        password,
        isProfileComplete: false,
      };

      await fileStorage.saveUser(newUser);

      // Generate OTP for verification
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      await fileStorage.setPendingVerification(userId, email, otp);

      console.log(`Simulated OTP for ${email}: ${otp}`); // For testing

      return { success: true, userId };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const verifyOTP = async (
    userId: string,
    otpCode: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      const pendingVerification = await fileStorage.getPendingVerification(
        userId
      );

      // Mark as verified (you might want to add a verified flag to User interface)
      await fileStorage.deletePendingVerification(userId);

      return { success: true, message: "Email verified successfully" };
    } catch (error) {
      console.error("OTP verification error:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const completeProfile = async (
    firstName: string,
    lastName: string,
    phoneNumber: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 400));
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error("Profile completion error:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const forgotPassword = async (
    email: string
  ): Promise<{ success: boolean; message?: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 400));
    // Simulate sending email
    return {
      success: true,
      message: "Password reset email sent successfully.",
    };
  };

  const resetPassword = async (): Promise<{
    success: boolean;
    message?: string;
  }> => {
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = async (): Promise<void> => {
    try {
      const token = await tokenStore.getToken();
      if (token) {
        await fileStorage.deleteSession(token);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage regardless
      await tokenStore.clearAll();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const refreshUserData = async (): Promise<void> => {
    try {
      const token = await tokenStore.getToken();
      if (!token) return;

      const currentUser = await fileStorage.validateSession(token);
      if (currentUser) {
        await tokenStore.setUserData(currentUser);
        setUser(currentUser);
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
