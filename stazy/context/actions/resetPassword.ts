import axios from "axios";

export const createResetPasswordAction = (
  setIsAuthenticated: (isAuth: boolean) => void
) => {
  return async (
    email: string,
    otp: string,
    newPassword: string
  ): Promise<{
    success: boolean;
    message?: string;
  }> => {
    try {
      const response = await axios.post(
        "http://10.133.134.146:8080/api/auth/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );

      const result = response.data;

      if (!result.success) {
        return {
          success: false,
          message: result.message || "Failed to reset password",
        };
      }

      // Optional: Automatically authenticate the user after reset
      setIsAuthenticated(true);

      return {
        success: true,
        message: result.message || "Password reset successfully",
      };
    } catch (error: any) {
      console.error("Reset password error:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Network error. Please try again.",
      };
    }
  };
};
