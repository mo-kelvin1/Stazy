import axios from "axios";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";

export const createCompleteProfileAction = (
  tokenStore: SimulatedTokenStore,
  setIsAuthenticated: (isAuth: boolean) => void
) => {
  return async (
    firstName: string,
    lastName: string,
    phoneNumber: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const token = await tokenStore.getToken();

      if (!token) {
        return { success: false, message: "No token found. Please log in." };
      }

      const response = await axios.post(
        "http://10.132.154.202:8080/api/auth/complete-profile",
        {
          firstName,
          lastName,
          phoneNumber,
        },
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
          message: result.message || "Profile update failed",
        };
      }

      // Mark user as authenticated
      setIsAuthenticated(true);

      return {
        success: true,
        message: result.message || "Profile completed successfully",
      };
    } catch (error: any) {
      console.error("Profile completion error:", error);
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Network error. Please try again.",
      };
    }
  };
};
