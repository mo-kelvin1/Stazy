// lib/mockExperiences.ts

export interface Experience {
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  location: string;
  duration: string;
  isGuestFavorite: boolean;
  isOriginal?: boolean;
  isPopular?: boolean;
  nights: number;
}

export const mockExperiences: Experience[] = [
  // Airbnb Originals
  {
    id: "original-1",
    title: "Glam up for Lollapalooza with a star makeup artist",
    category: "Airbnb Originals",
    price: 228,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
    location: "Berlin, Germany",
    duration: "2 hours",
    isGuestFavorite: true,
    isOriginal: true,
    nights: 1
  },
  {
    id: "original-2",
    title: "Lunch with fashion icon Lenny Niemeyer in her home",
    category: "Airbnb Originals",
    price: 101,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
    location: "Rio de Janeiro, Brazil",
    duration: "3 hours",
    isGuestFavorite: false,
    isOriginal: true,
    nights: 1
  },
  {
    id: "original-3",
    title: "Design workshop with renowned architect in Barcelona",
    category: "Airbnb Originals",
    price: 315,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
    location: "Barcelona, Spain",
    duration: "4 hours",
    isGuestFavorite: true,
    isOriginal: true,
    nights: 1
  },
  {
    id: "original-4",
    title: "Private concert with Grammy-winning musician",
    category: "Airbnb Originals",
    price: 450,
    rating: 4.95,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    location: "Nashville, Tennessee",
    duration: "2.5 hours",
    isGuestFavorite: false,
    isOriginal: true,
    nights: 1
  },
  {
    id: "original-5",
    title: "Michelin star chef's exclusive dining experience",
    category: "Airbnb Originals",
    price: 380,
    rating: 4.92,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    location: "Paris, France",
    duration: "3 hours",
    isGuestFavorite: true,
    isOriginal: true,
    nights: 1
  },
  {
    id: "original-6",
    title: "Behind-the-scenes movie set experience with director",
    category: "Airbnb Originals",
    price: 275,
    rating: 4.87,
    image: "https://images.unsplash.com/photo-1489599143617-cdde14d41327?w=400&h=300&fit=crop",
    location: "Los Angeles, California",
    duration: "5 hours",
    isGuestFavorite: false,
    isOriginal: true,
    nights: 1
  },

  // Popular Adventures
  {
    id: "adventure-1",
    title: "Cape of Good Hope & Cape Point, Penguins RoadTrip",
    category: "Popular Adventures",
    price: 68,
    rating: 4.94,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
    location: "Cape Town, South Africa",
    duration: "Full day",
    isGuestFavorite: true,
    isPopular: true,
    nights: 1
  },
  {
    id: "adventure-2",
    title: "Hike Lions Head",
    category: "Popular Adventures",
    price: 50,
    rating: 4.98,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    location: "Cape Town, South Africa",
    duration: "4 hours",
    isGuestFavorite: false,
    isPopular: true,
    nights: 1
  },
  {
    id: "adventure-3",
    title: "Table Mountain sunset helicopter tour",
    category: "Popular Adventures",
    price: 185,
    rating: 4.89,
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop",
    location: "Cape Town, South Africa",
    duration: "2 hours",
    isGuestFavorite: true,
    isPopular: true,
    nights: 1
  },
  {
    id: "adventure-4",
    title: "Wine tasting safari in Stellenbosch",
    category: "Popular Adventures",
    price: 95,
    rating: 4.85,
    image: "https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400&h=300&fit=crop",
    location: "Stellenbosch, South Africa",
    duration: "6 hours",
    isGuestFavorite: false,
    isPopular: true,
    nights: 1
  },
  {
    id: "adventure-5",
    title: "Shark cage diving experience",
    category: "Popular Adventures",
    price: 220,
    rating: 4.76,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    location: "Gansbaai, South Africa",
    duration: "8 hours",
    isGuestFavorite: true,
    isPopular: true,
    nights: 1
  },
  {
    id: "adventure-6",
    title: "Township cultural tour and cooking class",
    category: "Popular Adventures",
    price: 75,
    rating: 4.91,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    location: "Cape Town, South Africa",
    duration: "5 hours",
    isGuestFavorite: false,
    isPopular: true,
    nights: 1
  },

  // Cultural Immersion
  {
    id: "culture-1",
    title: "Traditional Japanese tea ceremony with geisha",
    category: "Cultural Immersion",
    price: 180,
    rating: 4.93,
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=300&fit=crop",
    location: "Kyoto, Japan",
    duration: "3 hours",
    isGuestFavorite: true,
    nights: 1
  },
  {
    id: "culture-2",
    title: "Flamenco dancing lesson in authentic tablao",
    category: "Cultural Immersion",
    price: 85,
    rating: 4.88,
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=300&fit=crop",
    location: "Seville, Spain",
    duration: "2.5 hours",
    isGuestFavorite: false,
    nights: 1
  },
  {
    id: "culture-3",
    title: "Maori cultural experience and hangi feast",
    category: "Cultural Immersion",
    price: 120,
    rating: 4.87,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
    location: "Rotorua, New Zealand",
    duration: "4 hours",
    isGuestFavorite: true,
    nights: 1
  },
  {
    id: "culture-4",
    title: "Aboriginal dreamtime stories and art workshop",
    category: "Cultural Immersion",
    price: 95,
    rating: 4.82,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
    location: "Alice Springs, Australia",
    duration: "3.5 hours",
    isGuestFavorite: false,
    nights: 1
  },
  {
    id: "culture-5",
    title: "Sami reindeer herding and traditional crafts",
    category: "Cultural Immersion",
    price: 165,
    rating: 4.91,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    location: "Lapland, Norway",
    duration: "6 hours",
    isGuestFavorite: true,
    nights: 1
  },
  {
    id: "culture-6",
    title: "Indian classical music and tabla lesson",
    category: "Cultural Immersion",
    price: 65,
    rating: 4.79,
    image: "https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=400&h=300&fit=crop",
    location: "Jaipur, India",
    duration: "2 hours",
    isGuestFavorite: false,
    nights: 1
  },

  // Nature & Wildlife
  {
    id: "nature-1",
    title: "Northern Lights photography expedition",
    category: "Nature & Wildlife",
    price: 195,
    rating: 4.96,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop",
    location: "Reykjavik, Iceland",
    duration: "8 hours",
    isGuestFavorite: true,
    nights: 1
  },
  {
    id: "nature-2",
    title: "Whale watching and marine biology tour",
    category: "Nature & Wildlife",
    price: 125,
    rating: 4.84,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    location: "Monterey Bay, California",
    duration: "4 hours",
    isGuestFavorite: false,
    nights: 1
  },
  {
    id: "nature-3",
    title: "Gorilla trekking in Bwindi Forest",
    category: "Nature & Wildlife",
    price: 350,
    rating: 4.92,
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    location: "Bwindi, Uganda",
    duration: "Full day",
    isGuestFavorite: true,
    nights: 1
  },
  {
    id: "nature-4",
    title: "Amazon rainforest canopy walk and bird watching",
    category: "Nature & Wildlife",
    price: 145,
    rating: 4.89,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    location: "Iquitos, Peru",
    duration: "6 hours",
    isGuestFavorite: false,
    nights: 1
  },
  {
    id: "nature-5",
    title: "Sea turtle conservation volunteer experience",
    category: "Nature & Wildlife",
    price: 110,
    rating: 4.86,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    location: "Costa Rica",
    duration: "5 hours",
    isGuestFavorite: true,
    nights: 1
  },
  {
    id: "nature-6",
    title: "Safari game drive and bush camping",
    category: "Nature & Wildlife",
    price: 280,
    rating: 4.93,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop",
    location: "Serengeti, Tanzania",
    duration: "12 hours",
    isGuestFavorite: false,
    nights: 1
  },

  // Urban Exploration
  {
    id: "urban-1",
    title: "Street art and graffiti tour with local artists",
    category: "Urban Exploration",
    price: 45,
    rating: 4.81,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
    location: "Berlin, Germany",
    duration: "3 hours",
    isGuestFavorite: false,
    nights: 1
  },
  {
    id: "urban-2",
    title: "Rooftop photography workshop at golden hour",
    category: "Urban Exploration",
    price: 75,
    rating: 4.77,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    location: "New York City, USA",
    duration: "2 hours",
    isGuestFavorite: true,
    nights: 1
  },
  {
    id: "urban-3",
    title: "Underground speakeasy and cocktail history tour",
    category: "Urban Exploration",
    price: 85,
    rating: 4.83,
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=300&fit=crop",
    location: "Chicago, Illinois",
    duration: "2.5 hours",
    isGuestFavorite: false,
    nights: 1
  },
  {
    id: "urban-4",
    title: "Night market food crawl with local guide",
    category: "Urban Exploration",
    price: 55,
    rating: 4.88,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    location: "Bangkok, Thailand",
    duration: "4 hours",
    isGuestFavorite: true,
    nights: 1
  },
  {
    id: "urban-5",
    title: "Hidden gardens and secret courtyards walk",
    category: "Urban Exploration",
    price: 40,
    rating: 4.74,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    location: "Paris, France",
    duration: "2.5 hours",
    isGuestFavorite: false,
    nights: 1
  },
  {
    id: "urban-6",
    title: "Architectural walking tour of modernist buildings",
    category: "Urban Exploration",
    price: 65,
    rating: 4.79,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
    location: "Tel Aviv, Israel",
    duration: "3 hours",
    isGuestFavorite: true,
    nights: 1
  }
];