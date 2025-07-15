# Experience Management API Documentation

This document describes the REST API endpoints for managing experiences in the Stazy application.

## Base URL

```
http://10.30.22.153:8080/api/experiences
```

## Authentication

All endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Data Models

### Experience Model

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
  "hostName": "String",
  "hostEmail": "String",
  "category": "ENUM (adventure, cultural, food_drink, nature, sports, wellness, entertainment, art, history)",
  "experienceType": "ENUM (group, private_experience, online)",
  "difficulty": "ENUM (easy, moderate, challenging)",
  "ageRestriction": {
    "minimum": "Integer",
    "maximum": "Integer (optional)"
  },
  "maxParticipants": "Integer",
  "included": ["String"],
  "toBring": ["String"],
  "meetingPoint": "String",
  "languages": ["String"],
  "availability": {
    "days": ["String"],
    "timeSlots": ["String"]
  },
  "isGuestFavorite": "Boolean",
  "isAvailable": "Boolean",
  "createdAt": "LocalDateTime",
  "updatedAt": "LocalDateTime"
}
```

### CreateExperienceRequest

```json
{
  "experienceType": "ENUM (group, private_experience, online) - REQUIRED",
  "title": "String - OPTIONAL",
  "description": "String - OPTIONAL",
  "location": "String - OPTIONAL",
  "price": "Double - OPTIONAL",
  "duration": "Integer - OPTIONAL",
  "images": ["String"] - OPTIONAL,
  "category": "ENUM - OPTIONAL",
  "difficulty": "ENUM - OPTIONAL",
  "minimumAge": "Integer - OPTIONAL",
  "maximumAge": "Integer - OPTIONAL",
  "maxParticipants": "Integer - OPTIONAL",
  "included": ["String"] - OPTIONAL,
  "toBring": ["String"] - OPTIONAL,
  "meetingPoint": "String - OPTIONAL",
  "languages": ["String"] - OPTIONAL,
  "availabilityDays": ["String"] - OPTIONAL,
  "availabilityTimeSlots": ["String"] - OPTIONAL,
  "isGuestFavorite": "Boolean - OPTIONAL",
  "isAvailable": "Boolean - OPTIONAL"
}
```

### UpdateExperienceRequest

```json
{
  "title": "String - OPTIONAL",
  "description": "String - OPTIONAL",
  "location": "String - OPTIONAL",
  "price": "Double - OPTIONAL",
  "duration": "Integer - OPTIONAL",
  "images": ["String"] - OPTIONAL,
  "category": "ENUM - OPTIONAL",
  "experienceType": "ENUM - OPTIONAL",
  "difficulty": "ENUM - OPTIONAL",
  "minimumAge": "Integer - OPTIONAL",
  "maximumAge": "Integer - OPTIONAL",
  "maxParticipants": "Integer - OPTIONAL",
  "included": ["String"] - OPTIONAL,
  "toBring": ["String"] - OPTIONAL,
  "meetingPoint": "String - OPTIONAL",
  "languages": ["String"] - OPTIONAL,
  "availabilityDays": ["String"] - OPTIONAL,
  "availabilityTimeSlots": ["String"] - OPTIONAL,
  "isGuestFavorite": "Boolean - OPTIONAL",
  "isAvailable": "Boolean - OPTIONAL"
}
```

## Endpoints

### 1. Create Experience

**POST** `/api/experiences`

Creates a new experience for the authenticated user. Only the experience type is required initially; other details can be added later using the update endpoint.

**Request Body:**

```json
{
  "experienceType": "group",
  "title": "Mountain Hiking Adventure",
  "description": "Experience the thrill of mountain hiking with experienced guides",
  "location": "Rocky Mountains, CO",
  "price": 150.0,
  "duration": 6,
  "category": "adventure",
  "difficulty": "moderate",
  "minimumAge": 12,
  "maximumAge": 65,
  "maxParticipants": 8,
  "included": [
    "Professional guide",
    "Safety equipment",
    "Snacks and water",
    "First aid kit"
  ],
  "toBring": [
    "Comfortable hiking shoes",
    "Weather-appropriate clothing",
    "Sunscreen",
    "Camera"
  ],
  "meetingPoint": "Trailhead parking lot",
  "languages": ["English", "Spanish"],
  "availabilityDays": ["Monday", "Wednesday", "Friday", "Saturday"],
  "availabilityTimeSlots": ["08:00-14:00", "09:00-15:00"]
}
```

**Response (201 Created):**

```json
{
  "experienceId": 1,
  "message": "Experience created successfully"
}
```

**Error Response (400 Bad Request):**

```json
{
  "success": false,
  "message": "Experience type is required"
}
```

### 2. Update Experience

**PUT** `/api/experiences/{experienceId}`

Updates an existing experience. Only the experience host can update their own experiences.

**Request Body:**

```json
{
  "title": "Updated Mountain Hiking Adventure",
  "price": 175.0,
  "duration": 7,
  "difficulty": "challenging"
}
```

**Response (200 OK):**

```json
{
  "id": 1,
  "title": "Updated Mountain Hiking Adventure",
  "description": "Experience the thrill of mountain hiking with experienced guides",
  "location": "Rocky Mountains, CO",
  "price": 175.0,
  "duration": 7,
  "rating": 0.0,
  "images": [],
  "hostName": "John Doe",
  "hostEmail": "john@example.com",
  "category": "adventure",
  "experienceType": "group",
  "difficulty": "challenging",
  "minimumAge": 12,
  "maximumAge": 65,
  "maxParticipants": 8,
  "included": [
    "Professional guide",
    "Safety equipment",
    "Snacks and water",
    "First aid kit"
  ],
  "toBring": [
    "Comfortable hiking shoes",
    "Weather-appropriate clothing",
    "Sunscreen",
    "Camera"
  ],
  "meetingPoint": "Trailhead parking lot",
  "languages": ["English", "Spanish"],
  "availabilityDays": ["Monday", "Wednesday", "Friday", "Saturday"],
  "availabilityTimeSlots": ["08:00-14:00", "09:00-15:00"],
  "isGuestFavorite": false,
  "isAvailable": true,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T11:45:00"
}
```

### 3. Get Experience by ID

**GET** `/api/experiences/{experienceId}`

Retrieves a specific experience by its ID.

**Response (200 OK):**

```json
{
  "id": 1,
  "title": "Mountain Hiking Adventure",
  "description": "Experience the thrill of mountain hiking with experienced guides",
  "location": "Rocky Mountains, CO",
  "price": 150.0,
  "duration": 6,
  "rating": 4.8,
  "images": ["https://example.com/hiking1.jpg"],
  "hostName": "John Doe",
  "hostEmail": "john@example.com",
  "category": "adventure",
  "experienceType": "group",
  "difficulty": "moderate",
  "minimumAge": 12,
  "maximumAge": 65,
  "maxParticipants": 8,
  "included": [
    "Professional guide",
    "Safety equipment",
    "Snacks and water",
    "First aid kit"
  ],
  "toBring": [
    "Comfortable hiking shoes",
    "Weather-appropriate clothing",
    "Sunscreen",
    "Camera"
  ],
  "meetingPoint": "Trailhead parking lot",
  "languages": ["English", "Spanish"],
  "availabilityDays": ["Monday", "Wednesday", "Friday", "Saturday"],
  "availabilityTimeSlots": ["08:00-14:00", "09:00-15:00"],
  "isGuestFavorite": true,
  "isAvailable": true,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

### 4. Get All Experiences

**GET** `/api/experiences`

Retrieves all available experiences excluding those created by the authenticated user.

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Mountain Hiking Adventure",
    "description": "Experience the thrill of mountain hiking",
    "location": "Rocky Mountains, CO",
    "price": 150.0,
    "duration": 6,
    "category": "adventure",
    "experienceType": "group",
    "difficulty": "moderate",
    "isAvailable": true
  },
  {
    "id": 2,
    "title": "Cooking Class with Local Chef",
    "description": "Learn to cook authentic local cuisine",
    "location": "New York, NY",
    "price": 120.0,
    "duration": 3,
    "category": "food_drink",
    "experienceType": "private_experience",
    "difficulty": "easy",
    "isAvailable": true
  }
]
```

### 5. Get My Experiences

**GET** `/api/experiences/my-experiences`

Retrieves all experiences created by the authenticated user.

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Mountain Hiking Adventure",
    "description": "Experience the thrill of mountain hiking",
    "location": "Rocky Mountains, CO",
    "price": 150.0,
    "duration": 6,
    "category": "adventure",
    "experienceType": "group",
    "difficulty": "moderate",
    "isAvailable": true
  }
]
```

### 6. Get Experiences by Category

**GET** `/api/experiences/category/{category}`

Retrieves all experiences in a specific category.

**Parameters:**

- `category`: One of: adventure, cultural, food_drink, nature, sports, wellness, entertainment, art, history

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Mountain Hiking Adventure",
    "description": "Experience the thrill of mountain hiking",
    "location": "Rocky Mountains, CO",
    "price": 150.0,
    "duration": 6,
    "category": "adventure",
    "experienceType": "group",
    "difficulty": "moderate",
    "isAvailable": true
  }
]
```

### 7. Get Experiences by Type

**GET** `/api/experiences/type/{experienceType}`

Retrieves all experiences of a specific type.

**Parameters:**

- `experienceType`: One of: group, private_experience, online

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Mountain Hiking Adventure",
    "description": "Experience the thrill of mountain hiking",
    "location": "Rocky Mountains, CO",
    "price": 150.0,
    "duration": 6,
    "category": "adventure",
    "experienceType": "group",
    "difficulty": "moderate",
    "isAvailable": true
  }
]
```

### 8. Search Experiences by Price Range

**GET** `/api/experiences/search/price?minPrice={minPrice}&maxPrice={maxPrice}`

Retrieves experiences within a specific price range.

**Parameters:**

- `minPrice`: Minimum price (Double)
- `maxPrice`: Maximum price (Double)

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Mountain Hiking Adventure",
    "description": "Experience the thrill of mountain hiking",
    "location": "Rocky Mountains, CO",
    "price": 150.0,
    "duration": 6,
    "category": "adventure",
    "experienceType": "group",
    "difficulty": "moderate",
    "isAvailable": true
  }
]
```

### 9. Search Experiences by Location

**GET** `/api/experiences/search/location?location={location}`

Retrieves experiences in a specific location.

**Parameters:**

- `location`: Location string to search for

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Mountain Hiking Adventure",
    "description": "Experience the thrill of mountain hiking",
    "location": "Rocky Mountains, CO",
    "price": 150.0,
    "duration": 6,
    "category": "adventure",
    "experienceType": "group",
    "difficulty": "moderate",
    "isAvailable": true
  }
]
```

### 10. Search Experiences by Difficulty

**GET** `/api/experiences/search/difficulty/{difficulty}`

Retrieves experiences of a specific difficulty level.

**Parameters:**

- `difficulty`: One of: easy, moderate, challenging

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Mountain Hiking Adventure",
    "description": "Experience the thrill of mountain hiking",
    "location": "Rocky Mountains, CO",
    "price": 150.0,
    "duration": 6,
    "category": "adventure",
    "experienceType": "group",
    "difficulty": "moderate",
    "isAvailable": true
  }
]
```

### 11. Search Experiences by Duration Range

**GET** `/api/experiences/search/duration?minDuration={minDuration}&maxDuration={maxDuration}`

Retrieves experiences within a specific duration range.

**Parameters:**

- `minDuration`: Minimum duration in hours (Integer)
- `maxDuration`: Maximum duration in hours (Integer)

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Mountain Hiking Adventure",
    "description": "Experience the thrill of mountain hiking",
    "location": "Rocky Mountains, CO",
    "price": 150.0,
    "duration": 6,
    "category": "adventure",
    "experienceType": "group",
    "difficulty": "moderate",
    "isAvailable": true
  }
]
```

### 12. Delete Experience

**DELETE** `/api/experiences/{experienceId}`

Deletes an experience. Only the experience host can delete their own experiences.

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Experience deleted successfully"
}
```

**Error Response (400 Bad Request):**

```json
{
  "success": false,
  "message": "Experience not found or you don't have permission to delete it"
}
```

### 13. Toggle Experience Availability

**PATCH** `/api/experiences/{experienceId}/toggle-availability`

Toggles the availability status of an experience. Only the experience host can toggle availability.

**Response (200 OK):**

```json
{
  "id": 1,
  "title": "Mountain Hiking Adventure",
  "description": "Experience the thrill of mountain hiking",
  "location": "Rocky Mountains, CO",
  "price": 150.0,
  "duration": 6,
  "rating": 4.8,
  "images": ["https://example.com/hiking1.jpg"],
  "hostName": "John Doe",
  "hostEmail": "john@example.com",
  "category": "adventure",
  "experienceType": "group",
  "difficulty": "moderate",
  "minimumAge": 12,
  "maximumAge": 65,
  "maxParticipants": 8,
  "included": [
    "Professional guide",
    "Safety equipment",
    "Snacks and water",
    "First aid kit"
  ],
  "toBring": [
    "Comfortable hiking shoes",
    "Weather-appropriate clothing",
    "Sunscreen",
    "Camera"
  ],
  "meetingPoint": "Trailhead parking lot",
  "languages": ["English", "Spanish"],
  "availabilityDays": ["Monday", "Wednesday", "Friday", "Saturday"],
  "availabilityTimeSlots": ["08:00-14:00", "09:00-15:00"],
  "isGuestFavorite": true,
  "isAvailable": false,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T12:00:00"
}
```

## Error Responses

All endpoints may return the following error responses:

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
  "message": "Experience not found"
}
```

## Notes

1. All timestamps are in ISO 8601 format (YYYY-MM-DDTHH:mm:ss)
2. Duration is always specified in hours
3. Price is specified in the application's base currency
4. Age restrictions are optional - if maximum age is not specified, there is no upper limit
5. Availability days and time slots are arrays of strings that can be customized by the host
6. Languages array contains the languages in which the experience is offered
7. The `included` array lists what's provided as part of the experience
8. The `toBring` array lists what participants should bring themselves
