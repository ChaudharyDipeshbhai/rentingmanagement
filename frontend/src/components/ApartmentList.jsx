// import React, { useState, useEffect } from 'react';
// import './styles/ApartmentList.css';
// import { initializeApp } from 'firebase/app'; // Import Firebase initialization
// import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore'; // Import Firebase functions
// import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth functions

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBSc22PLhaoXuW5Qc-fPHGf8-r0HffXqL8",
//   authDomain: "aptxmng.firebaseapp.com",
//   projectId: "aptxmng",
//   storageBucket: "aptxmng.appspot.com", // Corrected storageBucket format
//   messagingSenderId: "210845917277",
//   appId: "1:210845917277:web:85fb2a76ef8337e39d2db4"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app); // Initialize Firestore

// const ApartmentList = () => {
//   const [apartments, setApartments] = useState([]);
//   const [filters, setFilters] = useState({
//     price: '',
//     rating: '',
//     location: '',
//     type: '',
//     buyOrRent: '',
//   });
//   const [selectedApartment, setSelectedApartment] = useState(null);
//   const [userRole, setUserRole] = useState(null);

//   // Firebase authentication
//   const auth = getAuth();

//   // Check the role of the current user
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // Get user role from Firestore (assuming a "users" collection with roles field)
//         const usersRef = collection(db, 'users');
//         const userQuery = query(usersRef, where('uid', '==', user.uid));
//         getDocs(userQuery).then((querySnapshot) => {
//           const userData = querySnapshot.docs[0]?.data();
//           setUserRole(userData?.role); // Set user role (admin/manager/tenant)
//         });
//       }
//     });
//     return () => unsubscribe();
//   }, [auth]);

//   // Fetch apartments from Firebase
//   const fetchApartments = async () => {
//     const apartmentsCollection = collection(db, 'apartments_list');
//     const apartmentSnapshot = await getDocs(apartmentsCollection);
//     const apartmentList = apartmentSnapshot.docs.map(doc => doc.data());
//     setApartments(apartmentList);
//   };

//   useEffect(() => {
//     fetchApartments();
//   }, []);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//   };

//   // Filter apartments based on the selected filters
//   const filteredApartments = apartments.filter((apartment) => {
//     const { price, rating, location, type, buyOrRent } = filters;
//     return (
//       (price === '' || (price === '50000-100000' && apartment.price <= 100000) || 
//       (price === '100000-1000000' && apartment.price > 100000 && apartment.price <= 1000000) || 
//       (price === '1000000+' && apartment.price > 1000000)) &&
//       (rating === '' || apartment.rating >= parseFloat(rating)) &&
//       (location === '' || apartment.location === location) &&
//       (type === '' || apartment.type === type) &&
//       (buyOrRent === '' || apartment.buyOrRent === buyOrRent)
//     );
//   });

//   // Function to upload apartments data (only for admin and manager)
//   const uploadApartment = async (apartment) => {
//     if (userRole === 'admin' || userRole === 'manager') {
//       const apartmentsCollection = collection(db, 'apartments_list');
//       await addDoc(apartmentsCollection, apartment);
//       fetchApartments(); // Reload apartments after uploading
//     } else {
//       alert("You don't have permission to add apartments.");
//     }
//   };

//   return (
//     <div className="apartment-list-container">
//       <h2 className="apartment-list-title">Available Apartments</h2>

//       {/* Filter Menu */}
//       <div className="filter-menu">
//         <select name="price" onChange={handleFilterChange}>
//           <option value="">Price Range</option>
//           <option value="50000-100000">₹50,000-₹100,000</option>
//           <option value="100000-1000000">₹1,00,000-₹10,00,000</option>
//           <option value="1000000+">₹10,00,000 or more</option>
//         </select>

//         <select name="rating" onChange={handleFilterChange}>
//           <option value="">Rating</option>
//           <option value="4">4+ Stars</option>
//           <option value="4.5">4.5+ Stars</option>
//           <option value="5">5 Stars</option>
//         </select>

//         <select name="location" onChange={handleFilterChange}>
//           <option value="">Location</option>
//           <option value="Vadodara">Vadodara</option>
//           <option value="Ahmedabad">Ahmedabad</option>
//           <option value="Surat">Surat</option>
//         </select>

//         <select name="type" onChange={handleFilterChange}>
//           <option value="">Type</option>
//           <option value="2BHK">2BHK</option>
//           <option value="1BHK">1BHK</option>
//           <option value="3BHK">3BHK</option>
//         </select>

//         <select name="buyOrRent" onChange={handleFilterChange}>
//           <option value="">Buy / Rent</option>
//           <option value="Buy">Buy</option>
//           <option value="Rent">Rent</option>
//         </select>
//       </div>

//       {/* Apartment List */}
//       <ul className="apartment-list">
//         {filteredApartments.map((apartment, index) => (
//           <li key={index} className="apartment-list-item">
//             <div className="apartment-image" onClick={() => setSelectedApartment(apartment)}>
//               <img src={apartment.image} alt={apartment.name} />
//             </div>
//             <div>
//               <span className="apartment-name">{apartment.name}</span>
//               <div className="apartment-details">
//                 ₹{apartment.price} | {apartment.rating}★ | {apartment.location} | {apartment.type} | {apartment.buyOrRent}
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* Modal for Apartment Details */}
//       {selectedApartment && (
//         <div className="modal" onClick={() => setSelectedApartment(null)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h2>{selectedApartment.name}</h2>
//             <img src={selectedApartment.image} alt={selectedApartment.name} className="modal-main-image" />
//             <div className="apartment-info">
//               <p><strong>Price:</strong> ₹{selectedApartment.price}</p>
//               <p><strong>Rating:</strong> {selectedApartment.rating}★</p>
//               <p><strong>Location:</strong> {selectedApartment.location}</p>
//               <p><strong>Type:</strong> {selectedApartment.type}</p>
//               <p><strong>Contact:</strong> {selectedApartment.contact}</p>
//               <p><strong>Facilities:</strong> {selectedApartment.facilities.join(', ')}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Upload New Apartment Button (only for admin/manager) */}
//       {(userRole === 'admin' || userRole === 'manager') && (
//         <button onClick={() => uploadApartment({
//           name: 'New Apartment',
//           price: 2000000,
//           rating: 4.5,
//           location: 'Vadodara',
//           type: '3BHK',
//           image: './images/ap3.jpg',
//           contact: '123-456-7890',
//           facilities: ['Gym', 'Parking'],
//           buyOrRent: 'Rent',
//         })}>Add New Apartment</button>
//       )}
//     </div>
//   );
// };

// export default ApartmentList;



import React, { useState } from 'react'; 
import './styles/ApartmentList.css';

const ApartmentList = () => {
  const apartments = [
    {
      name: 'Apartment A',
      price: 2000000,
      rating: 4.5,
      location: 'Vadodara',
      type: '2BHK',
      image: './images/ap3.jpg', // Corrected path
      contact: '123-456-7890',
      facilities: ['Gym', 'Swimming Pool', 'Parking'],
      buyOrRent: 'Buy',
    },
    {
      name: 'Apartment B',
      price: 1500,
      rating: 4.0,
      location: 'Ahmedabad',
      type: '1BHK',
      image: './images/ap1.jpg', // Corrected path
      contact: '987-654-3210',
      facilities: ['Parking', 'Security'],
      buyOrRent: 'Rent',
    },
    {
      name: 'Apartment C',
      price: 1200000,
      rating: 5.0,
      location: 'Surat',
      type: '3BHK',
      image: './images/a1.jpg', // Corrected path
      contact: '555-123-4567',
      facilities: ['Gym', 'Garden', 'Parking'],
      buyOrRent: 'Buy',
    },
  ];

  const [filters, setFilters] = useState({
    price: '',
    rating: '',
    location: '',
    type: '',
    buyOrRent: '',
  });

  const [selectedApartment, setSelectedApartment] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredApartments = apartments.filter((apartment) => {
    const { price, rating, location, type, buyOrRent } = filters;

    return (
      (price === '' || (price === '50000-100000' && apartment.price <= 100000) || 
      (price === '100000-1000000' && apartment.price > 100000 && apartment.price <= 1000000) || 
      (price === '1000000+' && apartment.price > 1000000)) &&
      (rating === '' || apartment.rating >= parseFloat(rating)) &&
      (location === '' || apartment.location === location) &&
      (type === '' || apartment.type === type) &&
      (buyOrRent === '' || apartment.buyOrRent === buyOrRent)
    );
  });

  return (
    <div className="apartment-list-container">
      <h2 className="apartment-list-title">Available Apartments</h2>

      {/* Filter Menu */}
      <div className="filter-menu">
        <select name="price" onChange={handleFilterChange}>
          <option value="">Price Range</option>
          <option value="50000-100000">₹50,000-₹100,000</option>
          <option value="100000-1000000">₹1,00,000-₹10,00,000</option>
          <option value="1000000+">₹10,00,000 or more</option>
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
          <option value="2BHK">2BHK</option>
          <option value="1BHK">1BHK</option>
          <option value="3BHK">3BHK</option>
        </select>

        <select name="buyOrRent" onChange={handleFilterChange}>
          <option value="">Buy / Rent</option>
          <option value="Buy">Buy</option>
          <option value="Rent">Rent</option>
        </select>
      </div>

      {/* Apartment List */}
      <ul className="apartment-list">
        {filteredApartments.map((apartment, index) => (
          <li key={index} className="apartment-list-item">
            <div className="apartment-image" onClick={() => setSelectedApartment(apartment)}>
              <img src={apartment.image} alt={apartment.name} />
            </div>
            <div>
              <span className="apartment-name">{apartment.name}</span>
              <div className="apartment-details">
                ₹{apartment.price} | {apartment.rating}★ | {apartment.location} | {apartment.type} | {apartment.buyOrRent}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for Apartment Details */}
      {selectedApartment && (
        <div className="modal" onClick={() => setSelectedApartment(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedApartment.name}</h2>
            <img src={selectedApartment.image} alt={selectedApartment.name} className="modal-main-image" />
            <div className="apartment-info">
              <p><strong>Price:</strong> ₹{selectedApartment.price}</p>
              <p><strong>Rating:</strong> {selectedApartment.rating}★</p>
              <p><strong>Location:</strong> {selectedApartment.location}</p>
              <p><strong>Type:</strong> {selectedApartment.type}</p>
              <p><strong>Contact:</strong> {selectedApartment.contact}</p>
              <p><strong>Facilities:</strong> {selectedApartment.facilities.join(', ')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApartmentList;
