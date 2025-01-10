import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = () => (
  <div className="search-bar">
    <button>Anywhere</button>
    <button>Any week</button>
    <button>Add guests</button>
    <button className="search-button">
      <i className="fas fa-search"></i>
    </button>
  </div>
);

export default SearchBar;
