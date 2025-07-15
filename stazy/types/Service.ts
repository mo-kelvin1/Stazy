  export interface Service {
    id: string;
    title: string;
    description: string;
    location: string;
    price: number;
    duration: number; // in hours
    rating: number;
    images: string[];
    category: 'cleaning' | 'maintenance' | 'photography' | 'cooking' | 'tour_guide' | 'transportation' | 'other';
    serviceType: 'one_time' | 'recurring' | 'on_demand';
    availability: {
      days: string[];
      timeSlots: string[];
    };
    requirements: string[];
    included: string[];
    maxGuests: number;
    createdAt: Date;
    updatedAt: Date;
    isGuestFavorite?: boolean;
    provider:string;
    providerEmail: string;
  }
