import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, 'Description must be at least 10 characters long'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String },
      country: { type: String, required: true },
      postal_code: { type: String, required: true },
    },
    images: [
      {
        url: {
          type: String,
          required: true,
          validate: {
            validator: function (v) {
              return /^(http|https):\/\/[^ "]+$/.test(v); // Validates URL format
            },
            message: 'Please provide a valid URL for the image',
          },
        },
        alt_text: { type: String, trim: true }, // Optional alt text for accessibility
      },
    ],
    property_type: {
      type: String,
      required: true,
      enum: ['Apartment', 'House', 'Villa', 'Condo', 'Cottage', 'Cabin', 'Loft'], // Restrict to predefined types
    },
    room_type: {
      type: String,
      required: true,
      enum: ['Entire Place', 'Private Room', 'Shared Room'], // Options for room availability
    },
    amenities: [String], // List of amenities (e.g., WiFi, Parking, Pool)
    price_per_night: {
      type: Number,
      required: true,
      min: [1, 'Price per night must be at least $1'],
    },
    bedrooms: {
      type: Number,
      required: true,
      min: [1, 'There must be at least 1 bedroom'],
    },
    bathrooms: {
      type: Number,
      required: true,
      min: [1, 'There must be at least 1 bathroom'],
    },
    accommodates: {
      type: Number,
      required: true,
      min: [1, 'Must accommodate at least 1 person'],
    },
    host: {
      name: { type: String, required: true, trim: true },
      contact: { type: String, required: true }, // Could be an email or phone number
    },
    availability: {
      type: Map,
      of: Boolean, // Example: {'2024-12-01': true, '2024-12-02': false}
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot exceed 5'],
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Indexing for text search and price sorting
propertySchema.index({ title: 'text', description: 'text' });

const Property = mongoose.model('Property', propertySchema);

export default Property;
