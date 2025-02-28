import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './styles/ManagerDashboard.css';
import { Link } from 'react-router-dom';
import NavbarforManTen from './NavbarforManTen'; // Ensure you use the correct Navbar component

const ManagerDashboard = () => {
  const [apartments, setApartments] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddApartmentForm, setShowAddApartmentForm] = useState(false);
  const [newApartment, setNewApartment] = useState({
    price: '',
    status: 'available',
    amenities: '',
  });
  const [managerInfo, setManagerInfo] = useState({ email: '', name: 'Manager' });

  useEffect(() => {
    const fetchManagerInfo = () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        setManagerInfo({ email: currentUser.email, name: currentUser.displayName || 'Manager' });
      } else {
        console.error('No authenticated user found');
      }
    };

    const fetchApartments = async () => {
      try {
        const db = getFirestore();
        const apartmentRef = collection(db, 'apartments');
        const snapshot = await getDocs(apartmentRef);
        const apartmentData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setApartments(apartmentData);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTenants = async () => {
      try {
        const db = getFirestore();
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        const tenantUsers = snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((user) => user.role === 'tenant');
        setTenants(tenantUsers);
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };

    fetchManagerInfo();
    fetchApartments();
    fetchTenants();
  }, []);

  const handleApartmentChange = (e) => {
    const { name, value } = e.target;
    setNewApartment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddApartment = async () => {
    if (!newApartment.price || !newApartment.amenities) {
      alert('Please fill in all apartment details');
      return;
    }

    try {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, 'apartments'), newApartment);
      setApartments((prev) => [...prev, { ...newApartment, id: docRef.id }]);
      setShowAddApartmentForm(false);
      setNewApartment({ price: '', status: 'available', amenities: '' });
    } catch (error) {
      console.error('Error adding apartment:', error);
    }
  };

  const handleEditApartment = async (id, field, value) => {
    try {
      const db = getFirestore();
      const apartmentDoc = doc(db, 'apartments', id);
      await updateDoc(apartmentDoc, { [field]: value });

      setApartments((prev) =>
        prev.map((apartment) =>
          apartment.id === id ? { ...apartment, [field]: value } : apartment
        )
      );
    } catch (error) {
      console.error('Error updating apartment:', error);
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
      await deleteDoc(doc(db, 'apartments', id));
      setApartments((prev) => prev.filter((apartment) => apartment.id !== id));
    } catch (error) {
      console.error('Error deleting apartment:', error);
    }
  };

  const handleAssignTenant = (id) => {
    alert(`Assign tenant functionality for apartment ID ${id} is not yet implemented.`);
  };

  return (
    <div className="manager-dashboard">
      <NavbarforManTen userRole="manager" userInfo={managerInfo} />
      <h1>Manager Dashboard</h1>
      <p><strong>Logged in as:</strong> {managerInfo.email}</p>

      <button className="btn-add" onClick={() => setShowAddApartmentForm(!showAddApartmentForm)}>
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
          <select name="status" value={newApartment.status} onChange={handleApartmentChange}>
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

      <h2>Apartment Listings</h2>
      {loading ? (
        <p>Loading...</p>
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
                <td onClick={() => handleEditClick(apartment.id, 'price', apartment.price)}>
                  {apartment.price}
                </td>
                <td onClick={() => handleEditClick(apartment.id, 'status', apartment.status)}>
                  {apartment.status}
                </td>
                <td onClick={() => handleEditClick(apartment.id, 'amenities', apartment.amenities)}>
                  {apartment.amenities}
                </td>
                <td>
                  <button onClick={() => handleAssignTenant(apartment.id)}>
                    Assign Tenant
                  </button>
                  <button onClick={() => handleEditClick(apartment.id, 'status', apartment.status)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDeleteApartment(apartment.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Manage Tenants</h2>
      <button className="btn-add">
        <Link to="/register" className="btn-link">
          Add Tenant
        </Link>
      </button>
    </div>
  );
};

export default ManagerDashboard;
