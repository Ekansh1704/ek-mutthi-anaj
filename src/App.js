import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import WhoWeAre from "./pages/WhoWeAre";
import WhatWeDo from "./pages/WhatWeDo";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navbar appears on all pages */}
      <Navbar />

      {/* Define all app routes */}
      <Routes>
        {/* Default redirect to What We Do */}
        <Route path="/" element={<Navigate to="/what-we-do" replace />} />

        {/* Main Pages */}
        <Route path="/who-we-are" element={<WhoWeAre />} />
        <Route path="/what-we-do" element={<WhatWeDo />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Catch-all for invalid routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
