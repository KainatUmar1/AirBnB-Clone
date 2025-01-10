import React from 'react';
import '../styles/Categories.css';

const categories = [
  { name: 'Room', icon: 'fas fa-bed' }, 
  { name: 'Icons', icon: 'fas fa-shapes' },
  { name: 'Trending', icon: 'fas fa-fire' },
  { name: 'Lake', icon: 'fas fa-water' },
  { name: 'Treehouses', icon: 'fas fa-tree' },
  { name: 'Islands', icon: 'fas fa-umbrella-beach' },
  { name: 'Play', icon: 'fas fa-volleyball-ball' },
  { name: 'Cabins', icon: 'fas fa-home' },
  { name: 'Camping', icon: 'fas fa-campground' },
  { name: 'Cycladic homes', icon: 'fas fa-archway' },
  { name: 'Tiny homes', icon: 'fas fa-house-user' }
];

const Categories = () => (
  <div className="categories">
    {categories.map((category, index) => (
      <button key={index} className="category-item">
        <i className={category.icon}></i>
        <span>{category.name}</span>
      </button>
    ))}
    <button className="category-item">
      <i className="fas fa-arrow-right"></i>
    </button>
  </div>
);

export default Categories;
