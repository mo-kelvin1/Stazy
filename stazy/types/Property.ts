export interface Property {
    id: string;
    title: string;
    description: string;
    location: string;
    price: number;
    weekendPrice?: number;
    rating: number;
    nights: number;
    images: string[];
    category: 'house' | 'flat' | 'barn' | 'bed_breakfast' | 'boat' | 'cabin' | 'campervan' | 'casa_particular' | 'villa';
    propertyType: 'entire_place' | 'room' | 'shared_room';
    isGuestFavorite?: boolean;
    amenities: string[];
    highlights: string[];
    minGuests:number;
    maxGuests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
    hostId: string;
    hostEmail: string;
    is_available?:boolean;
    createdAt: Date;
    updatedAt: Date;
  }