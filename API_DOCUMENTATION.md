# PixLink API Documentation

PixLink is a URL shortener and management service built with Node.js, Express, and PostgreSQL (Drizzle ORM). It provides secure user authentication and allows users to create, retrieve, and delete shortened URLs.

---

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Dependencies](#dependencies)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [URL Management](#url-management)
- [Example Requests](#example-requests)
- [License](#license)

---

## Overview
PixLink lets users:
- Register and log in securely
- Shorten URLs with custom codes
- View all their shortened URLs
- Delete their URLs
- Redirect short codes to original URLs

---

## Getting Started

### Prerequisites
- Node.js
- Docker & Docker Compose

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd PixLink
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start PostgreSQL with Docker Compose:
   ```sh
   docker-compose up -d
   ```
4. Configure environment variables in `.env`:
   ```env
   PORT=8000
   DATABASE_URL=postgres://Avinash:Avinash123@localhost:5432/mydatabase
   JWT_SECRET=<your-secret>
   ```
5. Push database schema changes:
   ```sh
   npm run db:push
   ```
6. Start the server:
   ```sh
   npm start
   ```
7. The server will run at http://localhost:3000

---

## Dependencies
- express
- drizzle-orm
- nanoid
- zod
- dotenv
- pg

---

## Environment Variables
- `PORT`: Server port (default: 3000)
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret for JWT authentication

---

## API Endpoints

### Authentication

#### Register User
- **POST** `/user/signup`
- **Body:**
  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  ```json
  {
    "data": { "userId": "string" },
    "message": "User created successfully"
  }
  ```

#### Login
- **POST** `/user/login`
- **Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  ```json
  {
    "data": { "token": "string" },
    "message": "Login successful"
  }
  ```

---

### URL Management

#### Shorten URL
- **POST** `/shortenURL`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "url": "https://www.whatsapp.com/",
    "code": "wapp"
  }
  ```
- **Response:**
  ```json
  {
    "id": "string",
    "targeturl": "string",
    "shortenUrl": "string"
  }
  ```

#### Get User URLs
- **GET** `/user/urls`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "urls": [ /* Array of URL objects */ ]
  }
  ```

#### Delete URL
- **DELETE** `/user/urls/:id`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "message": "URL deleted successfully"
  }
  ```

#### Redirect to Original URL
- **GET** `/:shortCode`
- **Response:**
  - Redirects to the original URL
  - `404 Not Found` if short code is invalid

---

## Example Requests

### Signup
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

### Login
```http
POST http://localhost:3000/user/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Shorten URL
```http
POST http://localhost:3000/shortenURL
Content-Type: application/json
Authorization: Bearer <your_token>

{
  "url": "https://www.whatsapp.com/",
  "code": "wapp"
}
```

### Get User URLs
```http
GET http://localhost:3000/user/urls
Authorization: Bearer <your_token>
```

### Delete URL
```http
DELETE http://localhost:3000/user/urls/<id>
Authorization: Bearer <your_token>
```

### Redirect
```http
GET http://localhost:3000/wapp
```

---

## License
MIT
