import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Navbar from "./NavbarforManTen"; // Importing the Navbar component
import { Pie } from "react-chartjs-2"; // Import Pie chart from react-chartjs-2
import Chart from "chart.js/auto";
import "./styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [apartments, setApartments] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [occupiedApartments, setOccupiedApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddApartmentForm, setShowAddApartmentForm] = useState(false);
  const [newApartment, setNewApartment] = useState({
    price: "",
    status: "available",
    amenities: "",
  });
  const [adminInfo, setAdminInfo] = useState({ email: "", name: "Admin" });

  useEffect(() => {
    const fetchAdminInfo = () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        setAdminInfo({ email: currentUser.email, name: "Admin" });
      }
    };

    const fetchData = async () => {
      try {
        const db = getFirestore();

        // Fetch apartments
        const apartmentSnapshot = await getDocs(collection(db, "apartments"));
        setApartments(
          apartmentSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );

        // Fetch tenants
        const usersSnapshot = await getDocs(collection(db, "users"));
        setTenants(
          usersSnapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((user) => user.role === "tenant")
        );

        // Fetch occupied apartments
        const occupiedQuery = query(
          collection(db, "apartments"),
          where("tenant.email", "!=", null)
        );
        const occupiedSnapshot = await getDocs(occupiedQuery);
        setOccupiedApartments(
          occupiedSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchAdminInfo();
    fetchData();
  }, []);

  const handleApartmentChange = (e) => {
    const { name, value } = e.target;
    setNewApartment((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddApartment = async () => {
    if (!newApartment.price || !newApartment.amenities) {
      alert("Please fill in all apartment details");
      return;
    }
    try {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "apartments"), newApartment);
      setApartments((prev) => [...prev, { ...newApartment, id: docRef.id }]);
      setShowAddApartmentForm(false);
      setNewApartment({ price: "", status: "available", amenities: "" });
    } catch (error) {
      console.error("Error adding apartment:", error);
    }
  };

  const handleEditApartment = async (id, field, value) => {
    try {
      const db = getFirestore();
      const apartmentDoc = doc(db, "apartments", id);
      await updateDoc(apartmentDoc, { [field]: value });

      setApartments((prev) =>
        prev.map((apartment) =>
          apartment.id === id ? { ...apartment, [field]: value } : apartment
        )
      );
    } catch (error) {
      console.error("Error updating apartment:", error);
    }
  };

  const handleEditClick = (id, field, currentValue) => {
    const newValue = prompt(`Enter new ${field}:`, currentValue);
    if (newValue && newValue !== currentValue) {
      handleEditApartment(id, field, newValue);
    }
  };

  const handleDeleteApartment = async (id) => {
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "apartments", id));
      setApartments((prev) => prev.filter((apartment) => apartment.id !== id));
    } catch (error) {
      console.error("Error deleting apartment:", error);
    }
  };

  const totalApartments = apartments.length;
  const occupiedCount = occupiedApartments.length;
  const availableCount = totalApartments - occupiedCount;

  const occupiedRatio = totalApartments
    ? (occupiedCount / totalApartments) * 100
    : 0;
  const availableRatio = totalApartments
    ? (availableCount / totalApartments) * 100
    : 0;

  // Graph Data for Pie chart
  const reportData = {
    labels: ["Occupied", "Available"],
    datasets: [
      {
        data: [occupiedCount, availableCount],
        backgroundColor: ["#4caf50", "#f44336"], // Green for Occupied, Red for Available
        hoverBackgroundColor: ["#388e3c", "#d32f2f"],
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <Navbar userRole="admin" userInfo={adminInfo} />
      <h1>Admin Dashboard</h1>

      <button
        className="btn-add"
        onClick={() => setShowAddApartmentForm(!showAddApartmentForm)}
      >
        <FaPlus /> Add Apartment
      </button>

      {showAddApartmentForm && (
        <div className="add-apartment-form">
          <h2>Add New Apartment</h2>
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={newApartment.price}
            onChange={handleApartmentChange}
          />
          <select
            name="status"
            value={newApartment.status}
            onChange={handleApartmentChange}
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <input
            type="text"
            name="amenities"
            placeholder="Amenities"
            value={newApartment.amenities}
            onChange={handleApartmentChange}
          />
          <button className="btn-submit" onClick={handleAddApartment}>
            Submit
          </button>
        </div>
      )}

      <h2>Apartment Occupancy Ratio</h2>
      <div className="occupancy-ratio">
        <p>
          <strong>Occupied Apartments:</strong> {occupiedCount} /{" "}
          {totalApartments}
        </p>
        <p>
          <strong>Available Apartments:</strong> {availableCount} /{" "}
          {totalApartments}
        </p>
      </div>

      <h2>Reports</h2>
      <Pie data={reportData} options={{ responsive: true, maintainAspectRatio: false }} />

      <h2>All Apartments</h2>
      {loading ? (
        <p>Loading apartments...</p>
      ) : (
        <table className="apartments-list">
          <thead>
            <tr>
              <th>Price</th>
              <th>Status</th>
              <th>Amenities</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apartments.map((apartment) => (
              <tr key={apartment.id}>
                <td>{apartment.price}</td>
                <td>{apartment.status}</td>
                <td>{apartment.amenities}</td>
                <td>
                  <button
                    onClick={() =>
                      handleEditClick(apartment.id, "status", apartment.status)
                    }
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteApartment(apartment.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>All Tenants</h2>
      {tenants.map((tenant) => (
        <div key={tenant.id} className="tenant-card">
          {/* <p>
            <strong>Name:</strong> {tenant.name}
          </p> */}
          <p>
            <strong>Email:</strong> {tenant.email}
          </p>
        </div>
      ))}

      <h2>Occupied Apartments</h2>
      {occupiedApartments.map((apartment) => (
        <div key={apartment.id} className="occupied-apartment-card">
          {/* <p>
            <strong>Apartment ID:</strong> {apartment.id}
          </p> */}
          <p>
            <strong>Apartment:</strong> {apartment.AptName}
          </p>
          <p>
            <strong>Tenant Email:</strong> {apartment.tenant.email}
          </p>
        </div>
      ))}

      <h2>Manage Tenants</h2>
      <button className="btn-add">
        <Link to="/register" className="btn-link">
          Add User
        </Link>
      </button>
    </div>
  );
};

export default AdminDashboard;


// import React, { useState, useEffect } from "react";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   query,
//   where,
//   doc,
// } from "firebase/firestore";
// import { Link } from "react-router-dom";
// import { getAuth } from "firebase/auth";
// import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
// import Navbar from "./NavbarforManTen"; // Importing the Navbar component
// import "./styles/AdminDashboard.css";

// const AdminDashboard = () => {
//   const [apartments, setApartments] = useState([]);
//   const [tenants, setTenants] = useState([]);
//   const [occupiedApartments, setOccupiedApartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAddApartmentForm, setShowAddApartmentForm] = useState(false);
//   const [newApartment, setNewApartment] = useState({
//     price: "",
//     status: "available",
//     amenities: "",
//   });
//   const [adminInfo, setAdminInfo] = useState({ email: "", name: "Admin" });

//   useEffect(() => {
//     const fetchAdminInfo = () => {
//       const auth = getAuth();
//       const currentUser = auth.currentUser;
//       if (currentUser) {
//         setAdminInfo({ email: currentUser.email, name: "Admin" });
//       }
//     };

//     const fetchData = async () => {
//       try {
//         const db = getFirestore();

//         // Fetch apartments
//         const apartmentSnapshot = await getDocs(collection(db, "apartments"));
//         setApartments(
//           apartmentSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
//         );

//         // Fetch tenants
//         const usersSnapshot = await getDocs(collection(db, "users"));
//         setTenants(
//           usersSnapshot.docs
//             .map((doc) => ({ ...doc.data(), id: doc.id }))
//             .filter((user) => user.role === "tenant")
//         );

//         // Fetch occupied apartments
//         const occupiedQuery = query(
//           collection(db, "apartments"),
//           where("tenant.email", "!=", null)
//         );
//         const occupiedSnapshot = await getDocs(occupiedQuery);
//         setOccupiedApartments(
//           occupiedSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
//         );

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     };

//     fetchAdminInfo();
//     fetchData();
//   }, []);

//   const handleApartmentChange = (e) => {
//     const { name, value } = e.target;
//     setNewApartment((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddApartment = async () => {
//     if (!newApartment.price || !newApartment.amenities) {
//       alert("Please fill in all apartment details");
//       return;
//     }
//     try {
//       const db = getFirestore();
//       const docRef = await addDoc(collection(db, "apartments"), newApartment);
//       setApartments((prev) => [...prev, { ...newApartment, id: docRef.id }]);
//       setShowAddApartmentForm(false);
//       setNewApartment({ price: "", status: "available", amenities: "" });
//     } catch (error) {
//       console.error("Error adding apartment:", error);
//     }
//   };

//   const handleEditApartment = async (id, field, value) => {
//     try {
//       const db = getFirestore();
//       const apartmentDoc = doc(db, "apartments", id);
//       await updateDoc(apartmentDoc, { [field]: value });

//       setApartments((prev) =>
//         prev.map((apartment) =>
//           apartment.id === id ? { ...apartment, [field]: value } : apartment
//         )
//       );
//     } catch (error) {
//       console.error("Error updating apartment:", error);
//     }
//   };

//   const handleEditClick = (id, field, currentValue) => {
//     const newValue = prompt(`Enter new ${field}:`, currentValue);
//     if (newValue && newValue !== currentValue) {
//       handleEditApartment(id, field, newValue);
//     }
//   };

//   const handleDeleteApartment = async (id) => {
//     try {
//       const db = getFirestore();
//       await deleteDoc(doc(db, "apartments", id));
//       setApartments((prev) => prev.filter((apartment) => apartment.id !== id));
//     } catch (error) {
//       console.error("Error deleting apartment:", error);
//     }
//   };

//   const totalApartments = apartments.length;
//   const occupiedCount = occupiedApartments.length;
//   const availableCount = totalApartments - occupiedCount;

//   const occupiedRatio = totalApartments
//     ? (occupiedCount / totalApartments) * 100
//     : 0;
//   const availableRatio = totalApartments
//     ? (availableCount / totalApartments) * 100
//     : 0;

//   return (
//     <div className="admin-dashboard">
//       <Navbar userRole="admin" userInfo={adminInfo} />
//       <h1>Admin Dashboard</h1>

//       <button
//         className="btn-add"
//         onClick={() => setShowAddApartmentForm(!showAddApartmentForm)}
//       >
//         <FaPlus /> Add Apartment
//       </button>

//       {showAddApartmentForm && (
//         <div className="add-apartment-form">
//           <h2>Add New Apartment</h2>
//           <input
//             type="text"
//             name="price"
//             placeholder="Price"
//             value={newApartment.price}
//             onChange={handleApartmentChange}
//           />
//           <select
//             name="status"
//             value={newApartment.status}
//             onChange={handleApartmentChange}
//           >
//             <option value="available">Available</option>
//             <option value="occupied">Occupied</option>
//             <option value="maintenance">Maintenance</option>
//           </select>
//           <input
//             type="text"
//             name="amenities"
//             placeholder="Amenities"
//             value={newApartment.amenities}
//             onChange={handleApartmentChange}
//           />
//           <button className="btn-submit" onClick={handleAddApartment}>
//             Submit
//           </button>
//         </div>
//       )}

//       <h2>Apartment Occupancy Ratio</h2>
//       <div className="occupancy-ratio">
//         <div className="occupancy-bar">
//           <div className="occupied-bar" style={{ width: `${occupiedRatio}%` }}>
//             Occupied ({occupiedCount})
//           </div>
//           <div className="available-bar" style={{ width: `${availableRatio}%` }}>
//             Available ({availableCount})
//           </div>
//         </div>
//         <p>
//           <strong>Occupied Apartments:</strong> {occupiedCount} /{" "}
//           {totalApartments}
//         </p>
//         <p>
//           <strong>Available Apartments:</strong> {availableCount} /{" "}
//           {totalApartments}
//         </p>
//       </div>

//       <h2>All Apartments</h2>
//       {loading ? (
//         <p>Loading apartments...</p>
//       ) : (
//         <table className="apartments-list">
//           <thead>
//             <tr>
//               <th>Price</th>
//               <th>Status</th>
//               <th>Amenities</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {apartments.map((apartment) => (
//               <tr key={apartment.id}>
//                 <td>{apartment.price}</td>
//                 <td>{apartment.status}</td>
//                 <td>{apartment.amenities}</td>
//                 <td>
//                   <button
//                     onClick={() =>
//                       handleEditClick(apartment.id, "status", apartment.status)
//                     }
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteApartment(apartment.id)}
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <h2>All Tenants</h2>
//       {tenants.map((tenant) => (
//         <div key={tenant.id} className="tenant-card">
//           <p>
//             <strong>Name:</strong> {tenant.name}
//           </p>
//           <p>
//             <strong>Email:</strong> {tenant.email}
//           </p>
//         </div>
//       ))}

//       <h2>Occupied Apartments</h2>
//       {occupiedApartments.map((apartment) => (
//         <div key={apartment.id} className="occupied-apartment-card">
//           <p>
//             <strong>Apartment ID:</strong> {apartment.id}
//           </p>
//           <p>
//             <strong>Apartment:</strong> {apartment.AptName}
//           </p>
//           <p>
//             <strong>Tenant Email:</strong> {apartment.tenant.email}
//           </p>
//         </div>
//       ))}

//       <h2>Manage Tenants</h2>
//       <button className="btn-add">
//         <Link to="/register" className="btn-link">
//           Add User
//         </Link>
//       </button>
//     </div>
//   );
// };

// export default AdminDashboard;
