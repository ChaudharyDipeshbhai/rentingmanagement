import React, { useState, useEffect } from 'react';
import './styles/HotelList.css';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // Ensure this points to the correct path of your firebase.js

const HotelList = () => {
  const hotels = [
    {
      name: 'Hotel A',
      price: 800,
      rating: 4.5,
      location: 'Vadodara',
      type: 'Room',
      image: '/images/HotelA.jpg',
      contact: '123-456-7890',
      roomImages: ['/images/pic1.avif', '/images/pic2.avif'],
      facilities: ['Free WiFi', 'Pool', 'Gym'],
    },
    {
      name: 'Hotel B',
      price: 1200,
      rating: 4.0,
      location: 'Ahmedabad',
      type: 'Dormitory',
      image: '/images/HotelB.jpg',
      contact: '987-654-3210',
      roomImages: ['/images/pic6.avif', '/images/pic5.avif'],
      facilities: ['Free WiFi', 'Café'],
    },
    {
      name: 'Hotel C',
      price: 1600,
      rating: 5.0,
      location: 'Surat',
      type: 'Room',
      image: '/images/HotelC.jpg',
      contact: '555-123-4567',
      roomImages: ['/images/pic3.avif', '/images/pic4.avif'],
      facilities: ['Free WiFi', 'Spa', 'Restaurant'],
    },
  ];

  // Upload hotels to Firebase when component mounts
  useEffect(() => {
    const uploadHotels = async () => {
      const hotelCollectionRef = collection(db, 'hotels');
      try {
        for (const hotel of hotels) {
          await addDoc(hotelCollectionRef, hotel);
        }
        console.log('Hotels added successfully');
      } catch (error) {
        console.error('Error adding hotels: ', error);
      }
    };
    uploadHotels();
  }, []);

  const [filters, setFilters] = useState({
    price: '',
    rating: '',
    location: '',
    type: '',
  });

  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredHotels = hotels.filter((hotel) => {
    const { price, rating, location, type } = filters;

    return (
      (price === '' || (price === '500-1000' && hotel.price <= 1000) ||
        (price === '1000-1500' && hotel.price > 1000 && hotel.price <= 1500) ||
        (price === '1500+' && hotel.price > 1500)) &&
      (rating === '' || hotel.rating >= parseFloat(rating)) &&
      (location === '' || hotel.location === location) &&
      (type === '' || hotel.type === type)
    );
  });

  return (
    <div className="hotel-list-container">
      <h2 className="hotel-list-title">Available Hotels</h2>

      {/* Filter Menu */}
      <div className="filter-menu">
        <select name="price" onChange={handleFilterChange}>
          <option value="">Price Range</option>
          <option value="500-1000">₹500-₹1000</option>
          <option value="1000-1500">₹1000-₹1500</option>
          <option value="1500+">₹1500 or more</option>
        </select>

        <select name="rating" onChange={handleFilterChange}>
          <option value="">Rating</option>
          <option value="4">4+ Stars</option>
          <option value="4.5">4.5+ Stars</option>
          <option value="5">5 Stars</option>
        </select>

        <select name="location" onChange={handleFilterChange}>
          <option value="">Location</option>
          <option value="Vadodara">Vadodara</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Surat">Surat</option>
        </select>

        <select name="type" onChange={handleFilterChange}>
          <option value="">Type</option>
          <option value="Room">Room</option>
          <option value="Dormitory">Dormitory</option>
        </select>
      </div>

      {/* Hotel List */}
      <ul className="hotel-list">
        {filteredHotels.map((hotel, index) => (
          <li key={index} className="hotel-list-item">
            <div className="hotel-image" onClick={() => setSelectedHotel(hotel)}>
              <img src={hotel.image} alt={hotel.name} />
            </div>
            <div>
              <span className="hotel-name">{hotel.name}</span>
              <div className="hotel-details">
                ₹{hotel.price} per day | {hotel.rating}★ | {hotel.location} | {hotel.type}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for Hotel Details */}
      {selectedHotel && (
        <div className="modal" onClick={() => setSelectedHotel(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedHotel.name}</h2>
            <img src={selectedHotel.image} alt={selectedHotel.name} className="modal-main-image" />
            <div className="hotel-info">
              <p><strong>Price:</strong> ₹{selectedHotel.price} per day</p>
              <p><strong>Rating:</strong> {selectedHotel.rating}★</p>
              <p><strong>Location:</strong> {selectedHotel.location}</p>
              <p><strong>Type:</strong> {selectedHotel.type}</p>
              <p><strong>Contact:</strong> {selectedHotel.contact}</p>
              <p><strong>Facilities:</strong> {selectedHotel.facilities.join(', ')}</p>
            </div>

            <div className="room-images">
              <h3>Room Images</h3>
              {selectedHotel.roomImages.map((img, index) => (
                <img key={index} src={img} alt={`Room ${index + 1}`} className="room-image" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelList;
