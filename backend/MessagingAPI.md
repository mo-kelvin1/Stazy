# Messaging API Documentation

## Overview

The messaging backend supports one-on-one chat between users. It provides:

- **WebSocket (STOMP) endpoint** for real-time messaging.
- **REST endpoints** for retrieving chat threads and message history.

---

## 1. WebSocket API

### WebSocket Endpoint

- **URL:** `/ws/chat`
- **Protocol:** STOMP over WebSocket (SockJS supported)
- **Authentication:** (Recommended) Pass JWT as a query parameter or header during connection.

#### Connect Example

```js
const socket = new SockJS("http://<server-host>/ws/chat");
const stompClient = Stomp.over(socket);
// Optionally, pass JWT in headers
stompClient.connect(
  { Authorization: "Bearer <JWT_TOKEN>" },
  onConnect,
  onError
);
```

---

### Send Message

- **Destination:** `/app/chat.send`
- **Payload Example:**
  ```json
  {
    "senderEmail": "alice@example.com",
    "recipientEmail": "bob@example.com",
    "content": "Hello Bob!"
  }
  ```

---

### Receive Messages

- **Subscribe to:** `/topic/messages/{userEmail}`
- **Example:**

  ```js
  stompClient.subscribe("/topic/messages/alice@example.com", (message) => {
    const chatMessage = JSON.parse(message.body);
    // handle chatMessage
  });
  ```

- **Message Format:**
  ```json
  {
    "senderEmail": "alice@example.com",
    "recipientEmail": "bob@example.com",
    "content": "Hello Bob!"
  }
  ```

---

## 2. REST API

### Authentication

All REST endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

### Get All Chat Threads

- **Endpoint:** `GET /api/chats/threads`
- **Description:** Returns a list of user emails you have chatted with.
- **Response Example:**
  ```json
  ["bob@example.com", "charlie@example.com"]
  ```

---

### Get Chat History with a User

- **Endpoint:** `GET /api/chats/{otherEmail}`
- **Description:** Returns the full message history between the authenticated user and `otherEmail`.
- **Response Example:**
  ```json
  [
    {
      "id": 1,
      "senderEmail": "alice@example.com",
      "recipientEmail": "bob@example.com",
      "content": "Hello Bob!",
      "timestamp": "2024-06-01T12:00:00"
    },
    {
      "id": 2,
      "senderEmail": "bob@example.com",
      "recipientEmail": "alice@example.com",
      "content": "Hi Alice!",
      "timestamp": "2024-06-01T12:01:00"
    }
  ]
  ```

---

## 3. Error Handling

- **WebSocket:**  
  Errors may be sent to a dedicated topic (e.g., `/topic/errors`).  
  Example:

  ```json
  {
    "error": "Failed to send message"
  }
  ```

- **REST:**  
  Standard error responses with HTTP status codes and error messages.

---

## 4. Testing Scenarios

- **Send a message when both users are online:**  
  Both should receive the message in real time.
- **Send a message when only one user is online:**  
  The online user receives the message; the offline user can fetch it later via REST.
- **Retrieve chat history:**  
  Use the REST endpoint to fetch all messages between two users.

---

## 5. Example Test Flow

1. **User A and User B connect to `/ws/chat` and subscribe to their respective `/topic/messages/{email}`.**
2. **User A sends a message to User B via `/app/chat.send`.**
3. **Both users receive the message in real time.**
4. **User B disconnects. User A sends another message.**
5. **User B reconnects and fetches chat history via `GET /api/chats/{userAEmail}`.**

---

**Note:**

- For production, secure the WebSocket connection and validate JWT tokens.
- All timestamps are in ISO 8601 format.
