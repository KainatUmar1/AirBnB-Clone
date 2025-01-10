import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [newListing, setNewListing] = useState({
    title: '',
    description: '',
    price: '',
  });

  // Fetch listings and bookings with JWT authentication
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('adminToken'); // Get token from localStorage
        if (!token) {
          setError('Admin token is missing. Please login.');
          return;
        }

        // Set Authorization header with Bearer token
        const listingsResponse = await axios.get('/api/admin/listing', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const bookingsResponse = await axios.get('/api/admin/booking', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setListings(listingsResponse.data);
        setBookings(bookingsResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data: ' + (err.response ? err.response.data.message : err.message));
      }
    };
    fetchData();
  }, []);

  // Handle deleting listings
  const handleDeleteListing = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('Admin token is missing. Please login.');
        return;
      }

      await axios.delete(`/api/admin/listing/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (err) {
      console.error('Error deleting listing:', err);
      setError('Failed to delete listing: ' + (err.response ? err.response.data.message : err.message));
    }
  };

  // Handle adding new listings
  const handleAddListing = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('Admin token is missing. Please login.');
        return;
      }

      const response = await axios.post('/api/admin/listing', newListing, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListings([...listings, response.data]);
      setNewListing({ title: '', description: '', price: '' }); // Reset form
    } catch (err) {
      console.error('Error adding listing:', err);
      setError('Failed to add listing: ' + (err.response ? err.response.data.message : err.message));
    }
  };

  // Handle input change for adding a listing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewListing({ ...newListing, [name]: value });
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      {error && <p className="error-message">{error}</p>}

      {/* Add Listing Form */}
      <div className="add-listing-form">
        <h3>Add a New Listing</h3>
        <form onSubmit={handleAddListing}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newListing.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newListing.description}
            onChange={handleInputChange}
            required
          ></textarea>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newListing.price}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Listing</button>
        </form>
      </div>

      {/* Listings Management */}
      <div className="listings">
        <h3>Manage Listings</h3>
        {listings.map((listing) => (
          <div key={listing._id} className="listing-card">
            <h4>{listing.title}</h4>
            <p>{listing.description}</p>
            <button onClick={() => handleDeleteListing(listing._id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Bookings Management */}
      <div className="bookings">
        <h3>Manage Bookings</h3>
        {bookings.map((booking) => (
          <div key={booking._id} className="booking-card">
            <p>User: {booking.user.username}</p>
            <p>Property: {booking.listing.title}</p>
            <p>Dates: {new Date(booking.checkInDate).toDateString()} - {new Date(booking.checkOutDate).toDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
