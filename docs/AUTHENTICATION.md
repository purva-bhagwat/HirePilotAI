# Feature 1: Authentication & User Profile Documentation

HirePilot AI authentication provides secure, token-based authentication and user profile management for student and job-seeker accounts.

---

## 1. Authentication Architecture

- **Backend**: Node.js & Express.js (ES Modules)
- **Database**: PostgreSQL (Neon Serverless) with Prisma ORM
- **Password Security**: Passwords hashed using `bcrypt` (10 salt rounds), never stored or returned in plain text.
- **Token Mechanism**: JSON Web Tokens (`jsonwebtoken`) signed with a server secret (`JWT_SECRET`) and configured with a 7-day expiration. Minimal identity payload (`userId`, `role`).
- **Middleware**: Express middleware (`authenticateToken`) validates the Bearer token on protected endpoints and injects authenticated user information into `req.user`.
- **Frontend State**: React Context API (`AuthContext`) manages user authentication state (`user`, `token`, `isAuthenticated`, `loading`), with automatic session verification via `/api/auth/me`.
- **Route Protection**: `ProtectedRoute` guards authenticated routes (`/dashboard`, `/profile`), and `PublicRoute` redirects logged-in users away from guest pages (`/login`, `/register`).

---

## 2. Required Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
DATABASE_URL="your-postgresql-neon-database-url"
JWT_SECRET="your-strong-random-jwt-secret"
```

> **Note**: Never commit sensitive secrets to source control.

---

## 3. API Endpoints

### 1. Register User
- **Endpoint**: `POST /api/auth/register`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "name": "Alex Morgan",
    "email": "alex@example.com",
    "password": "SecurePassword123!"
  }
  ```
- **Responses**:
  - `201 Created`: User successfully registered.
    ```json
    {
      "success": true,
      "message": "Account created successfully.",
      "user": {
        "id": "cm...",
        "name": "Alex Morgan",
        "email": "alex@example.com",
        "role": "user",
        "createdAt": "2026-09-25T..."
      }
    }
    ```
  - `400 Bad Request`: Validation failure (missing name, invalid email, short password).
  - `409 Conflict`: Email already exists.

### 2. Login User
- **Endpoint**: `POST /api/auth/login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "alex@example.com",
    "password": "SecurePassword123!"
  }
  ```
- **Responses**:
  - `200 OK`: Successful authentication.
    ```json
    {
      "success": true,
      "message": "Login successful.",
      "token": "eyJhbGciOi...",
      "user": {
        "id": "cm...",
        "name": "Alex Morgan",
        "email": "alex@example.com",
        "role": "user",
        "createdAt": "2026-09-25T..."
      }
    }
    ```
  - `400 Bad Request`: Missing credentials.
  - `401 Unauthorized`: Invalid email or password (timing-safe generic error).

### 3. Get Current User Profile
- **Endpoint**: `GET /api/auth/me`
- **Access**: Protected (Requires `Authorization: Bearer <token>` header)
- **Responses**:
  - `200 OK`: Returns authenticated user details.
    ```json
    {
      "success": true,
      "user": {
        "id": "cm...",
        "name": "Alex Morgan",
        "email": "alex@example.com",
        "role": "user",
        "createdAt": "2026-09-25T...",
        "updatedAt": "2026-09-25T..."
      }
    }
    ```
  - `401 Unauthorized`: Missing, expired, or invalid token.

### 4. Update Profile
- **Endpoint**: `PUT /api/auth/profile`
- **Access**: Protected (Requires `Authorization: Bearer <token>` header)
- **Request Body**:
  ```json
  {
    "name": "Alex Morgan-Chase"
  }
  ```
- **Responses**:
  - `200 OK`: Returns updated user object.
  - `400 Bad Request`: Validation error (empty name or name < 2 chars).
  - `401 Unauthorized`: Missing or invalid token.

---

## 4. How Authentication Works

1. **Registration**:
   - The user inputs Name, Email, Password, and Confirm Password.
   - Frontend validates client-side requirements (minimum lengths, email format, password matching).
   - Backend validates the input with Zod, verifies email uniqueness, hashes the password via `bcrypt`, and persists the user to PostgreSQL.
   - On success, the user is redirected to `/login`.

2. **Login**:
   - The user supplies Email and Password.
   - Backend checks credentials using `bcrypt.compare`.
   - On match, a signed JWT containing `{ userId, role }` is generated and returned along with the sanitized user payload.
   - Frontend stores the token in `localStorage` and initializes the session in `AuthContext`.

3. **Session Verification & Interceptors**:
   - On application load, `AuthContext` calls `/api/auth/me` to hydrate the user state.
   - `axios` request interceptor automatically attaches the `Authorization: Bearer <token>` header to all requests.
   - If a `401 Unauthorized` is returned by any API call, the interceptor clears local session storage to avoid stale tokens.

4. **Route Protection**:
   - Any access to `/dashboard` or `/profile` without a valid token redirects to `/login` with return location preserved in state.
   - Visiting `/login` or `/register` while already authenticated immediately redirects to `/dashboard`.

5. **Logout**:
   - Clicking "Logout" clears the token and user record from `localStorage`, resets `AuthContext`, and redirects to `/login`.

---

## 5. How to Run Locally

### 1. Start the Backend Server
```bash
cd server
npm run dev
# Server starts on http://localhost:5000
```

### 2. Start the Frontend Application
```bash
cd client
npm run dev
# Frontend starts on http://localhost:5173
```
