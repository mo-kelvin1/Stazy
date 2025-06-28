import { Service } from "../../types/Service";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";

export interface RefreshServicesResult {
  success: boolean;
  services?: Service[];
  message?: string;
}

export const createRefreshServicesAction = (tokenStore: SimulatedTokenStore) => {
  return async (): Promise<RefreshServicesResult> => {
    try {
      const token = await tokenStore.getToken();
      if (!token) {
        return {
          success: false,
          message: "No authentication token found",
        };
      }

      const response = await fetch("http://100.66.107.9:8080/api/service-offers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          message: errorData.message || `HTTP error! status: ${response.status}`,
        };
      }

      const servicesData = await response.json();
      
      // Transform the backend data to match the frontend Service interface
      const services: Service[] = servicesData.map((service: any) => ({
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