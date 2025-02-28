import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import NavbarforManTen from './NavbarforManTen'; 
import './styles/TenantDashboard.css';

const TenantDashboard = () => {
  const [occupiedApartment, setOccupiedApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [userInfo, setUserInfo] = useState({ name: 'John Doe', email: '', role: 'tenant' });

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserEmail(user.email);
      setUserInfo({ ...userInfo, email: user.email });

      // Fetch the apartment data occupied by the tenant
      const fetchOccupiedApartment = async () => {
        try {
          const db = getFirestore();
          const apartmentRef = collection(db, 'apartments');

          // Query apartments where tenant.email matches the user's email
          const q = query(apartmentRef, where('tenant.email', '==', user.email));
          const snapshot = await getDocs(q);

          if (!snapshot.empty) {
            const occupiedData = snapshot.docs[0].data();
            setOccupiedApartment({ id: snapshot.docs[0].id, ...occupiedData });
          }
        } catch (error) {
          console.error('Error fetching occupied apartment:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchOccupiedApartment();
    }
  }, []);

  return (
    <div className="tenant-dashboard">
      {/* Add Navbar at the top */}
      <NavbarforManTen userRole="tenant" userInfo={userInfo} />

      <h1>Welcome, {userEmail}!</h1>
      <p>This is your dashboard. Below is the information about your occupied apartment:</p>

      {loading ? (
        <p>Loading your apartment details...</p>
      ) : (
        occupiedApartment ? (
          <div className="occupied-apartment">
            <h2>Your Apartment Details</h2>
            <div className="apartment-card">
              <h3>Apartment ID: {occupiedApartment.id}</h3>
              <p><strong>Status:</strong> {occupiedApartment.status}</p>
              <p><strong>Amenities:</strong> {occupiedApartment.amenities}</p>
              <p><strong>Price:</strong> ${occupiedApartment.price}</p>
              <p><strong>Description:</strong> {occupiedApartment.description || 'No description provided.'}</p>
            </div>
          </div>
        ) : (
          <p>You do not currently occupy an apartment.</p>
        )
      )}
    </div>
  );
};

export default TenantDashboard;
