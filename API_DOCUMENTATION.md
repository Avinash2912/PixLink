# User Authentication Endpoints

## 1. Signup

**Endpoint:**  
`POST /user/signup`

**URL:**
`http://localhost:3000/user/signup`

**Example Request:**
```http
POST http://localhost:3000/user/signup
Content-Type: application/json

{
	"firstname": "John",
	"lastname": "Doe",
	"email": "john.doe@example.com",
	"password": "yourpassword"
}
```

**Description:**  
Creates a new user account.

**Request Body:**
```json
{
	"firstname": "string",   // User's first name (required)
	"lastname": "string",    // User's last name (required)
	"email": "string",       // User's email (required)
	"password": "string"     // User's password (required)
}
```

**Response:**
- `201 Created`
```json
{
	"data": { "userId": "string" },
	"message": "User created successfully"
}
```
- `400 Bad Request` (Validation error or user already exists)

---

## 2. Login

**Endpoint:**  
`POST /user/login`

**URL:**
`http://localhost:3000/user/login`

**Example Request:**
```http
POST http://localhost:3000/user/login
Content-Type: application/json

{
	"email": "john.doe@example.com",
	"password": "yourpassword"
}
```

**Description:**  
Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
	"email": "string",       // User's email (required)
	"password": "string"     // User's password (required)
}
```

**Response:**
- `200 OK`
```json
{
	"data": { "token": "string" },
	"message": "Login successful"
}
```
- `400 Bad Request` (Validation error)
- `404 Not Found` (User does not exist)
- `401 Unauthorized` (Invalid credentials)

---




## . Shorten URL

**Endpoint:**  
`POST /shortenURL`

**URL:**
`http://localhost:3000/shortenURL`

**Example Request:**
```http
POST http://localhost:3000/shortenURL
Content-Type: application/json
Authorization: Bearer <your_token>

{
	"url": "https://www.example.com",
	"code": "custom123"
}
```

**Description:**  
Creates a shortened URL for a given original URL. Requires authentication.

**Request Body:**
```json
{
	"url": "string",      // The original URL to shorten (required)
	"code": "string"      // Custom short code (optional)
}
```

**Response:**
- `201 Created`
```json
{
	"id": "string",
	"targeturl": "string",     // Original URL
	"shortenUrl": "string"     // Shortened code
}
```
- `400 Bad Request` (Validation error)
- `500 Internal Server Error` (On failure)

---

##  Get All URLs for User

**Endpoint:**  
`GET /user/urls`

**URL:**
`http://localhost:3000/user/urls`

**Example Request:**
```http
GET http://localhost:3000/user/urls
Authorization: Bearer <your_token>
```

**Description:**  
Returns all shortened URLs created by the authenticated user.

**Response:**
- `200 OK`
```json
{
	"urls": [ /* Array of URL objects */ ]
}
```
- `500 Internal Server Error` (On failure)

---

## 3. Redirect to Original URL

**Endpoint:**  
`GET /:shortCode`

**URL:**
`http://localhost:3000/<shortCode>`

**Example Request:**
```http
GET http://localhost:3000/custom123
```

**Description:**  
Redirects to the original URL corresponding to the given short code.

**Response:**
- Redirects to the original URL.
- `404 Not Found` (If short code is invalid)
- `500 Internal Server Error` (On failure)

---

**Authentication:**  
Endpoints `/shortenURL` and `/user/urls` require authentication via middleware.

---
