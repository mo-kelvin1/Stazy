// app/lib/mockListings.ts
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

// lib/mockServices.js



export const mockServices: Service[] = [
  {
    id: 'svc101',
    title: 'Modern Apartment Deep Cleaning',
    description: 'Thorough cleaning for high-end apartments including kitchen, bathroom, and common spaces.',
    location: 'Accra, Ghana',
    price: 180,
    duration: 3,
    rating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d',
      'https://images.unsplash.com/photo-1588854337119-70a8ad9f0608',
    ],
    category: 'cleaning',
    serviceType: 'one_time',
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      timeSlots: ['09:00-12:00', '14:00-17:00'],
    },
    requirements: ['Remove valuables before service', 'Pets must be secured'],
    included: ['Dusting', 'Vacuuming', 'Surface Disinfection'],
    maxGuests: 0,
    createdAt: new Date('2025-05-01T10:00:00Z'),
    updatedAt: new Date('2025-06-20T12:00:00Z'),
    isGuestFavorite: true,
    provider: 'Asante',
    providerEmail: 'asante@example.com'
  },
  {
    id: 'svc102',
    title: 'Property Photography Session',
    description: 'Professional real estate photography service perfect for listings and brochures.',
    location: 'Kumasi, Ghana',
    price: 250,
    duration: 2,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      'https://images.unsplash.com/photo-1572120360610-d971b9b78827',
    ],
    category: 'photography',
    serviceType: 'one_time',
    availability: {
      days: ['Tuesday', 'Thursday'],
      timeSlots: ['10:00-12:00', '15:00-17:00'],
    },
    requirements: ['Property must be staged and accessible'],
    included: ['20 HD Edited Images', 'Exterior & Interior Shots'],
    maxGuests: 0,
    createdAt: new Date('2025-04-10T09:00:00Z'),
    updatedAt: new Date('2025-06-22T11:00:00Z'),
    provider: 'Mensah',
    providerEmail: 'mensah@example.com'
  },
  {
    id: 'svc103',
    title: 'Furnished Apartment Rental Tour',
    description: 'Book a guided tour to view our furnished studio and 2-bedroom apartments in real-time.',
    location: 'Tema, Ghana',
    price: 0,
    duration: 1,
    rating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20b',
      'https://images.unsplash.com/photo-1615873968403-89f2bcd5d871',
    ],
    category: 'tour_guide',
    serviceType: 'on_demand',
    availability: {
      days: ['Monday', 'Saturday'],
      timeSlots: ['11:00-12:00', '16:00-17:00'],
    },
    requirements: ['Valid ID for property access'],
    included: ['In-person guide', 'Q&A session'],
    maxGuests: 5,
    createdAt: new Date('2025-05-15T14:00:00Z'),
    updatedAt: new Date('2025-06-23T15:00:00Z'),
    isGuestFavorite: true,
    provider: 'Akua',
    providerEmail: 'akua@example.com'
  },
  {
    id: 'svc104',
    title: 'Rental Property Maintenance',
    description: 'General maintenance service including plumbing, electricity, and surface repair.',
    location: 'Takoradi, Ghana',
    price: 120,
    duration: 2,
    rating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
    ],
    category: 'maintenance',
    serviceType: 'recurring',
    availability: {
      days: ['Wednesday', 'Friday'],
      timeSlots: ['08:00-10:00', '13:00-15:00'],
    },
    requirements: ['Access to power and water', 'Owner authorization'],
    included: ['Plumbing Fixes', 'Electrical Checks'],
    maxGuests: 0,
    createdAt: new Date('2025-03-01T08:00:00Z'),
    updatedAt: new Date('2025-06-18T08:30:00Z'),
    provider: 'Selorm',
    providerEmail: 'selorm@example.com'
  },
  {
    id: 'svc105',
    title: 'Luxury Penthouse Photography',
    description: 'Showcase your high-end property with our premium photo shoot, perfect for listings and ads.',
    location: 'East Legon, Accra',
    price: 450,
    duration: 3,
    rating: 4.95,
    images: [
      'https://images.unsplash.com/photo-1600585154901-927005125b63',
      'https://images.unsplash.com/photo-1599423300746-b62533397364',
    ],
    category: 'photography',
    serviceType: 'one_time',
    availability: {
      days: ['Monday', 'Thursday'],
      timeSlots: ['10:00-13:00', '15:00-18:00'],
    },
    requirements: ['Access to entire property', 'Staged and decluttered space'],
    included: ['40 HD images', 'Drone shots'],
    maxGuests: 0,
    createdAt: new Date('2025-05-05T10:30:00Z'),
    updatedAt: new Date('2025-06-22T11:30:00Z'),
    isGuestFavorite: true,
    provider: 'Kofi',
    providerEmail: 'kofi@example.com'
  },
  {
    id: 'svc106',
    title: 'Home Rental Virtual Tour Setup',
    description: 'Set up a 360° virtual walkthrough for your listed property to increase engagement and bookings.',
    location: 'Osu, Accra',
    price: 320,
    duration: 2,
    rating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1613977257363-707ba934822b',
    ],
    category: 'photography',
    serviceType: 'on_demand',
    availability: {
      days: ['Tuesday', 'Friday'],
      timeSlots: ['09:00-11:00', '14:00-16:00'],
    },
    requirements: ['Clean and staged rooms', 'Stable internet for setup'],
    included: ['360° Camera Setup', 'Hosting for 3 months'],
    maxGuests: 0,
    createdAt: new Date('2025-04-20T12:00:00Z'),
    updatedAt: new Date('2025-06-20T12:30:00Z'),
    provider: 'Abena',
    providerEmail: 'abena@example.com'
  },
  {
    id: 'svc107',
    title: 'Airbnb Readiness Deep Clean',
    description: 'Ensure your short-term rental is spotless and ready for guests with our premium cleaning service.',
    location: 'Airport Residential Area, Accra',
    price: 220,
    duration: 3,
    rating: 4.85,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
    category: 'cleaning',
    serviceType: 'recurring',
    availability: {
      days: ['Wednesday', 'Sunday'],
      timeSlots: ['08:00-11:00', '13:00-16:00'],
    },
    requirements: ['Unit must be vacant', 'Cleaning supplies accessible or paid add-on'],
    included: ['Full apartment clean', 'Bed linen change', 'Air freshener'],
    maxGuests: 0,
    createdAt: new Date('2025-05-10T09:00:00Z'),
    updatedAt: new Date('2025-06-21T09:15:00Z'),
    provider: 'Esi',
    providerEmail: 'esi@example.com'
  },
  {
    id: 'svc108',
    title: 'Suburban Duplex Viewing Tour',
    description: 'Join a scheduled guided tour of available duplex units in a serene gated community.',
    location: 'Tema Community 25',
    price: 0,
    duration: 1,
    rating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1600585153837-1c1f8cbdc1f1',
    ],
    category: 'tour_guide',
    serviceType: 'on_demand',
    availability: {
      days: ['Saturday'],
      timeSlots: ['10:00-11:00', '15:00-16:00'],
    },
    requirements: ['Pre-registration 24 hrs before tour', 'Wear covered shoes'],
    included: ['Guide access', 'Printed brochure'],
    maxGuests: 10,
    createdAt: new Date('2025-04-28T10:00:00Z'),
    updatedAt: new Date('2025-06-24T11:00:00Z'),
    provider: 'Nana',
    providerEmail: 'nana@example.com'
  },
];
