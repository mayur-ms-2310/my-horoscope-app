# My Horoscope App 🔮

A Node.js , Express.js backend application that provides daily horoscope services for users based on their zodiac signs. Users can sign up with their name, email and birthdate, get JWT authentication, and access their daily horoscope with APIs.

## Features

- 🔐 **User Authentication**: JWT-based authentication system
- 🌟 **Zodiac Sign Detection**: Automatic zodiac sign calculation from birthdate
- 📅 **Daily Horoscope**: Get today's personalized horoscope
- 📊 **Horoscope History**: View last 7 days of horoscope readings
- 🛡️ **Rate Limiting**: 5 requests per minute for horoscope endpoints
- 📝 **API Documentation**: Swagger/OpenAPI documentation
- 🐳 **Docker Support**: Full containerization with Docker Compose
- 🗄️ **Database**: PostgreSQL with Sequelize ORM
- ✅ **Input Validation**: Joi-based request validation

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Joi
- **Rate Limiting**: express-rate-limit
- **Documentation**: Swagger UI
- **Containerization**: Docker & Docker Compose

## Project Structure

```
├── config/                 # Database configuration
├── controllers/            # Route controllers
├── middlewares/           # Express middlewares (auth, validation, rate limiting)
├── migrations/            # Database migrations
├── models/               # Sequelize models
├── routes/               # Express routes
├── utils/                # Utility functions (zodiac calculation, validation)
├── mock/                 # Mock data for horoscopes
├── docker-compose.yml    # Docker services configuration
├── Dockerfile           # Docker image configuration
└── index.ts            # Application entry point
```

## Prerequisites

- Node.js (v20 or higher)
- npm
- PostgreSQL (if running locally)
- Docker & Docker Compose (for containerized setup)

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost          # Use 'db' for Docker setup
DB_PORT=5432
DB_USER=postgres
DB_PASS=password
DB_NAME=horoscope

# Application
PORT=8080
NODE_ENV=development
```

## Installation & Setup

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd my-backend-app
   ```

2. **Start with Docker Compose**

   ```bash
   docker-compose up --build
   ```

   This will:

   - Start PostgreSQL database on port 5432
   - Build and start the application on port 8080
   - Run database migrations automatically
   - Set up all required dependencies

3. **Verify the setup**
   ```bash
   curl http://localhost:8080/api-docs
   ```

### Option 2: Local Development Setup

1. **Clone and install dependencies**

   ```bash
   git clone <repository-url>
   cd my-backend-app
   npm install
   ```

2. **Setup PostgreSQL database**

   - Install PostgreSQL locally
   - Create a database named `horoscope`
   - Update `.env` file with your database credentials

3. **Run database migrations**

   ```bash
   npm run migration
   ```

4. **Build and start the application**

   ```bash
   npm run build
   npm start
   ```

   For development with auto-reload:

   ```bash
   npm run dev
   ```

## API Endpoints

### Base URL

- **Local**: `http://localhost:8080`
- **Swagger Documentation**: `http://localhost:8080/api-docs`

### Authentication Endpoints

#### 1. User Signup

```http
POST /user/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "birthdate": "15/03/1990"
}
```

**Response:**

```json
{
  "message": "user signed up successfully : John Doe with zodiac Pisces"
}
```

#### 2. User Login

```http
POST /user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "user logged In successfuly with token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Horoscope Endpoints (Requires Authentication)

> **Note**: All horoscope endpoints require a valid JWT token in the Authorization header:
>
> ```
> Authorization: Bearer <your-jwt-token>
> ```

#### 3. Get Today's Horoscope

```http
GET /horoscope/today
Authorization: Bearer <your-jwt-token>
```

**Response:**

```json
{
  "date": "2025-08-03",
  "zodiac": "Pisces",
  "horoscope": "Let your intuition guide you."
}
```

#### 4. Get Horoscope History (Last 7 days)

```http
GET /horoscope/history
Authorization: Bearer <your-jwt-token>
```

**Response:**

```json
{
  "zodiac": "Pisces",
  "history": [
    {
      "date": "2025-08-03",
      "horoscope": "A peaceful moment awaits."
    },
    {
      "date": "2025-08-02",
      "horoscope": "Compassion brings healing."
    }
    // ... more entries
  ]
}
```

## How to Test the API

### Using Swagger UI

1. Navigate to `http://localhost:8080/api-docs`
2. Use the interactive interface to test all endpoints
3. For authenticated endpoints, click "Authorize" and enter your JWT token

### Using Postman

1. Import the API endpoints or use the Swagger documentation
2. Set up environment variables for base URL and JWT token
3. Test the authentication flow and horoscope endpoints

## Rate Limiting

The horoscope endpoints are rate-limited to **5 requests per minute** per IP address. If you exceed this limit, you'll receive:

```json
{
  "message": "Request Limit Reached try again after sometime"
}
```

## Data Validation

### User Signup Validation

- **Name**: 2-50 characters, required
- **Email**: Must contain "@" symbol, required
- **Password**: Minimum 6 characters, required
- **Birthdate**: DD/MM/YYYY format, required

### Authentication

- Passwords are hashed using PBKDF2 with salt
- JWT tokens expire after 1 hour
- Invalid tokens return 401 Unauthorized

## Development Commands

```bash
# Install dependencies
npm install

# Development mode with auto-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Run database migrations
npm run migration

# Docker commands
docker-compose up --build     # Build and start all services
docker-compose down           # Stop all services
docker-compose logs app       # View application logs
```

## Database Schema

### Users Table

- `id` (Primary Key)
- `name` (String)
- `email` (String, Unique)
- `password` (Hashed String)
- `birth_date` (String, DD/MM/YYYY format)
- `zodiac_sign` (String)

### User History Table

- `id` (Primary Key)
- `user_id` (Foreign Key)
- `zodiac` (String)
- `date` (String, YYYY-MM-DD format)
- `horoscope` (Text)
- Unique constraint on (`user_id`, `date`)

## Zodiac Sign Calculation

The application automatically calculates zodiac signs based on birthdates:

- **Aquarius**: Jan 20 - Feb 18
- **Pisces**: Feb 19 - Mar 20
- **Aries**: Mar 21 - Apr 19
- **Taurus**: Apr 20 - May 20
- **Gemini**: May 21 - Jun 20
- **Cancer**: Jun 21 - Jul 22
- **Leo**: Jul 23 - Aug 22
- **Virgo**: Aug 23 - Sep 22
- **Libra**: Sep 23 - Oct 22
- **Scorpio**: Oct 23 - Nov 21
- **Sagittarius**: Nov 22 - Dec 21
- **Capricorn**: Dec 22 - Jan 19

## Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Ensure PostgreSQL is running
   - Check database credentials in `.env`
   - For Docker: ensure `db` service is healthy

2. **Migration Errors**

   - Run `npm run migration` to apply pending migrations
   - Check database permissions

3. **JWT Token Issues**

   - Ensure token is included in Authorization header
   - Check token format: `Bearer <token>`
   - Tokens expire after 1 hour

4. **Rate Limiting**
   - Wait 1 minute between requests if rate limited
   - Consider implementing user-based rate limiting for production

### Logs and Debugging

```bash
# View application logs (Docker)
docker-compose logs -f app

# View database logs (Docker)
docker-compose logs -f db

# Check container status
docker-compose ps
```

## Design Decisions

### Architecture Choices

- **MVC Architecture**: Implemented Model-View-Controller pattern for clean code organization
  - **Models**: Sequelize models (`user.model.ts`, `userHistory.ts`) handle data structure and database operations
  - **Controllers**: Business logic separated into controllers (`user.controller.ts`, `horoscope.controller.ts`)
  - **Routes**: Express routes act as the interface layer, connecting HTTP requests to controllers
- **Middleware Pattern**: Used for authentication, validation, and rate limiting
- **Controller-Route Separation**: Clean separation of concerns for maintainability
- **Password Hashing**: PBKDF2 for secure password storage
- **Rate Limiting**: Applied per IP to prevent API abuse
- **Swagger Documentation**: Interactive API documentation for better developer experience

## Improvements With More Time

- Add comprehensive unit and integration tests
- Implement proper logging with structured logs
- Implement caching (Redis) for frequently accessed horoscopes

## Scaling for Personalized Horoscopes

### Current vs Personalized System

- **Current**: 12 zodiac-based horoscopes per day, simple file storage
- **Personalized**: Unique horoscope per user per day, requires significant architecture changes

### Key Changes Needed

1. **New Database Table**: Create `personalized_horoscopes` table to store unique horoscope for each user per day

2. **Background Job System**: Use queue (Redis/RabbitMQ) to generate horoscopes overnight instead of real-time generation

3. **Caching Layer**: Add Redis to cache generated horoscopes and reduce database queries

4. **Horizontal Scaling**: Use load balancer with multiple app instances to handle increased user traffic

### Implementation Strategy

```javascript
async function generatePersonalizedHoroscope(userId, date) {
  // 1. Get user profile and preferences
  // 2. Call AI/ML service for content generation
  // 3. Cache and store result
  // 4. Return personalized content
}
```
