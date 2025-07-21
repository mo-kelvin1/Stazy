import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";

export interface Booking {
  id: number;
  propertyId: number;
  userId: number;
  startDate: string;
  endDate: string;
  numberOfGuests: number;
  totalPrice: number;
  status: string;
  specialRequests?: string;
  entityTitle?: string;
  entityLocation?: string;
  hostEmail?: string;
  entityImages?: string;
  bookingType?: string;
  // Host information
  hostId?: number;
  // User information
  userEmail?: string;
  userFirstName?: string;
  userLastName?: string;
}

export interface RefreshBookingsResult {
  success: boolean;
  bookings?: Booking[];
  message?: string;
}

export const createRefreshBookingsAction = (tokenStore: SimulatedTokenStore) => {
  return async (): Promise<RefreshBookingsResult> => {
    try {
      const token = await tokenStore.getToken();
      if (!token) {
        return {
          success: false,
          message: "No authentication token found",
        };
      }

      const response = await fetch("http://10.60.32.210:8080/api/bookings/my-bookings", {
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

      const bookingsData = await response.json();
      return { success: true, bookings: bookingsData };
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      return {
        success: false,
        message: error?.message || "Network error. Please try again.",
      };
    }
  };
}; 