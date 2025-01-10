# Airbnb-Inspired Application

## Project Overview

This project is a full-stack application inspired by Airbnb, allowing users to register, login, view properties, and make bookings. It includes a mini admin panel for managing listings and bookings. The backend integrates MongoDB for data storage and uses JWT for secure authentication. The frontend is built with React and Axios, ensuring a smooth and responsive user experience.

### Key Features:
- **MongoDB Integration**: Stores data for properties, bookings, and users.
- **User Authentication**: JWT-based login and registration, with protected routes for users and admins.
- **Admin Panel**: Enables the management of listings and bookings with secure access control.
- **Booking System**: Allows users to book properties, view past bookings, and manage their profile.
- **Responsive Design**: Ensures the app is accessible on both mobile and desktop devices.
- **Frontend and Backend**: Built with React and Node.js, using Express and Mongoose.

## Getting Started

### Prerequisites
- Node.js (v12 or above)
- MongoDB (use MongoDB Atlas for cloud setup or install MongoDB locally)
- A code editor (e.g., VS Code)
- Postman or similar tool to test API endpoints

### Installation

1. Clone the repository.
2. Set up the backend (Server):
   - Navigate to the backend directory:
      ```cd backend```
   - Install dependencies:
      ```npm install```
   - Create a .env file with the following values:
      ```
      MONGODB_URI=<your-mongodb-uri>
      JWT_SECRET=<your-secret-key>
      ```
   - Run the server:
      ```npm start```
3. Set up the frontend:
   - Navigate to the frontend directory.
    ```cd frontend```
   - Install dependencies:
    ```npm install```
   - Run the frontend:
    ```npm start```
    
The application will be accessible at http://localhost:3000 on the frontend, and the backend will be running on http://localhost:5000.

## API Endpoints
### Authentication
- POST /api/auth/register: Register a new user.
- POST /api/auth/login: Login with credentials and receive a JWT token.
### Listings
- GET /api/listings: Fetch all listings.
- GET /api/listings/:id: Fetch a specific listing by ID.
- POST /api/admin/listings: Admin can create a new listing.
- DELETE /api/admin/listings/:id: Admin can delete a listing by ID.
### Bookings
- POST /api/bookings: Create a new booking.
- GET /api/admin/bookings: Admin can view all bookings.
### Admin Panel (Admin routes are protected by JWT and role-based access control)
- GET /api/admin/listings: Admin can view all listings.
- POST /api/admin/listings: Admin can add a new listing.
- DELETE /api/admin/listings/:id: Admin can delete a listing by ID.
- GET /api/admin/bookings: Admin can view all bookings.
### Admin Panel
To access the admin panel:
1. Log in as an admin using the admin@example.com credentials (if pre-configured in your app).
2. Use the admin panel pages to manage listings and bookings:
   - Listings Management: Add or delete properties.
   - Bookings Management: View all bookings made by users.
### Features & Enhancements
- User Authentication: Secure login and registration with JWT tokens stored in localStorage.
- Role-Based Access Control: Admin users can access admin routes, while regular users can view and make bookings.
- Responsive Design: The UI is optimized for both mobile and desktop screens.
- State Management: React hooks (useState, useEffect) and context API are used to manage the frontend state.
### Security Best Practices
- Password Hashing: User passwords are hashed using bcrypt before being stored in the database.
- JWT Middleware: Protects routes by ensuring valid JWT tokens for secure access.
- Role-Based Access: Only admins can access certain routes, ensuring security and separation of responsibilities.

## Conclusion:
- MongoDB Integration: Proper setup and functionality for listing and booking data.
- JWT Authentication: Secure login, registration, and role-based access.
- Responsive UI: Fully responsive design for seamless user experience.
- Code Quality: Clean, well-organized code with appropriate comments.

## Author
- **Kainat Umar** - *Developer of this `AirBnB Clone` using MERN Technologies.*
