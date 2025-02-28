import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import TenantDashboard from './components/TenantDashboard'; // Make sure this component exists
import LandingPage from './components/LandingPage';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import FaqSection from './components/FaqSection';
import FeaturesOverview from './components/FeaturesOverview';
import HelpSection from './components/HelpSection';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import NavbarforManTen from './components/NavbarforManTen'; 
import Apartment from './components/ApartmentData';
import Map from './components/Map';
import Chatbot from './components/Chatbot';
import ApartmentList from './components/ApartmentList';
import HotelList from './components/HotelList';
import CategorySelector from './components/CategorySelector';
import ManagerPage from './components/ManagerPage';
// import ViewVideos from './components/ViewVideo';
// import VideoRoutes from './components/VideoRoutes';
// import UploadVideo from './components/UploadVideo';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/manager-dashboard" element={<ManagerDashboard />} />
                <Route path="/tenant-dashboard" element={<TenantDashboard />} />
                <Route path="/about" element={<AboutSection />} />
                <Route path="/contact" element={<ContactSection />} />
                <Route path="/faq" element={<FaqSection />} />
                <Route path="/feature" element={<FeaturesOverview />} />
                <Route path="/help" element={<HelpSection />} />
                <Route path="/home" element={<HeroSection />} />
                <Route path="/apartments" element={<Apartment />} />
                <Route path="/navbar" element={<Navbar />} />
                <Route path="/navbarforManTen" element={<NavbarforManTen />} />
                <Route path="/map" element={<Map />} />
                <Route path="/chat" element={<Chatbot />} />
                <Route path="/apartment-list" element={<ApartmentList />} />
                <Route path="/hotel-list" element={<HotelList />} />
                <Route path="/manage" element={<ManagerPage />} />
                <Route path="/category-selector" element={<CategorySelector />} />
                {/* <Route path="/upload" element={<UploadVideo />} /> */}
                {/* <Route path="/videoRoutes" element={<VideoRoutes />} /> */}
                {/* <Route path="/viewVideo" element={<ViewVideos />} /> */}
            </Routes>
        </Router>
    );
};

export default App;
