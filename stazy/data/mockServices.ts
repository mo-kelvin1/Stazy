// app/lib/mockListings.ts
export interface Service {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  nights: number;
  image: string;
  category: string;
  isGuestFavorite?: boolean;
  duration: string;
  minimumPrice?: number;
}

// lib/mockServices.js


export const mockServices: Service[] = [
  // Photography Services
  {
    id: "photo-1",
    title: "Stylish vintage car photo shoot Tour",
    category: "Photography",
    price: 63,
    rating: 4.95,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    location: "Rome, Italy",
    duration: "2 hours",
    isGuestFavorite: true,
    nights: 1
  },
  {
    id: "photo-2",
    title: "Photo session at the Metropolitan Museum of Art",
    category: "Photography",
    price: 300,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1544967882-6abec136baba?w=400&h=300&fit=crop",
    location: "New York, United States",
    duration: "3 hours",
    isGuestFavorite: false,
    nights: 1
  },
  {
    id: "photo-3",
    title: "Professional portrait session in Central Park",
    category: "Photography",
    price: 150,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
    location: "New York, United States",
    duration: "1.5 hours",
    isGuestFavorite: false,
    nights: 1
  },
  {
    id: "photo-4",
    title: "Wedding photography with vintage flair",
    category: "Photography",
    price: 800,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
    location: "Paris, France",
    duration: "8 hours",
    isGuestFavorite: true,
    nights: 1
  },
  {
    id: "photo-5",
    title: "Street photography workshop and tour",
    category: "Photography",
    price: 85,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1502920514313-52581002a659?w=400&h=300&fit=crop",
    location: "Tokyo, Japan",
    duration: "4 hours",
    isGuestFavorite: false,
    nights: 1
  },

  // Chef Services
  {
    id: "chef-1",
    title: "Hyperlocal, foraged fare by Clair",
    category: "Chefs",
    price: 49,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    location: "Portland, Oregon",
    duration: "3 hours",
    isGuestFavorite: false,
    minimumPrice: 110,
    nights: 1
  },
  {
    id: "chef-2",
    title: "Southern Soul with a French Twist by Chef Ponder",
    category: "Chefs",
    price: 45,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    location: "New Orleans, Louisiana",
    duration: "2.5 hours",
    isGuestFavorite: true,
    nights: 1
  },
  {
    id: "chef-3",
    title: "Authentic Italian pasta making experience",
    category: "Chefs",
    price: 75,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
    location: "Florence, Italy",
    duration: "4 hours",
    isGuestFavorite: false,
    nights: 1
  },
  {
    id: "chef-4",
    title: "Japanese sushi masterclass with Chef Tanaka",
    category: "Chefs",
    price: 120,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    location: "Kyoto, Japan",
    duration: "3 hours",
    isGuestFavorite: true,
    nights: 1
  },
  {
    id: "chef-5",
    title: "Farm-to-table Mexican cuisine cooking class",
    category: "Chefs",
    price: 65,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop",
    location: "Oaxaca, Mexico",
    duration: "5 hours",
    isGuestFavorite: false,
    nights: 1
  },

  // Training Services
  {
    id: "training-1",
    title: "Personal fitness training in the park",
    category: "Training",
    price: 80,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    location: "Los Angeles, California",
    duration: "1 hour",
    isGuestFavorite: false,
    nights: 1
  },
  {
    id: "training-2",
    title: "Yoga and meditation retreat experience",
    category: "Training",
    price: 95,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    location: "Bali, Indonesia",
    duration: "2 hours",
    isGuestFavorite: true,
    nights: 1
  },
  {
    id: "training-3",
    title: "Martial arts training with Master Chen",
    category: "Training",
    price: 70,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&h=300&fit=crop",
    location: "Beijing, China",
    duration: "1.5 hours",
    isGuestFavorite: false,
    nights: 1
  },
  {
    id: "training-4",
    title: "Rock climbing instruction for beginners",
    category: "Training",
    price: 110,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400&h=300&fit=crop",
    location: "Boulder, Colorado",
    duration: "3 hours",
    isGuestFavorite: false,
    nights: 1
  },
  {
    id: "training-5",
    title: "Dance lessons with professional instructor",
    category: "Training",
    price: 60,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=300&fit=crop",
    location: "Buenos Aires, Argentina",
    duration: "2 hours",
    isGuestFavorite: true,
    nights: 1
  },

  // Wellness Services
  {
    id: "wellness-1",
    title: "Therapeutic massage and spa treatment",
    category: "Wellness",
    price: 120,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
    location: "Sedona, Arizona",
    duration: "90 minutes",
    isGuestFavorite: true,
    nights: 1
  },
  {
    id: "wellness-2",
    title: "Sound healing and meditation session",
    category: "Wellness",
    price: 85,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    location: "Tulum, Mexico",
    duration: "2 hours",
    isGuestFavorite: false,
    nights: 1
  },
  {
    id: "wellness-3",
    title: "Aromatherapy and essential oils workshop",
    category: "Wellness",
    price: 65,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1596725295942-d92e7ac6dd35?w=400&h=300&fit=crop",
    location: "Provence, France",
    duration: "3 hours",
    isGuestFavorite: false,
    nights: 1
  },
  {
    id: "wellness-4",
    title: "Reiki healing energy session",
    category: "Wellness",
    price: 90,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    location: "Ubud, Bali",
    duration: "1 hour",
    isGuestFavorite: false,
    nights: 1
  },
  {
    id: "wellness-5",
    title: "Forest bathing and mindfulness retreat",
    category: "Wellness",
    price: 110,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    location: "Pacific Northwest, USA",
    duration: "4 hours",
    isGuestFavorite: true,
    nights: 1
  },

  // Creative Services
  {
    id: "creative-1",
    title: "Pottery and ceramics workshop",
    category: "Creative",
    price: 75,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    location: "Santa Fe, New Mexico",
    duration: "3 hours",
    isGuestFavorite: false,
    nights: 1
  },
  {
    id: "creative-2",
    title: "Watercolor painting class in the countryside",
    category: "Creative",
    price: 55,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
    location: "Tuscany, Italy",
    duration: "4 hours",
    isGuestFavorite: true,
    nights: 1
  },
  {
    id: "creative-3",
    title: "Jewelry making workshop with local artisan",
    category: "Creative",
    price: 95,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
    location: "Bangkok, Thailand",
    duration: "2.5 hours",
    isGuestFavorite: false,
    nights: 1
  },
  {
    id: "creative-4",
    title: "Traditional calligraphy and ink painting",
    category: "Creative",
    price: 70,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
    location: "Seoul, South Korea",
    duration: "2 hours",
    isGuestFavorite: false,
    nights: 1
  },
  {
    id: "creative-5",
    title: "Woodworking and furniture design class",
    category: "Creative",
    price: 130,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    location: "Portland, Oregon",
    duration: "6 hours",
    isGuestFavorite: true,
    nights: 1
  }
];