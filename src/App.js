// src/App.js
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Components (small, always needed for the app shell — kept as regular imports)
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages — lazy-loaded so each route's code (and heavy deps like leaflet/recharts
// used only by the dashboards) is downloaded on demand instead of all up front.
const WhoWeAre = lazy(() => import("./pages/WhoWeAre"));
const WhatWeDo = lazy(() => import("./pages/WhatWeDo"));
const OurImpact = lazy(() => import("./pages/OurImpact"));
const Volunteer = lazy(() => import("./pages/Volunteer"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const SocietyDashboard = lazy(() => import("./pages/SocietyDashboard"));
const PartnerDashboard = lazy(() => import("./pages/PartnerDashboard"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminAddData = lazy(() => import("./pages/AdminAddData"));
const Login = lazy(() => import("./pages/Login"));
const Donate = lazy(() => import("./pages/Donate"));
const DonationSuccess = lazy(() => import("./pages/DonationSuccess"));

// ✅ Simple full-page fallback shown while a route chunk downloads
const PageLoader = () => (
  <div className="flex items-center justify-center py-24">
    <div className="h-10 w-10 rounded-full border-4 border-[#FFD9A0] border-t-[#FF8C00] animate-spin" />
  </div>
);

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

        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
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
