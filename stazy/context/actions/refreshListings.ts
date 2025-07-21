import axios from "axios";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";
import { Property } from "../../types/Property";

export const createRefreshListingsAction = (tokenStore: SimulatedTokenStore) => {
  return async (): Promise<{ success: boolean; listings?: Property[]; message?: string }> => {
    try {
      const token = await tokenStore.getToken();
      if (!token) {
        return { success: false, message: "No token found. Please log in." };
      }
      const response = await axios.get(
        "http://10.60.32.210:8080/api/properties/my-properties",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // The backend returns an array of properties
      const listings: Property[] = response.data;
      return { success: true, listings };
    } catch (error: any) {
      console.error("Error fetching listings:", error);
      return {
        success: false,
        message: error?.response?.data?.message || "Network error. Please try again.",
      };
    }
  };
}; 