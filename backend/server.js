import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; 
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js'; 
import listingsRoutes from './routes/listings.js';
import adminRoutes from './routes/admin.js';
import booking from './routes/bookings.js';
import authMiddleware from './middleware/authMiddleware.js'; // Import JWT middleware

// Initialize environment variables
dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors()); // Enable Cross-Origin Request Sharing (CORS)

// MongoDB Connection
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit the application if the database connection fails
  }
})();

// Set up API routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/listing', listingsRoutes); // Listings routes
app.use('/api/admin', adminRoutes); // Admin routes
app.use('/api/booking', booking); // booking routes

// Example of a protected route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Serve static files in production (if frontend is built)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));

  // Serve index.html file for any unmatched routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });
}

// Default API route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Airbnb-inspired API!' });
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Set the port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
