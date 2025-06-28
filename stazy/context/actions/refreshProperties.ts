import axios from "axios";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";
import { Property } from "../../types/Property";

export const createRefreshPropertiesAction = (tokenStore: SimulatedTokenStore) => {
  return async (): Promise<{ success: boolean; properties?: Property[]; message?: string }> => {
    try {
      const token = await tokenStore.getToken();
      if (!token) {
        return { success: false, message: "No token found. Please log in." };
      }
      const response = await axios.get(
        "http://172.20.10.11:8080/api/properties",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // The backend returns an array of properties (excluding user's own properties)
      const properties: Property[] = response.data;
      return { success: true, properties };
    } catch (error: any) {
      console.error("Error fetching properties:", error);
      return {
        success: false,
        message: error?.response?.data?.message || "Network error. Please try again.",
      };
    }
  };
}; 