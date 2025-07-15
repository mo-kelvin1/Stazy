import axios from "axios";

export const createForgotPasswordAction = () => {
  return async (
    email: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await axios.post(
        "http://10.30.22.153:8080/api/auth/forgot-password",
        { email }
      );

      const result = response.data;
      if (!result.success) {
        return {
          success: false,
          message: result.message || "Failed to send password reset code",
        };
      }

      return {
        success: true,
        message: result.message || "Password reset code sent to your email",
      };
    } catch (error: any) {
      console.error("Forgot password error:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Network error. Please try again.",
      };
    }
  };
};
