# Hobby Social Media App

A MERN stack learning project for building a hobby-focused social media app. The current milestone focuses on authentication, profile management, and a styled React client.

## Current Progress

### Backend

- Node.js and Express server setup
- MongoDB connection using Mongoose
- Environment variable support with `dotenv`
- User model with schema validations and timestamps
- Signup API with request validation and bcrypt password hashing
- Login API with password comparison
- JWT generation using a User model method
- JWT stored in an HTTP-only cookie
- Cookie-based protected routes using `userAuth` middleware
- Logout API that clears the auth cookie
- Profile API for fetching the logged-in user
- Profile edit API with allowed-field validation
- Change password API with old-password verification
- CORS configured for the Vite client

### Frontend

- Vite React client setup
- React Router routes for auth and profile pages
- Axios instance configured with backend base URL and cookies
- Login page connected to backend auth
- Signup page connected to backend signup
- Profile page connected to protected backend profile API
- Profile edit form connected to backend
- Change password form connected to backend
- Logout through the app navbar
- Tailwind CSS and daisyUI setup
- Styled auth pages, navbar, and profile dashboard

## Tech Stack

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken
- cookie-parser
- validator
- cors
- dotenv

### Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- daisyUI

## Project Structure

```txt
hobby-social-media-app/
  client/
    src/
      api/
        axios.js
      components/
        AppLayout.jsx
        NavBar.jsx
      pages/
        Login.jsx
        Profile.jsx
        SignUp.jsx
      App.jsx
      index.css
      main.jsx
  server/
    src/
      config/
        database.js
      middlewares/
        userAuth.js
      models/
        user.model.js
      routes/
        authRoute.js
        profileRoute.js
      utils/
        validation.js
      app.js
```

## Backend APIs Completed

### Auth

```txt
POST /auth/signup
POST /auth/login
POST /auth/logout
```

### Profile

```txt
GET /profile
PATCH /profile/edit
PATCH /profile/password
```

## Local Setup

### Server

```bash
cd server
npm install
npm run dev
```

Create `server/.env`:

```env
PORT=7777
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Client

```bash
cd client
npm install
npm run dev
```

The client runs on:

```txt
http://localhost:5173
```

The server runs on:

```txt
http://localhost:7777
```

## Learning Notes

- Schema validation protects the database.
- API validation protects request handling and gives cleaner errors.
- Passwords are never stored directly; they are hashed with bcrypt.
- JWT is stored in an HTTP-only cookie instead of localStorage.
- Protected APIs use middleware to verify the logged-in user.
- React uses Axios with `withCredentials: true` so cookies are sent to the backend.
- Tailwind CSS handles utility styling, and daisyUI provides reusable UI components.

## Next Phase

The next major feature phase is the posts module:

```txt
1. Create Post model
2. Create POST /posts API
3. Create GET /posts/me API
4. Add create-post form in React
5. Show user posts on profile
6. Add feed API with pagination
```

Later phases:

```txt
- Follow/unfollow users
- Feed filtering and pagination
- Likes and comments
- User discovery
- Better route protection on the frontend
- Production-ready auth improvements
```
