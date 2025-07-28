import { Experience } from "../../types/Experience";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";

export interface PaginatedExperiencesResult {
  success: boolean;
  experiences?: Experience[];
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  message?: string;
}

export const createRefreshExperiencesAction = (
  tokenStore: SimulatedTokenStore
) => {
  return async (
    page: number = 0,
    size: number = 10
  ): Promise<PaginatedExperiencesResult> => {
    try {
      const token = await tokenStore.getToken();
      if (!token) {
        return {
          success: false,
          message: "No authentication token found",
        };
      }
      const response = await fetch(
        `http://10.132.119.88:8080/api/experiences?page=${page}&size=${size}`,
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
      const experiences: Experience[] = (data.items || []).map((experience: any) => ({
        id: experience.id.toString(),
        title: experience.title || "",
        description: experience.description || "",
        location: experience.location || "",
        price: experience.price || 0,
        duration: experience.duration || 0,
        rating: experience.rating || 0,
        images: experience.images || [],
        hostName: experience.hostName || "",
        hostEmail: experience.hostEmail || "",
        category: experience.category || "adventure",
        experienceType: experience.experienceType || "group",
        difficulty: experience.difficulty || "easy",
        ageRestriction: {
          minimum: experience.minimumAge || 0,
          maximum: experience.maximumAge,
        },
        maxParticipants: experience.maxParticipants || 1,
        included: experience.included || [],
        toBring: experience.toBring || [],
        meetingPoint: experience.meetingPoint || "",
        languages: experience.languages || [],
        availability: {
          days: experience.availabilityDays || [],
          timeSlots: experience.availabilityTimeSlots || [],
        },
        createdAt: new Date(experience.createdAt),
        updatedAt: new Date(experience.updatedAt),
      }));
      return {
        success: true,
        experiences,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalItems: data.totalItems,
      };
    } catch (error: any) {
      console.error("Error refreshing experiences:", error);
      return {
        success: false,
        message: error.message || "Failed to refresh experiences",
      };
    }
  };
};
