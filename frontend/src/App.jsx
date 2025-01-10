import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Categories from './components/Categories';
import ListingCard from './components/ListingCard';
import Footer from './components/Footer';
import ListingDetails from './components/ListingDetails';
import BookingPage from './components/BookingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPanel from './pages/AdminPanel';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute'; // Protect routes for logged-in users
import axios from 'axios'; // Import axios for backend requests
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

const App = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // To handle loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track if user is authenticated

  // Fetch listings from backend API
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('/api/listing');
        setListings(response.data);  // Assuming the backend returns an array of listings
        setFilteredListings(response.data);
        setLoading(false);  // Set loading to false after data is fetched
      } catch (err) {
        setError('Failed to load listings');
        setLoading(false);
      }
    };

    fetchListings();

    // Check if user is authenticated (example: checking for token in localStorage)
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const filterByCategory = (category) => {
    setFilteredListings(
      category
        ? listings.filter((listing) => listing.category === category)
        : listings
    );
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Homepage */}
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <Categories onCategorySelect={filterByCategory} />
                {loading ? (
                  <p>Loading listings...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  <ListingCard listings={filteredListings} />
                )}
              </>
            }
          />

          {/* Listing Details Page */}
          <Route path="/listing/:id" element={<ListingDetails />} />

          {/* Booking Page */}
          <Route path="/booking/:id" element={<BookingPage />} />

          {/* Login Page */}
          <Route
            path="/login" element={<Login />}
          />

          {/* Signup Page */}
          <Route
            path="/signup" element={<Signup />}
          />

          {/* Admin Panel (Protected Route) */}
          <Route
            path="/adminpanel"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />

          {/* Profile Page (Protected Route) */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
