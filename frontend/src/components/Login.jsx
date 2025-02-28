import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import { signInWithEmailAndPassword } from 'firebase/auth';  // Import the necessary function from Firebase Auth
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { auth } from '../firebase';  // Import Firebase Auth instance
import './styles/Auth.css';  // Import the CSS file


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Initialize navigate

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch user role from Firestore
            const userRole = await getUserRole(user.uid);

            // Redirect based on the role
            if (userRole === 'admin') {
                navigate('/admin-dashboard');  // Redirect to Admin Dashboard
            } else if (userRole === 'manager') {
                navigate('/manager-dashboard');  // Redirect to Manager Dashboard
            } else if (userRole === 'tenant') {
                navigate('/tenant-dashboard');  // Redirect to Tenant Dashboard
            } else {
                alert('Role not found');
            }
        } catch (error) {
            alert(error.message);  // Handle error in login
        }
    };

    // Function to fetch user role from Firestore
    const getUserRole = async (uid) => {
        const db = getFirestore();  // Get Firestore instance
        const userDoc = await getDoc(doc(db, 'users', uid)); // Fetch user document by UID
        return userDoc.exists() ? userDoc.data().role : null; // Return role if document exists
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button type="submit" className="login-button">Login</button>
            <div className="register-link">
                Don't have an account? <a href="/register">Register</a>
            </div>
            </form>
        </div>
    );
};

export default Login;
