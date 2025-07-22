import axios from "axios";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";

export const createResendVerificationAction = (
  tokenStore: SimulatedTokenStore
) => {
  return async (): Promise<{ success: boolean; message: string }> => {
    try {
      const token = await tokenStore.getToken();

      if (!token) {
        return { success: false, message: "No token found. Please log in." };
      }

      const response = await axios.post(
        "http://10.30.22.161:8080/api/auth/resend-verification",
        {}, // no body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response.data;

      if (!result.success) {
        return {
          success: false,
          message: result.message || "Failed to resend verification code",
        };
      }

      return {
        success: true,
        message: result.message,
      };
    } catch (error: any) {
      console.error("Resend verification error:", error);
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Network error. Please try again later.",
      };
    }
  };
};
