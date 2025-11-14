// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { db } from "./firebaseConfig";

// Components
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import WhoWeAre from "./pages/WhoWeAre";
import WhatWeDo from "./pages/WhatWeDo";
import OurImpact from "./pages/OurImpact";
import Volunteer from "./pages/Volunteer";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SocietyDashboard from "./pages/SocietyDashboard";
import PartnerDashboard from "./pages/PartnerDashboard";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import AdminAddData from "./pages/AdminAddData";
import Login from "./pages/Login";
import Donate from "./pages/Donate";
import DonationSuccess from "./pages/DonationSuccess";

// ✅ Protected Route Wrapper
const ProtectedRoute = ({ children, role, currentUser }) => {
  if (!currentUser) return <Navigate to="/login" replace />;

  if (role && currentUser.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// ✅ Layout Component
const Layout = ({ currentUser }) => {
  const location = useLocation();
  const showHero = location.pathname === "/what-we-do";

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8E1] text-[#4E342E] transition-colors duration-300">
      <Navbar />
      <ScrollToTop />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        {showHero && <HeroSection />}

        <Routes>
          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/what-we-do" replace />} />

          {/* 🌾 Public Pages */}
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/impact" element={<OurImpact />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/donation-success" element={<DonationSuccess />} />
          <Route path="/login" element={<Login />} />

          {/* 🌾 Common Dashboard Page */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* 🌾 Role-Based Dashboards */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin" currentUser={currentUser}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/society/:societyId"
            element={
              <ProtectedRoute role="society" currentUser={currentUser}>
                <SocietyDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/partner-dashboard"
            element={
              <ProtectedRoute role="partner" currentUser={currentUser}>
                <PartnerDashboard />
              </ProtectedRoute>
            }
          />

          {/* 🌾 Admin Add Data */}
          <Route
            path="/admin-add-data"
            element={
              <ProtectedRoute role="admin" currentUser={currentUser}>
                <AdminAddData />
              </ProtectedRoute>
            }
          />

          {/* 🌾 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

// 🌾 App Component
const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Load user info from localStorage (on mount + whenever it changes)
  const loadUser = () => {
    const username = localStorage.getItem("loggedInUser");
    const role = localStorage.getItem("userRole");

    if (username && role) {
      setCurrentUser({ username, role });
    } else {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    loadUser();

    // ✅ Listen for localStorage updates (when Login.jsx updates it)
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  return <Layout currentUser={currentUser} />;
};

export default App;
