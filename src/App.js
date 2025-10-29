// src/App.js
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
    // ✅ Responsive background + smooth color transitions
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col">
      {/* ✅ Navbar stays fixed and adapts on small screens */}
      <Navbar />

      {/* ✅ Padding top to prevent content hiding behind fixed navbar */}
      <main className="flex-1 pt-16 px-4 md:px-8">
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
      </main>

      {/* ✅ Simple footer for completeness */}
      <footer className="text-center py-4 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-8">
        © {new Date().getFullYear()} Ek Mutthi Anaj | All Rights Reserved
      </footer>
    </div>
  );
}

export default App;
