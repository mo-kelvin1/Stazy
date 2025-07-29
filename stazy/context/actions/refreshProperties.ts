import axios from "axios";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";
import { Property } from "../../types/Property";

export interface PaginatedPropertiesResult {
  success: boolean;
  properties?: Property[];
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  message?: string;
}

export const createRefreshPropertiesAction = (
  tokenStore: SimulatedTokenStore
) => {
  return async (
    page: number = 0,
    size: number = 10
  ): Promise<PaginatedPropertiesResult> => {
    try {
      const token = await tokenStore.getToken();
      if (!token) {
        return { success: false, message: "No token found. Please log in." };
      }
      const response = await axios.get(
        `http://172.20.10.2:8080/api/properties?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      const properties: Property[] = (data.items || []).map((prop: any) => ({
        ...prop,
        id: prop.id.toString(),
      }));
      return {
        success: true,
        properties,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalItems: data.totalItems,
      };
    } catch (error: any) {
      console.error("Error fetching properties:", error);
      return {
        success: false,
        message:
          error?.response?.data?.message || "Network error. Please try again.",
      };
    }
  };
};
