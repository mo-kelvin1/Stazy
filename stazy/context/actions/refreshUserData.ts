import axios from "axios";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";
import { User } from "../../types/User";

export const createRefreshUserDataAction = (
  tokenStore: SimulatedTokenStore,
  setUser: (user: User | null) => void
) => {
  return async (): Promise<void> => {
    try {
      const token = await tokenStore.getToken();
      if (!token) return;

      const response = await axios.get(
        "http://10.133.134.146:8080/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response.data;

      if (!result.success || !result.data) {
        console.error("Failed to refresh user data:", result.message);
        return;
      }

      const userData: User = {
        id: result.data.email, // Using email as user ID (or update if backend sends a real ID)
        email: result.data.email,
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        phoneNumber: result.data.phoneNumber,
        password: "", // Password is not sent by backend, so leave blank
        address: result.data.address,
        dateOfBirth: result.data.dateOfBirth,
        isProfileComplete: true, // Assume profile is complete if this endpoint returns data
      };

      await tokenStore.setUserData(userData);
      setUser(userData);
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };
};
