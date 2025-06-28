import axios from "axios";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";
import { User } from "../../types/User";

export const createLoginAction = (
  tokenStore: SimulatedTokenStore,
  setUser: (user: User | null) => void,
  setIsAuthenticated: (isAuth: boolean) => void
) => {
  return async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await axios.post(
        "http://100.66.107.9:8080/api/auth/login",
        {
          email,
          password,
        }
      );

      const result = response.data;

      if (!result.success) {
        return { success: false, message: result.message || "Login failed" };
      }

      const { emailVerified, profileCompleted, token } = result.data;

      // Build and store the user object
      const user: User = {
        id: email,
        email,
        password,
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        phoneNumber: result.data.phoneNumber,
        address: result.data.address,
        dateOfBirth: result.data.dateOfBirth,
        isProfileComplete: profileCompleted,
      };

      // Save token and user data
      await tokenStore.setToken(token);
      await tokenStore.setUserData(user);

      // Set in global state
      setUser(user);
      setIsAuthenticated(true);

      return { success: true, message: result.message };
    } catch (error: any) {
      console.error("Login error:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Network error. Please try again.",
      };
    }
  };
};
