import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ListingDetails.css';

const ListingDetails = () => {
  const { id } = useParams();  // Get the listing ID from the URL
  const [listing, setListing] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/listing/${id}`);
        setListing(response.data);
      } catch (err) {
        setError('Failed to fetch the listing details');
        console.error('Error fetching listing details:', err);
      }
      setLoading(false);
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!listing) {
    return <p>No listing found</p>;
  }

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toFixed(2);
    }
    return 'N/A';
  };

  return (
    <div className="listing-details">
      <div className="image-gallery">
        <img
          src={listing.images?.picture_url || "src/images/fallback-img.png"}
          alt={listing.name}
          className="main-image"
        />
      </div>
      <div className="details-content">
        <h2>{listing.name}</h2>
        <p><strong>Price:</strong> ${formatPrice(listing.price)} / night</p>
        <p><strong>Description:</strong> {listing.description}</p>
        {listing.summary && <p><strong>Summary:</strong> {listing.summary}</p>}
        {listing.space && <p><strong>Space:</strong> {listing.space}</p>}
        {listing.neighborhood_overview && <p><strong>Neighborhood:</strong> {listing.neighborhood_overview}</p>}
        {listing.transit && <p><strong>Transit:</strong> {listing.transit}</p>}
        {listing.access && <p><strong>Access:</strong> {listing.access}</p>}
        {listing.interaction && <p><strong>Interaction:</strong> {listing.interaction}</p>}
        {listing.house_rules && <p><strong>House Rules:</strong> {listing.house_rules}</p>}
        {listing.property_type && <p><strong>Property Type:</strong> {listing.property_type}</p>}
        {listing.room_type && <p><strong>Room Type:</strong> {listing.room_type}</p>}
        {listing.bed_type && <p><strong>Bed Type:</strong> {listing.bed_type}</p>}
        <p><strong>Accommodates:</strong> {listing.accommodates} guests</p>
        <p><strong>Bedrooms:</strong> {listing.bedrooms}</p>
        <p><strong>Beds:</strong> {listing.beds}</p>
        {listing.notes && <p><strong>Notes:</strong> {listing.notes}</p>}
        {listing.cancellation_policy && <p><strong>Cancellation Policy:</strong> {listing.cancellation_policy}</p>}

        <Link to={`/booking/${listing._id}`} className="book-now-btn">Book Now</Link>
      </div>
    </div>
  );
};

export default ListingDetails;
