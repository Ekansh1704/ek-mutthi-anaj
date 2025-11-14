// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    const storedRole = localStorage.getItem("userRole");

    if (storedUser && storedRole) {
      console.log("🔁 User already logged in:", storedUser);
      setRedirecting(true);

      // Add small delay to allow React Router to mount before navigating
      setTimeout(() => {
        if (storedRole === "admin") navigate("/admin-dashboard");
        else if (storedRole === "partner") navigate("/partner-dashboard");
        else if (storedRole === "society") navigate(`/society/${storedUser}`);
        else navigate("/dashboard");
      }, 250);
    }
  }, [navigate]);

  // ✅ Handle login button click
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔍 Query Firestore for matching username + password
      const q = query(
        collection(db, "users"),
        where("username", "==", username.trim()),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();

        // ✅ Store user session
        localStorage.setItem("loggedInUser", userData.username);
        localStorage.setItem("userRole", userData.role);

        console.log("✅ Login successful:", userData);

        // ✅ Redirect immediately based on role
        if (userData.role === "admin") {
          navigate("/admin-dashboard");
        } else if (userData.role === "partner") {
          navigate("/partner-dashboard");
        } else if (userData.role === "society") {
          navigate(`/society/${userData.username}`);
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("❌ Invalid username or password");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("⚠️ Unable to connect. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ If already logged in, show loader instead of login form
  if (redirecting) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-primary mb-2">
            Redirecting...
          </h2>
          <p className="text-gray-600 text-sm">
            Please wait while we take you to your dashboard.
          </p>
          <div className="mt-6 w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* ✨ Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-paper.png')] opacity-40"></div>

      {/* 🌾 Login Card */}
      <div className="relative z-10 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-96 border border-orange-100">
        <h1 className="text-3xl font-bold text-center mb-3 text-primary">
          Member Login
        </h1>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Access your Ek Mutthi Anaj Community Portal
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/70"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/70"
            required
          />

          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all shadow-md ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-primary hover:bg-secondary hover:shadow-lg"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <p className="text-center text-sm text-gray-500">
            Need help?{" "}
            <a href="/contact" className="text-primary hover:underline">
              Contact us
            </a>
          </p>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          © {new Date().getFullYear()} Ek Mutthi Anaj
        </p>
      </div>
    </div>
  );
};

export default Login;
