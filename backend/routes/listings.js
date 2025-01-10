import mongoose from 'mongoose';
import express from 'express';
import Listing from '../models/Listing.js';

const router = express.Router();

// Get paginated listings
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;  // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10;  // Default to 10 listings per page

    // Calculate the skip value
    const skip = (page - 1) * limit;

    const listings = await Listing.find()
      .skip(skip)
      .limit(limit);

    // Get the total number of listings to calculate the total pages
    const totalListings = await Listing.countDocuments();

    res.status(200).json({
      listings,
      totalListings,
      totalPages: Math.ceil(totalListings / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching listings', error: err.message });
  }
});

// Get a specific listing by ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching listing', error: err.message });
  }
});



// Add a new listing
router.post('/', async (req, res) => {
  const { name, description, room_type } = req.body;

  // Validate required fields
  if (!name || !description || !room_type) {
    return res.status(400).json({ message: 'Please provide all required fields (name, description, room_type)' });
  }

  try {
    const newListing = new Listing({ name, description, room_type });
    await newListing.save(); // Save the listing to MongoDB
    res.status(201).json(newListing); // Return the created listing
  } catch (error) {
    console.error('Error adding listing:', error.message);
    res.status(500).json({ message: 'Error adding the listing to the server' });
  }
});

// Update a listing by ID
router.put('/:id', async (req, res) => {
  const { name, description, room_type } = req.body;

  try {
    const listing = await Listing.findById(req.params.id); // Find the listing by ID
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Update the listing fields
    listing.name = name || listing.name;
    listing.description = description || listing.description;
    listing.room_type = room_type || listing.room_type;

    const updatedListing = await listing.save(); // Save the updated listing
    res.status(200).json(updatedListing);
  } catch (error) {
    console.error('Error updating listing:', error.message);
    res.status(500).json({ message: 'Error updating the listing on the server' });
  }
});

// Delete a listing by ID
router.delete('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id); // Find the listing by ID
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    await listing.remove(); // Remove the listing from MongoDB
    res.status(200).json({ message: 'Listing removed successfully' });
  } catch (error) {
    console.error('Error deleting listing:', error.message);
    res.status(500).json({ message: 'Error deleting the listing from the server' });
  }
});

export default router;
