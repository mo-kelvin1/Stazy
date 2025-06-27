# Property Management API Documentation

This document describes the REST API endpoints for property management in the Stazy application.

## Base URL

```
http://localhost:8080/api/properties
```

## Authentication

All endpoints require a valid Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 1. Create Property

**POST** `/api/properties`

Creates a new property with minimal required information. The host email is automatically extracted from the JWT token. Only the property type is required initially; other details can be added later using the update endpoint.

**Request Body:**

```json
{
  "propertyType": "entire_place"
}
```

**Optional fields for initial creation:**

```json
{
  "propertyType": "entire_place",
  "title": "Beautiful Beach House",
  "description": "A stunning beachfront property with ocean views",
  "location": "Miami Beach, FL",
  "price": 250.0,
  "weekendPrice": 300.0,
  "nights": 2,
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "category": "house",
  "isGuestFavorite": true,
  "amenities": ["WiFi", "Pool", "Kitchen"],
  "highlights": ["Ocean View", "Beach Access"],
  "minGuests": 2,
  "maxGuests": 6,
  "bedrooms": 3,
  "beds": 4,
  "bathrooms": 2,
  "hostId": "user123",
  "isAvailable": true
}
```

**Response:**

```json
{
  "propertyId": 1,
  "message": "Property created successfully"
}
```

### 2. Update Property

**PUT** `/api/properties/{propertyId}`

Updates an existing property. Only the property owner can update their properties. Supports partial updates - only include the fields you want to change.

**Request Body:**

```json
{
  "title": "Updated Beach House",
  "price": 275.0,
  "isAvailable": false
}
```

**Response:**

```json
{
  "id": 1,
  "title": "Updated Beach House",
  "description": "A stunning beachfront property with ocean views",
  "location": "Miami Beach, FL",
  "price": 275.0,
  "weekendPrice": 300.0,
  "rating": 0.0,
  "nights": 2,
  "images": ["https://example.com/image1.jpg"],
  "category": "house",
  "propertyType": "entire_place",
  "isGuestFavorite": true,
  "amenities": ["WiFi", "Pool", "Kitchen"],
  "highlights": ["Ocean View", "Beach Access"],
  "minGuests": 2,
  "maxGuests": 6,
  "bedrooms": 3,
  "beds": 4,
  "bathrooms": 2,
  "hostId": "user123",
  "hostEmail": "host@example.com",
  "isAvailable": false,
  "createdAt": "2024-01-01T10:00:00",
  "updatedAt": "2024-01-01T11:00:00"
}
```

### 3. Get Property by ID

**GET** `/api/properties/{propertyId}`

Retrieves a specific property by its ID. Requires authentication.

**Response:**

```json
{
  "id": 1,
  "title": "Beautiful Beach House",
  "description": "A stunning beachfront property with ocean views",
  "location": "Miami Beach, FL",
  "price": 250.0,
  "weekendPrice": 300.0,
  "rating": 4.5,
  "nights": 2,
  "images": ["https://example.com/image1.jpg"],
  "category": "house",
  "propertyType": "entire_place",
  "isGuestFavorite": true,
  "amenities": ["WiFi", "Pool", "Kitchen"],
  "highlights": ["Ocean View", "Beach Access"],
  "minGuests": 2,
  "maxGuests": 6,
  "bedrooms": 3,
  "beds": 4,
  "bathrooms": 2,
  "hostId": "user123",
  "hostEmail": "host@example.com",
  "isAvailable": true,
  "createdAt": "2024-01-01T10:00:00",
  "updatedAt": "2024-01-01T10:00:00"
}
```

### 4. Get All Properties

**GET** `/api/properties`

Retrieves all available properties. Requires authentication.

**Response:**

```json
[
  {
    "id": 1,
    "title": "Beautiful Beach House",
    "description": "A stunning beachfront property",
    "location": "Miami Beach, FL",
    "price": 250.0,
    "category": "house",
    "propertyType": "entire_place",
    "isAvailable": true
  },
  {
    "id": 2,
    "title": "Cozy Downtown Apartment",
    "description": "Modern apartment in the heart of the city",
    "location": "New York, NY",
    "price": 150.0,
    "category": "flat",
    "propertyType": "room",
    "isAvailable": true
  }
]
```

### 5. Get My Properties

**GET** `/api/properties/my-properties`

Retrieves all properties owned by the authenticated user.

**Response:**

```json
[
  {
    "id": 1,
    "title": "My Beach House",
    "description": "My beautiful beach property",
    "location": "Miami Beach, FL",
    "price": 250.0,
    "category": "house",
    "propertyType": "entire_place",
    "isAvailable": true
  }
]
```

### 6. Get Properties by Category

**GET** `/api/properties/category/{category}`

Retrieves properties filtered by category.

**Available Categories:**

- house
- flat
- barn
- bed_breakfast
- boat
- cabin
- campervan
- casa_particular
- villa

**Example:**

```
GET /api/properties/category/house
```

### 7. Get Properties by Type

**GET** `/api/properties/type/{propertyType}`

Retrieves properties filtered by property type.

**Available Types:**

- entire_place
- room
- shared_room

**Example:**

```
GET /api/properties/type/entire_place
```

### 8. Search Properties by Price Range

**GET** `/api/properties/search/price?minPrice={minPrice}&maxPrice={maxPrice}`

Retrieves properties within a specific price range.

**Example:**

```
GET /api/properties/search/price?minPrice=100&maxPrice=300
```

### 9. Search Properties by Location

**GET** `/api/properties/search/location?location={location}`

Retrieves properties that match the location search term.

**Example:**

```
GET /api/properties/search/location?location=Miami
```

### 10. Delete Property

**DELETE** `/api/properties/{propertyId}`

Deletes a property. Only the property owner can delete their properties.

**Response:**

```json
{
  "success": true,
  "message": "Property deleted successfully"
}
```

### 11. Toggle Property Availability

**PATCH** `/api/properties/{propertyId}/toggle-availability`

Toggles the availability status of a property. Only the property owner can toggle availability.

**Response:**

```json
{
  "id": 1,
  "title": "Beautiful Beach House",
  "isAvailable": false,
  "updatedAt": "2024-01-01T12:00:00"
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

**Common Error Scenarios:**

- Invalid JWT token
- Property not found
- Unauthorized access (not the property owner)
- Invalid request data
- User not found
- Property type is required (for creation)

## Property Categories

- **house**: Traditional houses
- **flat**: Apartments and flats
- **barn**: Converted barns
- **bed_breakfast**: Bed and breakfast establishments
- **boat**: Houseboats and floating accommodations
- **cabin**: Wooden cabins and lodges
- **campervan**: Mobile homes and RVs
- **casa_particular**: Cuban-style guesthouses
- **villa**: Luxury villas and mansions

## Property Types

- **entire_place**: Complete property rental
- **room**: Private room in a shared property
- **shared_room**: Shared room accommodation

## Notes

1. All endpoints require a valid JWT token in the Authorization header
2. Property creation automatically associates the property with the authenticated user's email
3. Only property owners can update, delete, or toggle availability of their properties
4. All property retrieval endpoints return only available properties by default
5. The system automatically handles timestamps for creation and updates
6. Property creation requires only the property type initially; other details can be added via updates
7. Most property fields are nullable except for id, hostEmail, and propertyType
8. The update endpoint supports partial updates - only include fields you want to change
