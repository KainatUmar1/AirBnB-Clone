import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/BookingPage.css';

const BookingPage = () => {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`/api/listings/${listingId}`);
        setListing(response.data);
      } catch (error) {
        console.error('Error fetching listing:', error.message);
      }
    };
    fetchListing();
  }, [listingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit booking logic here
    const bookingData = {
      listingId,
      checkInDate,
      checkOutDate,
      totalPrice,
    };
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/booking', bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Booking successful!');
    } catch (error) {
      console.error('Error submitting booking:', error.message);
    }
  };

  if (!listing) return <p>Loading...</p>;

  return (
    <div className="booking-page">
      <h2>Book {listing.title}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Check-in Date:
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />
        </label>
        <label>
          Check-out Date:
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />
        </label>
        <p>Total Price: ${totalPrice}</p>
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingPage;
