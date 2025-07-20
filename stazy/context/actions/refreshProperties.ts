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
        "http://10.133.134.146:8080/api/properties",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // The backend returns an array of properties (excluding user's own properties)
      const rawProperties = response.data;
      
      // Convert Long IDs to strings for frontend compatibility
      const properties: Property[] = rawProperties.map((prop: any) => ({
        ...prop,
        id: prop.id.toString(), // Convert Long to string
      }));
      
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