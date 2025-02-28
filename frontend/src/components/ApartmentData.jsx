import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Utility function to get the current user's role
const getUserRole = async () => {
  // Here you would get the role from Firebase or your authentication system
  // Replace this with actual logic to get the user role (e.g., Firebase Authentication).
  // This example assumes that the user data contains a `role` field
  const user = await axios.get('/api/current-user');
  return user.data.role; // Assume 'manager' or 'tenant'
};

const ApartmentList = ({ role }) => {
  const [apartments, setApartments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get(`/api/apartments?status=${statusFilter}`);
        setApartments(response.data);
      } catch (error) {
        console.error('Error fetching apartments', error);
      }
    };

    fetchApartments();
  }, [statusFilter]);

  return (
    <div>
      <h2>Apartment Listings</h2>
      <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
        <option value="">All</option>
        <option value="available">Available</option>
        <option value="occupied">Occupied</option>
        <option value="maintenance">Maintenance</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Apartment ID</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {apartments.map(apartment => (
            <tr key={apartment.id}>
              <td>{apartment.id}</td>
              <td>{apartment.price}</td>
              <td>{apartment.status}</td>
              <td>
                {role === 'manager' && (
                  <>
                    <button>Edit</button>
                    <button>Assign Tenant</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ApartmentForm = ({ apartmentId, role }) => {
  const [formData, setFormData] = useState({
    price: '',
    status: 'available',
    amenities: ''
  });

  useEffect(() => {
    if (apartmentId) {
      axios.get(`/api/apartments/${apartmentId}`).then(response => {
        setFormData(response.data);
      });
    }
  }, [apartmentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (apartmentId) {
      await axios.put(`/api/apartments/${apartmentId}`, formData);
    } else {
      await axios.post('/api/apartments', formData);
    }
    // Redirect or notify user
  };

  if (role !== 'manager') {
    return <p>You do not have permission to edit apartments.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Price: </label>
      <input type="text" name="price" value={formData.price} onChange={handleChange} />

      <label>Status: </label>
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="available">Available</option>
        <option value="occupied">Occupied</option>
        <option value="maintenance">Maintenance</option>
      </select>

      <label>Amenities: </label>
      <textarea name="amenities" value={formData.amenities} onChange={handleChange}></textarea>

      <button type="submit">Save Apartment</button>
    </form>
  );
};

const AssignTenant = ({ apartmentId, role }) => {
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState('');

  useEffect(() => {
    axios.get('/api/tenants').then(response => {
      setTenants(response.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedTenant) {
      await axios.put('/api/assign-tenant', { apartmentId, tenantId: selectedTenant });
    }
  };

  if (role !== 'manager') {
    return <p>You do not have permission to assign tenants.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Assign Tenant: </label>
      <select value={selectedTenant} onChange={(e) => setSelectedTenant(e.target.value)}>
        <option value="">Select Tenant</option>
        {tenants.map(tenant => (
          <option key={tenant.id} value={tenant.id}>
            {tenant.name}
          </option>
        ))}
      </select>

      <button type="submit">Assign Tenant</button>
    </form>
  );
};

const ApartmentManager = () => {
  const [role, setRole] = useState('');

  useEffect(() => {
    // Fetch user role on component mount
    const fetchUserRole = async () => {
      const role = await getUserRole();
      setRole(role);
    };

    fetchUserRole();
  }, []);

  if (!role) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to the Apartment Management Dashboard</h1>
      <ApartmentList role={role} />
      {role === 'manager' && (
        <>
          <ApartmentForm apartmentId={null} role={role} />
          <AssignTenant apartmentId={1} role={role} />
        </>
      )}
    </div>
  );
};

export default ApartmentManager;
