// import React, { useState } from 'react';
// import { storage, firestore } from '../firebase'; // Corrected import from firebaseConfig
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
// import './styles/ManagerPage.css';

// const ManagerPage = () => {
//   const [hotels, setHotels] = useState([]);
//   const [apartments, setApartments] = useState([]);
//   const [form, setForm] = useState({
//     type: 'hotel',
//     name: '',
//     price: '',
//     location: '',
//     status: 'rent',
//     facilities: [],
//     images: [],
//     newFacility: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleAddFacility = () => {
//     if (form.newFacility.trim() && !form.facilities.includes(form.newFacility)) {
//       setForm((prevForm) => ({
//         ...prevForm,
//         facilities: [...prevForm.facilities, prevForm.newFacility.trim()],
//         newFacility: '',
//       }));
//     }
//   };

//   const handleAddImage = (e) => {
//     const files = Array.from(e.target.files);
//     files.forEach(file => {
//       const imageRef = ref(storage, `images/${Date.now()}_${file.name}`);
//       const uploadTask = uploadBytesResumable(imageRef, file);

//       uploadTask.on('state_changed', 
//         (snapshot) => {
//           // You can track progress here if you want
//         }, 
//         (error) => {
//           console.error(error);
//         }, 
//         () => {
//           // On completion, get the download URL and update state
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             setForm(prevForm => ({
//               ...prevForm,
//               images: [...prevForm.images, downloadURL],
//             }));
//           });
//         }
//       );
//     });
//   };

//   const handleAddItem = () => {
//     if (!form.name || !form.price || !form.location) {
//       alert('Please fill in all required fields!');
//       return;
//     }

//     const newItem = { ...form, id: Date.now() };
//     if (form.type === 'hotel') {
//       setHotels((prevHotels) => [...prevHotels, newItem]);
//     } else {
//       setApartments((prevApartments) => [...prevApartments, newItem]);
//     }

//     // Add to Firestore
//     setDoc(doc(firestore, form.type, newItem.id.toString()), newItem);

//     // Reset form
//     setForm({
//       type: 'hotel',
//       name: '',
//       price: '',
//       location: '',
//       status: 'rent',
//       facilities: [],
//       images: [],
//       newFacility: '',
//     });
//   };

//   const handleRemoveItem = (type, id) => {
//     if (type === 'hotel') {
//       setHotels((prevHotels) => prevHotels.filter((hotel) => hotel.id !== id));
//     } else {
//       setApartments((prevApartments) =>
//         prevApartments.filter((apartment) => apartment.id !== id)
//       );
//     }
//   };

//   return (
//     <div className="manager-page">
//       <h1>Manage Listings</h1>
//       <div className="form-container">
//         <h3>Add New Listing</h3>
//         <form>
//           <label>
//             Type:
//             <select name="type" value={form.type} onChange={handleInputChange}>
//               <option value="hotel">Hotel</option>
//               <option value="apartment">Apartment</option>
//             </select>
//           </label>
//           <label>
//             Name:
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleInputChange}
//               placeholder="Enter name"
//             />
//           </label>
//           <label>
//             Price (per day):
//             <input
//               type="number"
//               name="price"
//               value={form.price}
//               onChange={handleInputChange}
//               placeholder="Enter price"
//             />
//           </label>
//           <label>
//             Location:
//             <input
//               type="text"
//               name="location"
//               value={form.location}
//               onChange={handleInputChange}
//               placeholder="Enter location"
//             />
//           </label>
//           <label>
//             Status:
//             <select name="status" value={form.status} onChange={handleInputChange}>
//               <option value="rent">Rent</option>
//               <option value="sell">Sell</option>
//             </select>
//           </label>
//           <label>
//             Add Facilities:
//             <div className="facility-input">
//               <input
//                 type="text"
//                 name="newFacility"
//                 value={form.newFacility}
//                 onChange={handleInputChange}
//                 placeholder="Enter facility"
//               />
//               <button type="button" onClick={handleAddFacility}>
//                 Add Facility
//               </button>
//             </div>
//             <div className="facility-list">
//               {form.facilities.map((facility, index) => (
//                 <span key={`${facility}-${index}`} className="facility-item">
//                   {facility}
//                 </span>
//               ))}
//             </div>
//           </label>
//           <label>
//             Upload Images:
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleAddImage}
//             />
//             <div className="image-preview">
//               {form.images.map((image, index) => (
//                 <img
//                   key={`${image}-${index}`}
//                   src={image}
//                   alt={`Preview ${index}`}
//                   className="image-preview-item"
//                   style={{ width: '200px', height: '250px', objectFit: 'cover' }}
//                 />
//               ))}
//             </div>
//           </label>
//           <button type="button" onClick={handleAddItem}>
//             Add Item
//           </button>
//         </form>
//       </div>

//       <div className="listing-container">
//         <h3>Owned Hotels</h3>
//         <ul>
//           {hotels.map((hotel) => (
//             <li key={hotel.id}>
//               <h4>{hotel.name}</h4>
//               <p>{hotel.location} - ${hotel.price}/day</p>
//               <p>Status: {hotel.status}</p>
//               <div className="facility-list">
//                 {hotel.facilities.map((facility, index) => (
//                   <span key={`${facility}-${index}`} className="facility-item">
//                     {facility}
//                   </span>
//                 ))}
//               </div>
//               <div className="images-list">
//                 {hotel.images.map((image, index) => (
//                   <img key={index} src={image} alt={`Hotel ${index}`} />
//                 ))}
//               </div>
//               <button onClick={() => handleRemoveItem('hotel', hotel.id)}>
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>

//         <h3>Owned Apartments</h3>
//         <ul>
//           {apartments.map((apartment) => (
//             <li key={apartment.id}>
//               <h4>{apartment.name}</h4>
//               <p>{apartment.location} - ${apartment.price}</p>
//               <p>Status: {apartment.status}</p>
//               <div className="facility-list">
//                 {apartment.facilities.map((facility, index) => (
//                   <span key={`${facility}-${index}`} className="facility-item">
//                     {facility}
//                   </span>
//                 ))}
//               </div>
//               <div className="images-list">
//                 {apartment.images.map((image, index) => (
//                   <img key={index} src={image} alt={`Apartment ${index}`} />
//                 ))}
//               </div>
//               <button onClick={() => handleRemoveItem('apartment', apartment.id)}>
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ManagerPage;
