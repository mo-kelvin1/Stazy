// app/lib/mockListings.ts
export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  nights: number;
  image: string[];
  category: string;
  isGuestFavorite?: boolean;
}

export const mockProperties: Property[] = [
  // Popular homes in Accra
  {
    id: "1",
    title: "Modern Apartment in East Legon",
    location: "East Legon, Accra",
    price: 114,
    rating: 4.77,
    nights: 2,
    image: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"],
    isGuestFavorite: true,
    category: "Popular homes in Accra",
  },
  {
    id: "2",
    title: "Luxury Flat in Airport Residential",
    location: "Airport Residential, Accra",
    price: 137,
    rating: 4.83,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80"
    ],
    isGuestFavorite: true,
    category: "Popular homes in Accra",
  },
  {
    id: "3",
    title: "Cozy Studio in Osu",
    location: "Osu, Accra",
    price: 75,
    rating: 4.81,
    nights: 1,
    image: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Popular homes in Accra",
  },
  {
    id: "4",
    title: "Penthouse in Cantonments",
    location: "Cantonments, Accra",
    price: 195,
    rating: 5.0,
    nights: 3,
    image: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80"
    ],
    isGuestFavorite: true,
    category: "Popular homes in Accra",
  },
  {
    id: "5",
    title: "Family House in Tema",
    location: "Tema, Greater Accra",
    price: 89,
    rating: 4.65,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Popular homes in Accra",
  },
  {
    id: "6",
    title: "Beachfront Villa in Labadi",
    location: "Labadi, Accra",
    price: 168,
    rating: 4.92,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Popular homes in Accra",
  },
  {
    id: "7",
    title: "Historic Home in Jamestown",
    location: "Jamestown, Accra",
    price: 65,
    rating: 4.58,
    nights: 1,
    image: [
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Popular homes in Accra",
  },
  {
    id: "8",
    title: "Garden Apartment in Adabraka",
    location: "Adabraka, Accra",
    price: 92,
    rating: 4.71,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Popular homes in Accra",
  },

  // Cape Town Escapes
  {
    id: "9",
    title: "Table Mountain View Apartment",
    location: "Cape Town, South Africa",
    price: 102,
    rating: 4.85,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Cape Town Escapes",
  },
  {
    id: "10",
    title: "Waterfront Luxury Flat",
    location: "V&A Waterfront, Cape Town",
    price: 146,
    rating: 4.92,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80"
    ],
    isGuestFavorite: true,
    category: "Cape Town Escapes",
  },
  {
    id: "11",
    title: "Sea Point Ocean View",
    location: "Sea Point, Cape Town",
    price: 118,
    rating: 4.78,
    nights: 3,
    image: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Cape Town Escapes",
  },
  {
    id: "12",
    title: "Camps Bay Beach House",
    location: "Camps Bay, Cape Town",
    price: 225,
    rating: 4.96,
    nights: 4,
    image: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80"
    ],
    isGuestFavorite: true,
    category: "Cape Town Escapes",
  },
  {
    id: "13",
    title: "Historic Bo-Kaap House",
    location: "Bo-Kaap, Cape Town",
    price: 95,
    rating: 4.67,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Cape Town Escapes",
  },
  {
    id: "14",
    title: "Wine Estate Villa",
    location: "Constantia, Cape Town",
    price: 189,
    rating: 4.89,
    nights: 3,
    image: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Cape Town Escapes",
  },
  {
    id: "15",
    title: "City Bowl Apartment",
    location: "City Bowl, Cape Town",
    price: 87,
    rating: 4.73,
    nights: 1,
    image: [
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Cape Town Escapes",
  },
  {
    id: "16",
    title: "Hout Bay Cottage",
    location: "Hout Bay, Cape Town",
    price: 134,
    rating: 4.81,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Cape Town Escapes",
  },

  // Lagos Luxury Stays
  {
    id: "17",
    title: "Victoria Island Penthouse",
    location: "Victoria Island, Lagos",
    price: 156,
    rating: 4.88,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
    ],
    isGuestFavorite: true,
    category: "Lagos Luxury Stays",
  },
  {
    id: "18",
    title: "Ikoyi High-rise Apartment",
    location: "Ikoyi, Lagos",
    price: 128,
    rating: 4.75,
    image: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Lagos Luxury Stays",
    nights: 0
  },
  {
    id: "19",
    title: "Lekki Phase 1 Villa",
    location: "Lekki, Lagos",
    price: 189,
    image: [
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Lagos Luxury Stays",
    rating: 0,
    nights: 0
  },
  {
    id: "20",
    title: "Banana Island Mansion",
    location: "Banana Island, Lagos",
    image: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1000&q=80"
    ],
    nights: 5,
    isGuestFavorite: true,
    category: "Lagos Luxury Stays",
    price: 0,
    rating: 0
  },
  {
    id: "21",
    title: "Surulere Family Home",
    location: "Surulere, Lagos",
    price: 70,
    rating: 4.62,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1600566752229-450ddaa50aab?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Lagos Luxury Stays",
  },
  {
    id: "22",
    title: "Yaba Urban Loft",
    location: "Yaba, Lagos",
    price: 112,
    rating: 4.79,
    nights: 3,
    image: [
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Lagos Luxury Stays",
  },
  {
    id: "23",
    title: "Ikeja Central Apartment",
    location: "Ikeja, Lagos",
    price: 96,
    rating: 4.68,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1560448204-444092daa87f?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Lagos Luxury Stays",
  },
  {
    id: "24",
    title: "Maryland Cozy Apartment",
    location: "Maryland, Lagos",
    price: 81,
    rating: 4.71,
    nights: 1,
    image: [
      "https://images.unsplash.com/photo-1560448204-444092daa87f?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Lagos Luxury Stays",
  },

  // Nairobi City Breaks
  {
    id: "25",
    title: "Westlands Executive Suite",
    location: "Westlands, Nairobi",
    price: 98,
    rating: 4.76,
    nights: 2,
    image:[
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Nairobi City Breaks",
  },
  {
    id: "26",
    title: "Karen Suburban Villa",
    location: "Karen, Nairobi",
    price: 145,
    rating: 4.84,
    nights: 3,
    image: [
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1000&q=80"
    ],
    isGuestFavorite: true,
    category: "Nairobi City Breaks",
  },
  {
    id: "27",
    title: "Upper Hill Business Apartment",
    location: "Upper Hill, Nairobi",
    price: 87,
    rating: 4.69,
    nights: 1,
    image: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Nairobi City Breaks",
  },
  {
    id: "28",
    title: "Kilimani Modern Flat",
    location: "Kilimani, Nairobi",
    price: 76,
    rating: 4.73,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Nairobi City Breaks",
  },
  {
    id: "29",
    title: "Runda Garden House",
    location: "Runda, Nairobi",
    price: 167,
    rating: 4.89,
    nights: 3,
    image: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Nairobi City Breaks",
  },
  {
    id: "30",
    title: "Ngong Hills Retreat",
    location: "Ngong, Nairobi",
    price: 134,
    rating: 4.91,
    nights: 4,
    image: [
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1000&q=80"
    ],
    isGuestFavorite: true,
    category: "Nairobi City Breaks",
  },
  {
    id: "31",
    title: "Lavington Family Home",
    location: "Lavington, Nairobi",
    price: 119,
    rating: 4.77,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Nairobi City Breaks",
  },
  {
    id: "32",
    title: "Gigiri Diplomatic Quarter",
    location: "Gigiri, Nairobi",
    price: 156,
    rating: 4.86,
    nights: 3,
    image: [
      "https://images.unsplash.com/photo-1600566752229-450ddaa50aab?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Nairobi City Breaks",
  },

  // Casablanca Getaways
  {
    id: "33",
    title: "Corniche Ocean View",
    location: "Corniche, Casablanca",
    price: 89,
    rating: 4.72,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Casablanca Getaways",
  },
  {
    id: "34",
    title: "Medina Traditional Riad",
    location: "Old Medina, Casablanca",
    price: 67,
    rating: 4.65,
    nights: 1,
    image: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Casablanca Getaways",
  },
  {
    id: "35",
    title: "Anfa Modern Apartment",
    location: "Anfa, Casablanca",
    price: 112,
    rating: 4.81,
    nights: 3,
    image: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80"
    ],
    isGuestFavorite: true,
    category: "Casablanca Getaways",
  },
  {
    id: "36",
    title: "Maarif Business District",
    location: "Maarif, Casablanca",
    price: 95,
    rating: 4.74,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Casablanca Getaways",
  },
  {
    id: "37",
    title: "Bourgogne Luxury Suite",
    location: "Bourgogne, Casablanca",
    price: 143,
    rating: 4.87,
    nights: 3,
    image: [
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Casablanca Getaways",
  },
  {
    id: "38",
    title: "Ain Diab Beach Resort",
    location: "Ain Diab, Casablanca",
    price: 178,
    rating: 4.93,
    nights: 4,
    image: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80"
    ],
    isGuestFavorite: true,
    category: "Casablanca Getaways",
  },
  {
    id: "39",
    title: "Sidi Belyout Historic Home",
    location: "Sidi Belyout, Casablanca",
    price: 73,
    rating: 4.61,
    nights: 1,
    image: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Casablanca Getaways",
  },
  {
    id: "40",
    title: "Twin Center Corporate Flat",
    location: "Twin Center, Casablanca",
    price: 124,
    rating: 4.78,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Casablanca Getaways",
  },

  // Kigali Modern Retreats
  {
    id: "41",
    title: "Kigali City Center Apartment",
    location: "City Center, Kigali",
    price: 78,
    rating: 4.69,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Kigali Modern Retreats",
  },
  {
    id: "42",
    title: "Kimihurura Hills House",
    location: "Kimihurura, Kigali",
    price: 102,
    rating: 4.83,
    nights: 3,
    image: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1000&q=80"
    ],
    isGuestFavorite: true,
    category: "Kigali Modern Retreats",
  },
  {
    id: "43",
    title: "Nyarutarama Garden Villa",
    location: "Nyarutarama, Kigali",
    price: 145,
    rating: 4.88,
    nights: 4,
    image: [
      "https://images.unsplash.com/photo-1600566752229-450ddaa50aab?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Kigali Modern Retreats",
  },
  {
    id: "44",
    title: "Kacyiru Business Quarter",
    location: "Kacyiru, Kigali",
    price: 89,
    rating: 4.75,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Kigali Modern Retreats",
  },
  {
    id: "45",
    title: "Remera Contemporary Home",
    location: "Remera, Kigali",
    price: 96,
    rating: 4.71,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1560448204-444092daa87f?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Kigali Modern Retreats",
  },
  {
    id: "46",
    title: "Gisozi Valley View",
    location: "Gisozi, Kigali",
    price: 67,
    rating: 4.64,
    nights: 1,
    image: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Kigali Modern Retreats",
  },
  {
    id: "47",
    title: "Kibagabaga Family House",
    location: "Kibagabaga, Kigali",
    price: 118,
    rating: 4.79,
    nights: 3,
    image: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80"
    ],
    isGuestFavorite: true,
    category: "Kigali Modern Retreats",
  },
  {
    id: "48",
    title: "Kanombe Airport Lodge",
    location: "Kanombe, Kigali",
    price: 84,
    rating: 4.66,
    nights: 1,
    image: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Kigali Modern Retreats",
  },

  // Dar es Salaam Coastal Stays
  {
    id: "49",
    title: "Masaki Peninsula Villa",
    location: "Masaki, Dar es Salaam",
    price: 134,
    rating: 4.86,
    nights: 3,
    image: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
    ],
    isGuestFavorite: true,
    category: "Dar es Salaam Coastal Stays",
  },
  {
    id: "50",
    title: "Oyster Bay Beachfront",
    location: "Oyster Bay, Dar es Salaam",
    price: 156,
    rating: 4.91,
    nights: 4,
    image: [
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Dar es Salaam Coastal Stays",
  },
  {
    id: "51",
    title: "Kinondoni Local Experience",
    location: "Kinondoni, Dar es Salaam",
    price: 58,
    rating: 4.57,
    nights: 1,
    image: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Dar es Salaam Coastal Stays",
  },
  {
    id: "52",
    title: "Upanga City Apartment",
    location: "Upanga, Dar es Salaam",
    price: 76,
    rating: 4.68,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Dar es Salaam Coastal Stays",
  },
  {
    id: "53",
    title: "Mikocheni Executive Suite",
    location: "Mikocheni, Dar es Salaam",
    price: 112,
    rating: 4.77,
    nights: 2,
    image: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Dar es Salaam Coastal Stays",
  },
  {
    id: "54",
    title: "Msasani Bay Resort",
    location: "Msasani, Dar es Salaam",
    price: 189,
    rating: 4.94,
    nights: 5,
    image: [
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1000&q=80"
    ],
    isGuestFavorite: true,
    category: "Dar es Salaam Coastal Stays",
  },
  {
    id: "55",
    title: "Ilala Historic District",
    location: "Ilala, Dar es Salaam",
    price: 67,
    rating: 4.62,
    nights: 1,
    image: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Dar es Salaam Coastal Stays",
  },
  {
    id: "56",
    title: "Kawe Beach House",
    location: "Kawe, Dar es Salaam",
    price: 145,
    rating: 4.82,
    nights: 3,
    image:[
      "https://images.unsplash.com/photo-1600566752229-450ddaa50aab?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Dar es Salaam Coastal Stays",
  },
];
