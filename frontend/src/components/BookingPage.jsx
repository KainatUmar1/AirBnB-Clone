import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as jwt_decode from 'jwt-decode'; // Correct import for jwt-decode
import '../styles/BookingPage.css';

const BookingPage = () => {
  const { id } = useParams(); // Extract listing ID from URL
  const [listing, setListing] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userId, setUserId] = useState(null); // Store the authenticated user ID

  // Fetch the authenticated user's ID from the JWT token
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
    if (token) {
      try {
        const decodedToken = jwt_decode(token); // Decode the JWT token
        setUserId(decodedToken.id); // Set the user ID from the token
      } catch (err) {
        setError('Failed to decode token.');
        console.error('Failed to decode token:', err);
      }
    } else {
      setError('User not authenticated. Please log in.');
    }
  }, []);

  useEffect(() => {
    // Fetch the listing details by ID from the backend
    const fetchListing = async () => {
      try {
        const response = await axios.get(`/api/listing/${id}`);
        setListing(response.data);
      } catch (err) {
        setError('Failed to load the listing. Please try again later.');
        console.error(err);
      }
    };

    fetchListing();
  }, [id]);

  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      setError('Please select both check-in and check-out dates.');
      return;
    }

    const totalNights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const totalPrice = totalNights * listing.price;

    if (totalNights <= 0) {
      setError('Check-out date must be after the check-in date.');
      return;
    }

    setError(''); // Reset the error message
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the JWT token in the request header
          'Content-Type': 'application/json',
        },
      };

      const bookingData = {
        listingId: listing._id, // Pass the listing ID
        checkInDate: checkIn,
        checkOutDate: checkOut,
        totalPrice,
      };

      // Send the booking request to the backend
      const response = await axios.post('http://localhost:5000/api/booking', bookingData, config);

      if (response.status === 201) {
        setSuccessMessage('Booking confirmed! Details have been saved.');
      }
    } catch (err) {
      setError('Failed to confirm booking. Please try again.');
      console.error(err);
    }
  };

  if (!listing) {
    return <p>Loading...</p>;
  }

  const totalNights = checkIn && checkOut ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) : 0;
  const totalPrice = totalNights > 0 ? totalNights * listing.price : 0;

  return (
    <div className="booking-page">
      <h2>Booking for {listing.title}</h2>
      <div className="booking-form">
        <label>
          Check-in:
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        </label>
        <label>
          Check-out:
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </label>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <div className="booking-summary">
          <p><strong>Price per night:</strong> ${listing.price}</p>
          <p><strong>Total nights:</strong> {totalNights}</p>
          <p><strong>Total price:</strong> ${totalPrice}</p>
        </div>
        <button onClick={handleBooking} className="confirm-btn">Confirm Booking</button>
      </div>
    </div>
  );
};

export default BookingPage;
