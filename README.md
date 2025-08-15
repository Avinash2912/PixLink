## Example .env File

Create a `.env` file in your project root with the following content:
```
PORT=8000
DATABASE_URL=< your postgres database url >
JWT_SECRET
```


# How to Run PixLink

1. Open a terminal in the project folder.
2. Start PostgreSQL with Docker Compose:
   ```sh
   docker-compose up -d
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Push database schema changes:
   ```sh
   npm run db:push
   ```
   Use this if you change your models/schema.
5 Open database studio:
   ```sh
   npm run db:studio
   ```
   Use this to visually inspect/manage your database.
6. Start the server:
   ```sh
   npm start
   ```
7. The server will run at http://localhost:3000

## Signup API Example
POST http://localhost:3000/user/signup
Body (JSON):
```
{
  "firstname": "Avinash",
  "lastname": "Jha",
  "email": "your@email.com",
  "password": "yourpassword"
}
```

---
You can always check this file for a quick reminder!

# PixLink

PixLink is a URL shortener and management application built with Node.js, Express, and PostgreSQL (via Drizzle ORM). It allows users to sign up, log in, shorten URLs, view their URLs, and delete them securely.

## Features
- User authentication (signup & login)
- Shorten long URLs with custom codes
- Retrieve all URLs for a user
- Delete URLs
- Secure endpoints with JWT authentication
- Input validation using Zod

## How to Use
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

## Dependencies
- express
- drizzle-orm
- nanoid
- zod
- dotenv
- pg (PostgreSQL client)

## API Endpoints

### User Authentication
- `POST /user/signup` — Register a new user
- `POST /user/login` — Log in and receive a JWT token

### URL Management
- `POST /shortenURL` — Shorten a URL (requires authentication)
- `GET /user/urls` — Get all URLs for the authenticated user
- `DELETE /user/urls/:id` — Delete a URL by ID (requires authentication)
- `GET /:shortCode` — Redirect to the original URL

## Example Usage

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

## License
MIT




