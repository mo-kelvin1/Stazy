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
  dateOfBirth?: string;
  address?: string;
  emergencyContact?: string;
}

export interface Booking {
  id: string;
  guestId: string;
  guestName: string;
  date: string; // ISO format e.g. "2025-06-23"
  time?: string; // e.g. "14:00" or "2:00 PM"
  service: string; // e.g. "Room reservation", "Spa", "Consultation"
  notes?: string; // Optional notes or instructions
  location?: string; // e.g. "Suite 305, Grand Hotel"
  numberOfGuests?: number; // e.g. 2
  status?: "confirmed" | "pending" | "cancelled" | "completed"; // Booking status
  createdAt?: string; // Timestamp when booking was created
  updatedAt?: string; // Timestamp when last updated
  phoneNumber?: string; // Contact number of guest
  email?: string; // Contact email
  specialRequests?: string; // e.g. "Vegan breakfast", "Late check-out"
  duration?: string; // e.g. "1 hour", "3 days"
  price?: number; // e.g. 150.00
  currency?: string; // e.g. "USD"
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
  updateUser: (
    updatedData: Partial<User>
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
  getBookings: () => Booking[];
}

export const AuthContext = createContext<AuthContextType | null>(null);

// Default user values
const createDefaultUser = (overrides: Partial<User> = {}): User => ({
  id: "default-user-id",
  email: "default@example.com",
  firstName: "Default",
  lastName: "User",
  phoneNumber: "+1234567890",
  isProfileComplete: true,
  password: "defaultPassword123",
  dateOfBirth: "01/01/1990",
  address: "Default Address, P.O.Box 000",
  emergencyContact: "+1234567890",
  ...overrides,
});

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
    // Add the specific user for testing with your credentials
    const defaultUsers: User[] = [
      createDefaultUser({
        id: "user1",
        email: "koseiminta@gmail.com",
        password: "Genius123",
        firstName: "Kosei",
        lastName: "Minta",
        phoneNumber: "+233509651902",
        isProfileComplete: true,
        address: "Ayeduase gate, P.O.Box 123",
        emergencyContact: "+233509651902",
        dateOfBirth: "01/15/2000",
      }),
      createDefaultUser({
        id: "user2",
        email: "demo@example.com",
        password: "demo123",
        firstName: "Demo",
        lastName: "User",
        isProfileComplete: false,
      }),
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

      // Check for the specific credentials
      if (email !== "koseiminta@gmail.com" || password !== "Genius123") {
        return { success: false, message: "Invalid email or password" };
      }

      // Get the user from storage
      const user = await fileStorage.getUser(email);

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

      // Create new user with default values
      const userId = `user_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      const newUser: User = createDefaultUser({
        id: userId,
        email,
        password,
        isProfileComplete: false,
      });

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

      if (!pendingVerification) {
        return { success: false, message: "No pending verification found" };
      }

      // For simulation, accept any 6-digit OTP
      if (otpCode.length !== 6) {
        return { success: false, message: "Invalid OTP format" };
      }

      // Mark as verified
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

      if (!user) {
        return { success: false, message: "No user found" };
      }

      // Update user profile
      const updatedUser: User = {
        ...user,
        firstName,
        lastName,
        phoneNumber,
        isProfileComplete: true,
      };

      await fileStorage.saveUser(updatedUser);
      await tokenStore.setUserData(updatedUser);
      setUser(updatedUser);

      return { success: true };
    } catch (error) {
      console.error("Profile completion error:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const forgotPassword = async (
    email: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 400));

      const user = await fileStorage.getUser(email);
      if (!user) {
        return { success: false, message: "Email not found" };
      }

      // Generate reset code
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      await fileStorage.setResetCode(email, resetCode);

      console.log(`Simulated reset code for ${email}: ${resetCode}`); // For testing

      return {
        success: true,
        message: "Password reset email sent successfully.",
      };
    } catch (error) {
      console.error("Forgot password error:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const resetPassword = async (
    email: string,
    resetCode: string,
    newPassword: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 400));

      const storedResetCode = await fileStorage.getResetCode(email);
      if (!storedResetCode || storedResetCode !== resetCode) {
        return { success: false, message: "Invalid reset code" };
      }

      const user = await fileStorage.getUser(email);
      if (!user) {
        return { success: false, message: "User not found" };
      }

      // Update password
      const updatedUser: User = { ...user, password: newPassword };
      await fileStorage.saveUser(updatedUser);
      await fileStorage.deleteResetCode(email);

      return { success: true, message: "Password reset successfully" };
    } catch (error) {
      console.error("Reset password error:", error);
      return { success: false, message: "Network error. Please try again." };
    }
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

  const updateUser = async (
    updatedData: Partial<User>
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (!user) {
        return { success: false, message: "No user found to update" };
      }

      // Validate email uniqueness if email is being updated
      if (updatedData.email && updatedData.email !== user.email) {
        const existingUser = await fileStorage.getUser(updatedData.email);
        if (existingUser) {
          return { success: false, message: "Email already exists" };
        }
      }

      // Create updated user object
      const updatedUser: User = {
        ...user,
        ...updatedData,
        // Ensure id and isProfileComplete are preserved unless explicitly updated
        id: user.id,
        isProfileComplete:
          updatedData.isProfileComplete ?? user.isProfileComplete,
      };

      // If email is being changed, we need to handle the storage differently
      if (updatedData.email && updatedData.email !== user.email) {
        // Remove old email entry and add new one
        await fileStorage.saveUser(updatedUser);
        // Note: In a real app, you might want to delete the old email entry
        // but for this simulation, we'll keep both for data integrity
      } else {
        // Update existing user
        await fileStorage.saveUser(updatedUser);
      }

      // Update token store with new user data
      await tokenStore.setUserData(updatedUser);

      // Update local state
      setUser(updatedUser);

      console.log(`User updated successfully: ${updatedUser.email}`);
      return {
        success: true,
        message: "User information updated successfully",
      };
    } catch (error) {
      console.error("Update user error:", error);
      return { success: false, message: "Network error. Please try again." };
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
  const getBookings = (): Booking[] => {
    return [
      {
        id: "b1",
        guestId: "g1",
        guestName: "John Smith",
        date: "2025-06-24",
        time: "16:00",
        service: "Deluxe Suite Booking",
        notes: "Late check-in requested. Vegan meals preferred.",
        location: "Room 501, Ocean View Tower",
        numberOfGuests: 2,
        status: "confirmed",
        createdAt: "2025-06-20T10:00:00Z",
        updatedAt: "2025-06-21T14:30:00Z",
        phoneNumber: "+15551234567",
        email: "john.smith@example.com",
        specialRequests: "High floor, ocean view",
        duration: "3 nights",
        price: 950,
        currency: "USD",
      },
      {
        id: "b2",
        guestId: "g2",
        guestName: "Emily Johnson",
        date: "2025-06-25",
        time: "09:30",
        service: "Spa & Wellness Package",
        notes: "Birthday package included.",
        location: "Spa Room 3A",
        numberOfGuests: 1,
        status: "confirmed",
        createdAt: "2025-06-22T11:15:00Z",
        updatedAt: "2025-06-22T11:15:00Z",
        phoneNumber: "+15559876543",
        email: "emily.j@example.com",
        specialRequests: "Rose petals, champagne",
        duration: "90 minutes",
        price: 150,
        currency: "USD",
      },
      {
        id: "b3",
        guestId: "g3",
        guestName: "Michael Adams",
        date: "2025-06-25",
        time: "14:00",
        service: "City Tour with Guide",
        notes: "Prefers English-speaking guide.",
        location: "Lobby pickup",
        numberOfGuests: 2,
        status: "pending",
        createdAt: "2025-06-21T09:45:00Z",
        updatedAt: "2025-06-23T16:00:00Z",
        phoneNumber: "+15557654321",
        email: "michael.adams@example.com",
        duration: "4 hours",
        price: 80,
        currency: "USD",
      },
      {
        id: "b4",
        guestId: "g4",
        guestName: "Grace Taylor",
        date: "2025-06-26",
        time: "08:00",
        service: "Conference Room Rental",
        notes: "Needs projector setup.",
        location: "Business Center Room A",
        numberOfGuests: 10,
        status: "confirmed",
        createdAt: "2025-06-18T13:00:00Z",
        updatedAt: "2025-06-22T10:00:00Z",
        phoneNumber: "+15554321987",
        email: "grace.taylor@business.com",
        specialRequests: "Coffee & snacks",
        duration: "6 hours",
        price: 300,
        currency: "USD",
      },
    ];
  };

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    login,
    signup,
    verifyOTP,
    completeProfile,
    updateUser,
    forgotPassword,
    resetPassword,
    logout,
    refreshUserData,
    getBookings,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
