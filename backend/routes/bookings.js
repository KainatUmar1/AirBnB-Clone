import express from 'express';
import Booking from '../models/Booking.js';
import Listing from '../models/Listing.js';
import authMiddleware from '../middleware/authMiddleware.js';
import mongoose from 'mongoose';

const router = express.Router();

// Protect routes with JWT authentication middleware
router.use(authMiddleware);

// Get all bookings for the authenticated user
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('listing');
    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  const { listingId, checkInDate, checkOutDate, totalPrice } = req.body;

  // Debugging: Log the received listingId to ensure it is passed correctly
  console.log('Received Listing ID:', listingId);

  // Validate the listingId to ensure it's a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(listingId)) {
    return res.status(400).json({ message: 'Invalid listing ID' });
  }

  try {
    // Find the listing by the valid listingId
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Validate check-in and check-out dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    if (checkOut <= checkIn) {
      return res.status(400).json({ message: 'Check-out date must be after check-in date.' });
    }

    // Create and save the booking
    const newBooking = new Booking({
      user: req.user.id, // The authenticated user's ID
      listing: listingId,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create booking', error: err.message });
  }
});

export default router;
