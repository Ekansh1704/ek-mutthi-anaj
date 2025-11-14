import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const correctPassword = "ekmutthi2025"; // ✅ You can change this anytime

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin-add-data");
    } else {
      setError("❌ Incorrect password. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-96 border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Admin Login
        </h1>
        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full rounded-lg mb-4"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 w-full rounded-lg hover:bg-green-700 transition"
        >
          Login
        </button>
        {error && <p className="text-red-600 text-sm mt-3 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
