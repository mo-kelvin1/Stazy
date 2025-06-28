import axios from "axios";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";

export const createUpdateProfileAction = (
  tokenStore: SimulatedTokenStore,
  setIsAuthenticated: (isAuth: boolean) => void
) => {
  return async (
    firstName: string,
    lastName: string,
    phoneNumber: string,
    address?: string,
    dateOfBirth?: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const token = await tokenStore.getToken();

      if (!token) {
        return { success: false, message: "No token found. Please log in." };
      }

      const response = await axios.post(
        "http://100.66.107.9:8080/update-profile",
        {
          firstName,
          lastName,
          phoneNumber,
          address,
          dateOfBirth,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
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
      return {
        success: true,
        message: result.message || "Profile updated successfully",
      };
    } catch (error: any) {
      console.error("Profile completion error:", error);
      return {
        success: false,
        message:
          error?.response?.data?.message || "Network error. Please try again.",
      };
    }
  };
};
