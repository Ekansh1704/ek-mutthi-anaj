// src/pages/PartnerDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("loggedInUser");

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userRole");
    navigate("/dashboard");
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E7] via-white to-[#FFF3D0] flex flex-col items-center py-12 px-4">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-primary to-secondary shadow-lg rounded-2xl p-8 w-full max-w-4xl text-center text-white"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Partner Dashboard 🏠
        </h1>
        <p className="text-orange-100 text-base md:text-lg">
          Welcome, <span className="font-semibold">{user}</span> — manage your
          society connections and deliveries here.
        </p>
      </motion.div>

      {/* Dashboard Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {[
          {
            title: "🍱 Food Requests",
            desc: "View and request food donations for your designated area.",
            btn: "View / Request Food",
            link: "/partner/food-requests",
          },
          {
            title: "🚚 Delivery Tracking",
            desc: "Track live delivery status and view completed deliveries.",
            btn: "Track Deliveries",
            link: "/partner/delivery-tracking",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-md border border-orange-100"
          >
            <h2 className="text-xl font-semibold text-primary mb-2">
              {item.title}
            </h2>
            <p className="text-gray-700 text-sm">{item.desc}</p>
            <button
              onClick={() => navigate(item.link)}
              className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
            >
              {item.btn}
            </button>
          </motion.div>
        ))}

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-2xl shadow-md border border-orange-100 md:col-span-2"
        >
          <h2 className="text-xl font-semibold text-primary mb-2">
            📊 Your Current Stats
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="bg-orange-100 text-orange-800 rounded-xl p-4 text-center">
              <h3 className="font-semibold">Total Requests</h3>
              <p className="text-2xl font-bold mt-1">18</p>
            </div>
            <div className="bg-yellow-100 text-yellow-800 rounded-xl p-4 text-center">
              <h3 className="font-semibold">Deliveries Completed</h3>
              <p className="text-2xl font-bold mt-1">14</p>
            </div>
            <div className="bg-gray-100 text-gray-800 rounded-xl p-4 text-center">
              <h3 className="font-semibold">Pending Requests</h3>
              <p className="text-2xl font-bold mt-1">4</p>
            </div>
          </div>
        </motion.div>

        {/* Feedback */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-2xl shadow-md border border-orange-100 md:col-span-2"
        >
          <h2 className="text-xl font-semibold text-primary mb-2">
            💬 Share Your Feedback
          </h2>
          <p className="text-gray-700 text-sm">
            Help us improve by sharing your experience and needs.
          </p>
          <textarea
            placeholder="Write your feedback..."
            className="mt-3 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none text-sm"
            rows={3}
          ></textarea>
          <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition">
            Submit Feedback
          </button>
        </motion.div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-10 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Logout
      </button>

      <p className="mt-6 text-gray-600 text-sm">
        Logged in as <span className="font-semibold text-primary">Partner</span>
      </p>
    </div>
  );
};

export default PartnerDashboard;
