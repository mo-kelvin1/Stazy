import { Service } from "../../types/Service";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";

export interface PaginatedServicesResult {
  success: boolean;
  services?: Service[];
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  message?: string;
}

export const createRefreshServicesAction = (
  tokenStore: SimulatedTokenStore
) => {
  return async (
    page: number = 0,
    size: number = 10
  ): Promise<PaginatedServicesResult> => {
    try {
      const token = await tokenStore.getToken();
      if (!token) {
        return {
          success: false,
          message: "No authentication token found",
        };
      }
      const response = await fetch(
        `http://172.20.10.2:8080/api/service-offers?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          message:
            errorData.message || `HTTP error! status: ${response.status}`,
        };
      }
      const data = await response.json();
      const services: Service[] = (data.items || []).map((service: any) => ({
        id: service.id.toString(),
        title: service.title || "",
        description: service.description || "",
        location: service.location || "",
        price: service.price || 0,
        duration: service.duration || 0,
        rating: service.rating || 0,
        images: service.images || [],
        category: service.category || "other",
        serviceType: service.serviceType || "one_time",
        availability: {
          days: service.availabilityDays || [],
          timeSlots: service.availabilityTimeSlots || [],
        },
        requirements: service.requirements || [],
        included: service.included || [],
        maxGuests: service.maxGuests || 1,
        createdAt: new Date(service.createdAt),
        updatedAt: new Date(service.updatedAt),
        isGuestFavorite: service.isGuestFavorite || false,
        provider: service.provider || "",
        providerEmail: service.providerEmail || "",
      }));
      return {
        success: true,
        services,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalItems: data.totalItems,
      };
    } catch (error: any) {
      console.error("Error refreshing services:", error);
      return {
        success: false,
        message: error.message || "Failed to refresh services",
      };
    }
  };
};
