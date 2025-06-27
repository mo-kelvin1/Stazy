import axios from "axios";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";

export const createVerifyOTPAction = (tokenStore: SimulatedTokenStore) => {
  return async (
    otpCode: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const token = await tokenStore.getToken();

      if (!token) {
        return { success: false, message: "No token found. Please log in." };
      }

      const response = await axios.post(
        "http://100.66.107.9:8080/api/auth/verify-email",
        { otp: otpCode },
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
          message: result.message || "Email verification failed",
        };
      }

      return {
        success: true,
        message: result.message || "Email verified successfully",
      };
    } catch (error: any) {
      console.error("OTP verification error:", error);
      return {
        success: false,
        message:
          error?.response?.data?.message || "Network error. Please try again.",
      };
    }
  };
};
