import React, { useState } from 'react';
import './styles/CategorySelector.css'; // Ensure this file exists

const CategorySelector = () => {
  const [category, setCategory] = useState('hotels'); // State for managing the selected category

  const handleCategoryChange = (category) => {
    setCategory(category); // Set the selected category
  };

  return (
    <div>
      <h1>Category Selector</h1>

      {/* Category Selector */}
      <div className="category-selector-container">
        <button
          className={`category-button ${category === 'hotels' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('hotels')}
        >
          Hotels
        </button>
        <button
          className={`category-button ${category === 'apartments' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('apartments')}
        >
          Apartments
        </button>
      </div>

      {/* Render the selected category */}
      {category === 'hotels' && (
        <div>
          <h2>Hotel List</h2>
          <a href="/hotel-list">View Hotels</a>
        </div>
      )}
      {category === 'apartments' && (
        <div>
          <h2>Apartment List</h2>
          <a href="/apartment-list">View Apartments</a>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
