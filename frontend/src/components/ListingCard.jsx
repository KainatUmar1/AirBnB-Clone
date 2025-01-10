import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/ListingCard.css';

const ListingCard = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 12; // Number of listings per page

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/listing?page=${currentPage}&limit=${limit}`);
        setListings(response.data.listings);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError('Failed to fetch listings');
        console.error('Error fetching listings:', err);
      }
      setLoading(false);
    };
    fetchListings();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toFixed(2);  // Convert the number to a string with 2 decimal places
    }
    return 'N/A';  // Return 'N/A' if the price is not a valid number
  };  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!listings.length) {
    return <p>No listings available</p>;
  }

  return (
    <div className="listings">
      {listings.map((listing) => {
        const imageUrl = (listing.images && listing.images.picture_url) || "src/images/fallback-img.png";
        const title = listing.name || "Untitled Listing";
        const price = formatPrice(listing.price);

        return (
          <div key={listing._id || listing.id} className="listing-card">
            <img src={imageUrl} alt={title} className="listing-image" />
            <h4>{title}</h4>
            <p>${price} / night</p>
            <Link to={`/listing/${listing._id}`} className="view-details-btn">View Details</Link>
          </div>
        );
      })}

      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
          Prev
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ListingCard;
