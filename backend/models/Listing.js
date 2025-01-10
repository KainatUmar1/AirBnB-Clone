import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // Use ObjectId for MongoDB default behavior
      required: true,
    },
    listing_url: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(http|https):\/\/[^ "\n]+$/.test(v); // Validates URL format
        },
        message: 'Please provide a valid URL for the listing',
      },
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    summary: {
      type: String,
      trim: true,
      maxlength: [500, 'Summary cannot exceed 500 characters'],
    },
    space: {
      type: String,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [10, 'Description must be at least 10 characters long'],
    },
    neighborhood_overview: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
    },
    transit: {
      type: String,
    },
    access: {
      type: String,
    },
    interaction: {
      type: String,
    },
    house_rules: {
      type: String,
    },
    property_type: {
      type: String,
    },
    room_type: {
      type: String,
    },
    bed_type: {
      type: String,
    },
    minimum_nights: {
      type: String,
    },
    maximum_nights: {
      type: String,
    },
    cancellation_policy: {
      type: String,
    },
    last_scraped: {
      type: Date,
    },
    calendar_last_scraped: {
      type: Date,
    },
    first_review: {
      type: Date,
    },
    last_review: {
      type: Date,
    },
    accommodates: {
      type: Number,
    },
    bedrooms: {
      type: Number,
    },
    beds: {
      type: Number,
    },
    images: {
      picture_url: {
        type: String,
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Indexing for better query performance
listingSchema.index({ name: 'text', description: 'text', summary: 'text' });

const Listing = mongoose.model('Listing', listingSchema, 'listingsAndReviews'); // Explicitly set collection name

export default Listing;