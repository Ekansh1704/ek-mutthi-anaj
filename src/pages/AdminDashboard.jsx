import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import AdminDonations from "../components/AdminDonations";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const [monthlyData, setMonthlyData] = useState([]);
  const [stockData, setStockData] = useState({});
  const [summary, setSummary] = useState({
    totalCollected: 0,
    totalDistributed: 0,
    activeSocieties: 0,
    locationsSupported: 0,
  });
  const [recentCollections, setRecentCollections] = useState([]);
  const [showRecent, setShowRecent] = useState(false);
  const [donations, setDonations] = useState([]);
  const [showDonations, setShowDonations] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🧩 New: Requests data (from all societies)
  const [requests, setRequests] = useState([]);
  const [showRequests, setShowRequests] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Monthly data
        const monthlySnap = await getDocs(collection(db, "monthlyData"));
        const monthly = [];
        let totalCollected = 0;
        let totalDistributed = 0;

        monthlySnap.forEach((doc) => {
          const data = doc.data();
          monthly.push({
            month: data.month,
            collected: data.collected || 0,
            distributed: data.distributed || 0,
          });
          totalCollected += data.collected || 0;
          totalDistributed += data.distributed || 0;
        });

        // Stock Data
        const stockSnap = await getDocs(collection(db, "stockData"));
        let latestStock = {};
        stockSnap.forEach((doc) => (latestStock = doc.data()));

        // Societies and Locations
        const societySnap = await getDocs(collection(db, "societies"));
        const locationSnap = await getDocs(collection(db, "locations"));

        setSummary({
          totalCollected,
          totalDistributed,
          activeSocieties: societySnap.size,
          locationsSupported: locationSnap.size,
        });

        setMonthlyData(monthly);
        setStockData(latestStock);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error loading dashboard:", error);
        alert("Error loading data. Please check Firebase setup.");
        setLoading(false);
      }
    };

    fetchDashboardData();

    // ✅ Real-time listener for Recent Collections
    const qRecent = query(collection(db, "monthlyData"), orderBy("date", "desc"));
    const unsubscribeRecent = onSnapshot(qRecent, (snapshot) => {
      const recents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecentCollections(recents.slice(0, 5));
    });

    // ✅ Real-time listener for Donations
    const qDonations = query(collection(db, "donations"), orderBy("createdAt", "desc"));
    const unsubscribeDonations = onSnapshot(qDonations, (snapshot) => {
      const donationData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDonations(donationData);
    });

    // ✅ Real-time listener for All Requests (combined)
    const qRequests = query(collection(db, "requests"), orderBy("createdAt", "desc"));
    const unsubscribeRequests = onSnapshot(qRequests, (snapshot) => {
      const requestData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(requestData);
    });

    return () => {
      unsubscribeRecent();
      unsubscribeDonations();
      unsubscribeRequests();
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userRole");
    navigate("/dashboard");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <p className="text-lg font-semibold animate-pulse">
          Loading dashboard data...
        </p>
      </div>
    );

  const COLORS = ["#FF8C00", "#34D399", "#F6AD55"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 text-gray-800 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-orange-100 transition-all duration-300 hover:shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-orange-600">
            Admin Dashboard 🌾
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
          <div className="bg-orange-100 text-orange-800 rounded-xl p-6 text-center shadow-sm border border-orange-200 transform hover:scale-105 transition">
            <h2 className="text-lg font-semibold">Total Collected</h2>
            <p className="text-3xl font-bold mt-2">
              {summary.totalCollected} kg
            </p>
          </div>

          <div className="bg-green-100 text-green-800 rounded-xl p-6 text-center shadow-sm border border-green-200 transform hover:scale-105 transition">
            <h2 className="text-lg font-semibold">Total Donated</h2>
            <p className="text-3xl font-bold mt-2">
              {summary.totalDistributed} kg
            </p>
          </div>

          <div className="bg-yellow-100 text-yellow-800 rounded-xl p-6 text-center shadow-sm border border-yellow-200 transform hover:scale-105 transition">
            <h2 className="text-lg font-semibold">Active Societies</h2>
            <p className="text-3xl font-bold mt-2">
              {summary.activeSocieties}
            </p>
          </div>

          <div className="bg-blue-100 text-blue-800 rounded-xl p-6 text-center shadow-sm border border-blue-200 transform hover:scale-105 transition">
            <h2 className="text-lg font-semibold">Locations Supported</h2>
            <p className="text-3xl font-bold mt-2">
              {summary.locationsSupported}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          {/* Bar Chart */}
          <div className="bg-orange-50 rounded-xl p-6 shadow-inner border hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-4 text-orange-700">
              Monthly Collection & Donation
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="collected" fill="#FF8C00" name="Collected (kg)" />
                <Bar dataKey="distributed" fill="#34D399" name="Donated (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-green-50 rounded-xl p-6 shadow-inner border hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-4 text-green-700">
              Current Stock Composition
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Rice", value: stockData.rice || 0 },
                    { name: "Wheat", value: stockData.wheat || 0 },
                    { name: "Pulses", value: stockData.pulses || 0 },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                  dataKey="value"
                >
                  {COLORS.map((color, i) => (
                    <Cell key={i} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 🧾 Combined Requests Overview */}
        <div className="bg-white rounded-xl p-6 shadow-inner border mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-700">
              Requests Overview (All Societies)
            </h2>
            <button
              onClick={() => setShowRequests(!showRequests)}
              className="text-sm text-blue-600 hover:underline"
            >
              {showRequests ? "Hide" : "Show"}
            </button>
          </div>

          {showRequests && (
            <table className="min-w-full text-sm text-gray-700 border">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  <th className="p-3 border">Requester</th>
                  <th className="p-3 border">Society</th>
                  <th className="p-3 border">Type</th>
                  <th className="p-3 border">Quantity</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {requests.length > 0 ? (
                  requests.map((req, i) => (
                    <tr key={i} className="text-center hover:bg-blue-50">
                      <td className="p-2 border">{req.requesterName || "N/A"}</td>
                      <td className="p-2 border">{req.societyName || "—"}</td>
                      <td className="p-2 border capitalize">{req.type || "—"}</td>
                      <td className="p-2 border">{req.quantity || "—"}</td>
                      <td
                        className={`p-2 border font-medium ${
                          req.status === "pending"
                            ? "text-yellow-600"
                            : req.status === "completed"
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        {req.status || "Unknown"}
                      </td>
                      <td className="p-2 border">
                        {req.createdAt?.toDate
                          ? req.createdAt.toDate().toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Donations Section */}
        <div className="bg-white rounded-xl p-6 shadow-inner border mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-green-700">
              Donations Received 💰
            </h2>
            <button
              onClick={() => setShowDonations(!showDonations)}
              className="text-sm text-green-600 hover:underline"
            >
              {showDonations ? "Hide" : "Show"}
            </button>
          </div>

          {showDonations && (
            <table className="min-w-full text-sm text-gray-700 border">
              <thead className="bg-green-100 text-green-800">
                <tr>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Amount (₹)</th>
                  <th className="p-3 border">Message</th>
                  <th className="p-3 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {donations.length > 0 ? (
                  donations.map((d) => (
                    <tr key={d.id} className="text-center hover:bg-green-50">
                      <td className="p-2 border">{d.donorName}</td>
                      <td className="p-2 border">₹{d.amount}</td>
                      <td className="p-2 border">{d.message || "—"}</td>
                      <td className="p-2 border">
                        {d.createdAt?.toDate
                          ? d.createdAt.toDate().toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No donations recorded yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Admin Donations Section */}
        {userRole === "admin" && <AdminDonations donations={donations} />}

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={() => navigate("/admin-add-data")}
            className="bg-orange-600 text-white py-3 rounded-xl font-medium hover:bg-orange-700 transition"
          >
            ➕ Add / Update Data
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-700 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
          >
            👁️ View Public Dashboard
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition"
          >
            🔼 Back to Top
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
