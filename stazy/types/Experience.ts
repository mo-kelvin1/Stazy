  export interface Experience {
    id: string;
    title: string;
    description: string;
    location: string;
    price: number;
    duration: number; // in hours
    rating: number;
    images: string[];
    hostName:string;
    hostEmail: string;
    category: 'adventure' | 'cultural' | 'food_drink' | 'nature' | 'sports' | 'wellness' | 'entertainment' | 'art' | 'history';
    experienceType: 'group' | 'private_experience' | 'online';
    difficulty: 'easy' | 'moderate' | 'challenging';
    ageRestriction: {
      minimum: number;
      maximum?: number;
    };
    maxParticipants: number;
    included: string[];
    toBring: string[];
    meetingPoint: string;
    languages: string[];
    availability: {
      days: string[];
      timeSlots: string[];
    };
    createdAt: Date;
    updatedAt: Date;
  }