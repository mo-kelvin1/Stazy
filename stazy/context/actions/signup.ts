import axios from "axios";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";

export const createSignupAction = (tokenStore: SimulatedTokenStore) => {
  return async (
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<{ success: boolean; message?: string; token?: string }> => {
    try {
      if (password !== confirmPassword) {
        return { success: false, message: "Passwords do not match" };
      }

      const response = await axios.post(
        "http://10.132.119.88:8080/api/auth/signup",
        {
          email,
          password,
        }
      );

      const result = response.data;

      if (!result.success) {
        return { success: false, message: result.message || "Signup failed" };
      }

      const { token } = result.data;

      // ✅ Store token using the tokenStore
      await tokenStore.setToken(token);

      return {
        success: true,
        message: result.data.message || "Signup successful",
        token,
      };
    } catch (error: any) {
      console.error("Signup error:", error);
      return {
        success: false,
        message:
          error?.response?.data?.message || "Network error. Please try again.",
      };
    }
  };
};
