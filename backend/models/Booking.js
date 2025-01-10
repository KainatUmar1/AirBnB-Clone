import mongoose from 'mongoose';

// Define the schema for a Booking
const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing', // Reference to the Listing model
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

// Create the Booking model
const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
