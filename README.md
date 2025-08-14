## Example .env File

Create a `.env` file in your project root with the following content:
```
PORT=8000
DATABASE_URL=postgres://Avinash:Avinash123@localhost:5432/mydatabase
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
  "firstName": "Avinash",
  "lastName": "Jha",
  "email": "your@email.com",
  "password": "yourpassword"
}
```

---
You can always check this file for a quick reminder!
# PixLink

PixLink is a Node.js Express application with PostgreSQL integration using Drizzle ORM. It provides user authentication and signup functionality.

## Features
- User signup with hashed password and salt
- PostgreSQL database integration via Docker
- Input validation using Zod

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
   ```
5. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### POST /user/signup
Creates a new user.
- Request body (JSON):
  ```json
  {
    "firstname": "Avinash",
    "lastname": "Jha",
    "email": "avinashjha6@gmail.com",
    "password": "yourpassword"
  }
  ```
- Response:
  ```json
  {
    "data": { "id": "<uuid>" },
    "message": "User created successfully"
  }
  ```

## License
MIT




