import express from 'express';
import Listing from '../models/Listing.js';
import Booking from '../models/Booking.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

// Get all listings
router.get('/listings', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch listings' });
  }
});

// Add a new listing
router.post('/listings', async (req, res) => {
  const { title, description, price } = req.body;
  try {
    const newListing = new Listing({ title, description, price });
    await newListing.save();
    res.status(201).json(newListing);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add listing' });
  }
});

// Delete a listing
router.delete('/listings/:id', async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete listing' });
  }
});

// Get all bookings
router.get('/booking', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user').populate('listing');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

export default router;