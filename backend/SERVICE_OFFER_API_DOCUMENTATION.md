# Service Offer API Documentation

This document describes the REST API endpoints for managing service offers in the Stazy application.

## Base URL

```
http://10.30.22.153:8080/api/service-offers
```

## Authentication

All endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Data Models

### ServiceOffer Model

```json
{
  "id": "Long",
  "title": "String",
  "description": "String",
  "location": "String",
  "price": "Double",
  "duration": "Integer (hours)",
  "rating": "Double",
  "images": ["String"],
  "category": "ENUM (cleaning, maintenance, photography, cooking, tour_guide, transportation, other)",
  "serviceType": "ENUM (one_time, recurring, on_demand)",
  "availabilityDays": ["String"],
  "availabilityTimeSlots": ["String"],
  "requirements": ["String"],
  "included": ["String"],
  "maxGuests": "Integer",
  "providerEmail": "String",
  "provider": "String",
  "isAvailable": "Boolean",
  "isGuestFavorite": "Boolean",
  "createdAt": "LocalDateTime",
  "updatedAt": "LocalDateTime"
}
```

### CreateServiceOfferRequest

```json
{
  "serviceType": "ENUM (one_time, recurring, on_demand) - REQUIRED",
  "title": "String - OPTIONAL",
  "description": "String - OPTIONAL",
  "location": "String - OPTIONAL",
  "price": "Double - OPTIONAL",
  "duration": "Integer - OPTIONAL",
  "images": ["String"] - OPTIONAL,
  "category": "ENUM - OPTIONAL",
  "isGuestFavorite": "Boolean - OPTIONAL",
  "availabilityDays": ["String"] - OPTIONAL,
  "availabilityTimeSlots": ["String"] - OPTIONAL,
  "requirements": ["String"] - OPTIONAL,
  "included": ["String"] - OPTIONAL,
  "maxGuests": "Integer - OPTIONAL",
  "provider": "String - OPTIONAL",
  "isAvailable": "Boolean - OPTIONAL"
}
```

### UpdateServiceOfferRequest

```json
{
  "title": "String - OPTIONAL",
  "description": "String - OPTIONAL",
  "location": "String - OPTIONAL",
  "price": "Double - OPTIONAL",
  "duration": "Integer - OPTIONAL",
  "images": ["String"] - OPTIONAL,
  "category": "ENUM - OPTIONAL",
  "serviceType": "ENUM - OPTIONAL",
  "isGuestFavorite": "Boolean - OPTIONAL",
  "availabilityDays": ["String"] - OPTIONAL,
  "availabilityTimeSlots": ["String"] - OPTIONAL,
  "requirements": ["String"] - OPTIONAL,
  "included": ["String"] - OPTIONAL,
  "maxGuests": "Integer - OPTIONAL",
  "provider": "String - OPTIONAL",
  "isAvailable": "Boolean - OPTIONAL"
}
```

## Endpoints

### 1. Create Service Offer

**POST** `/api/service-offers`

Creates a new service offer for the authenticated user.

**Request Body:**

```json
{
  "serviceType": "one_time",
  "title": "Professional House Cleaning",
  "description": "Complete house cleaning service including kitchen, bathrooms, and living areas",
  "location": "New York, NY",
  "price": 150.0,
  "duration": 4,
  "category": "cleaning",
  "availabilityDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  "availabilityTimeSlots": ["09:00-13:00", "14:00-18:00"],
  "requirements": ["Access to cleaning supplies", "Pets must be secured"],
  "included": [
    "All cleaning supplies",
    "Eco-friendly products",
    "Insurance coverage"
  ],
  "maxGuests": 1
}
```

**Response (201 Created):**

```json
{
  "serviceId": 1,
  "message": "Service offer created successfully"
}
```

**Error Response (400 Bad Request):**

```json
{
  "success": false,
  "message": "Service type is required"
}
```

### 2. Update Service Offer

**PUT** `/api/service-offers/{serviceId}`

Updates an existing service offer. Only the service provider can update their own service offers.

**Request Body:**

```json
{
  "title": "Updated Professional House Cleaning",
  "price": 175.0,
  "duration": 5
}
```

**Response (200 OK):**

```json
{
  "id": 1,
  "title": "Updated Professional House Cleaning",
  "description": "Complete house cleaning service including kitchen, bathrooms, and living areas",
  "location": "New York, NY",
  "price": 175.0,
  "duration": 5,
  "rating": 0.0,
  "images": [],
  "category": "cleaning",
  "serviceType": "one_time",
  "isGuestFavorite": false,
  "availabilityDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  "availabilityTimeSlots": ["09:00-13:00", "14:00-18:00"],
  "requirements": ["Access to cleaning supplies", "Pets must be secured"],
  "included": [
    "All cleaning supplies",
    "Eco-friendly products",
    "Insurance coverage"
  ],
  "maxGuests": 1,
  "providerEmail": "provider@example.com",
  "provider": "John Doe",
  "isAvailable": true,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T11:45:00"
}
```

### 3. Get Service Offer by ID

**GET** `/api/service-offers/{serviceId}`

Retrieves a specific service offer by its ID.

**Response (200 OK):**

```json
{
  "id": 1,
  "title": "Professional House Cleaning",
  "description": "Complete house cleaning service including kitchen, bathrooms, and living areas",
  "location": "New York, NY",
  "price": 150.0,
  "duration": 4,
  "rating": 4.5,
  "images": ["image1.jpg", "image2.jpg"],
  "category": "cleaning",
  "serviceType": "one_time",
  "isGuestFavorite": true,
  "availabilityDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  "availabilityTimeSlots": ["09:00-13:00", "14:00-18:00"],
  "requirements": ["Access to cleaning supplies", "Pets must be secured"],
  "included": [
    "All cleaning supplies",
    "Eco-friendly products",
    "Insurance coverage"
  ],
  "maxGuests": 1,
  "providerEmail": "provider@example.com",
  "provider": "John Doe",
  "isAvailable": true,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

### 4. Get All Service Offers

**GET** `/api/service-offers`

Retrieves all available service offers excluding those created by the authenticated user.

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Professional House Cleaning",
    "description": "Complete house cleaning service",
    "location": "New York, NY",
    "price": 150.0,
    "duration": 4,
    "rating": 4.5,
    "category": "cleaning",
    "serviceType": "one_time",
    "provider": "John Doe",
    "isAvailable": true
  },
  {
    "id": 2,
    "title": "Photography Session",
    "description": "Professional photography for events",
    "location": "Los Angeles, CA",
    "price": 300.0,
    "duration": 2,
    "rating": 4.8,
    "category": "photography",
    "serviceType": "one_time",
    "provider": "Jane Smith",
    "isAvailable": true
  }
]
```

### 5. Get My Service Offers

**GET** `/api/service-offers/my-services`

Retrieves all service offers created by the authenticated user.

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Professional House Cleaning",
    "description": "Complete house cleaning service",
    "location": "New York, NY",
    "price": 150.0,
    "duration": 4,
    "rating": 4.5,
    "category": "cleaning",
    "serviceType": "one_time",
    "provider": "John Doe",
    "isAvailable": true
  }
]
```

### 6. Get Service Offers by Category

**GET** `/api/service-offers/category/{category}`

Retrieves all service offers in a specific category.

**Parameters:**

- `category`: cleaning, maintenance, photography, cooking, tour_guide, transportation, other

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Professional House Cleaning",
    "category": "cleaning",
    "price": 150.0,
    "provider": "John Doe"
  }
]
```

### 7. Get Service Offers by Type

**GET** `/api/service-offers/type/{serviceType}`

Retrieves all service offers of a specific type.

**Parameters:**

- `serviceType`: one_time, recurring, on_demand

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Professional House Cleaning",
    "serviceType": "one_time",
    "price": 150.0,
    "provider": "John Doe"
  }
]
```

### 8. Search Service Offers by Price Range

**GET** `/api/service-offers/search/price?minPrice={minPrice}&maxPrice={maxPrice}`

Retrieves service offers within a specific price range.

**Parameters:**

- `minPrice`: Minimum price (Double)
- `maxPrice`: Maximum price (Double)

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Professional House Cleaning",
    "price": 150.0,
    "provider": "John Doe"
  }
]
```

### 9. Search Service Offers by Location

**GET** `/api/service-offers/search/location?location={location}`

Retrieves service offers in a specific location.

**Parameters:**

- `location`: Location string to search for

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Professional House Cleaning",
    "location": "New York, NY",
    "price": 150.0,
    "provider": "John Doe"
  }
]
```

### 10. Delete Service Offer

**DELETE** `/api/service-offers/{serviceId}`

Deletes a service offer. Only the service provider can delete their own service offers.

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Service offer deleted successfully"
}
```

### 11. Toggle Service Offer Availability

**PATCH** `/api/service-offers/{serviceId}/toggle-availability`

Toggles the availability status of a service offer. Only the service provider can toggle their own service offers.

**Response (200 OK):**

```json
{
  "id": 1,
  "title": "Professional House Cleaning",
  "isAvailable": false,
  "provider": "John Doe"
}
```

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "Error description"
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Invalid or missing authentication token"
}
```

### 403 Forbidden

```json
{
  "success": false,
  "message": "You don't have permission to perform this action"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Service offer not found"
}
```

## Service Categories

- `cleaning`: House cleaning services
- `maintenance`: Property maintenance services
- `photography`: Photography and videography services
- `cooking`: Cooking and catering services
- `tour_guide`: Tour guide services
- `transportation`: Transportation services
- `other`: Other miscellaneous services

## Service Types

- `one_time`: One-time service
- `recurring`: Recurring service (weekly, monthly, etc.)
- `on_demand`: On-demand service

## Notes

- All endpoints require valid JWT authentication
- Service providers can only modify their own service offers
- Service offers are automatically marked as available when created
- The rating field is initialized to 0.0 and should be updated by a separate rating system
- Images should be stored as URLs pointing to the actual image files
- Availability days and time slots are stored as arrays of strings for flexibility
