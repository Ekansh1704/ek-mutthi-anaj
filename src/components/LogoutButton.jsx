// src/components/LogoutButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Clear login data
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userRole");

    // ✅ Redirect to General Public Dashboard
    navigate("/dashboard");
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed bottom-6 right-6 bg-red-600 text-white px-5 py-2 rounded-full shadow-lg hover:bg-red-700 transition-all"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
