import React, { useState } from 'react';
import axios from 'axios';
import './styles/Auth.css';  // Import the CSS file


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', { email, password, role });
            alert('User registered successfully!');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <select onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="tenant">Tenant</option>
                <option value="manager">Manager</option>
                {/* <option value="manager">Admin</option> */}
            </select>
            <button type="submit">Register</button>
            <div>
                Already have an account? <a href="/login">Login</a>
            </div>
        </form>
    );
};

export default Register;
