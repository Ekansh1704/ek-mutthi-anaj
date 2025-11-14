// src/pages/AdminAddData.jsx
import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";

const AdminAddData = () => {
  // Form states
  const [month, setMonth] = useState("");
  const [collected, setCollected] = useState("");
  const [distributed, setDistributed] = useState("");
  const [rice, setRice] = useState("");
  const [wheat, setWheat] = useState("");
  const [pulses, setPulses] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // State for recent data
  const [recentEntries, setRecentEntries] = useState([]);

  // 🔹 Function to fetch recent entries
  const fetchRecentData = async () => {
    try {
      const q = query(collection(db, "monthlyData"), orderBy("timestamp", "desc"), limit(5));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      setRecentEntries(data);
    } catch (error) {
      console.error("Error fetching recent data:", error);
    }
  };

  useEffect(() => {
    fetchRecentData();
  }, []);

  // 🔹 Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!month || !collected || !distributed) {
      setMessage("❌ Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ monthlyData collection
      await addDoc(collection(db, "monthlyData"), {
        month,
        collected: Number(collected),
        distributed: Number(distributed),
        timestamp: new Date(),
      });

      // 2️⃣ stockData collection
      await addDoc(collection(db, "stockData"), {
        rice: Number(rice),
        wheat: Number(wheat),
        pulses: Number(pulses),
        totalStock: Number(rice) + Number(wheat) + Number(pulses),
        timestamp: new Date(),
      });

      // 3️⃣ recentCollections collection
      await addDoc(collection(db, "recentCollections"), {
        month,
        collected: Number(collected),
        distributed: Number(distributed),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      });

      // Reset form
      setMonth("");
      setCollected("");
      setDistributed("");
      setRice("");
      setWheat("");
      setPulses("");

      setMessage("✅ Data added successfully!");
      fetchRecentData();
    } catch (error) {
      console.error("Error adding data:", error);
      setMessage("❌ Error adding data. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout button handler
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/admin-login";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10 relative">
      {/* Logout */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Admin — Add Data to Firestore
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col gap-4 border border-gray-200"
      >
        {/* Monthly Data */}
        <h2 className="text-lg font-semibold text-green-700 mb-1">
          Monthly Collection
        </h2>

        <input
          type="text"
          placeholder="Month (e.g. October)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          required
        />
        <input
          type="number"
          placeholder="Collected (kg)"
          value={collected}
          onChange={(e) => setCollected(e.target.value)}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          required
        />
        <input
          type="number"
          placeholder="Distributed (kg)"
          value={distributed}
          onChange={(e) => setDistributed(e.target.value)}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          required
        />

        {/* Stock Data */}
        <h2 className="text-lg font-semibold text-green-700 mt-4 mb-1">
          Stock Composition
        </h2>

        <input
          type="number"
          placeholder="Rice (kg)"
          value={rice}
          onChange={(e) => setRice(e.target.value)}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
        <input
          type="number"
          placeholder="Wheat (kg)"
          value={wheat}
          onChange={(e) => setWheat(e.target.value)}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
        <input
          type="number"
          placeholder="Pulses (kg)"
          value={pulses}
          onChange={(e) => setPulses(e.target.value)}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:bg-green-400 font-medium"
        >
          {loading ? "Adding..." : "Add Data"}
        </button>
      </form>

      {/* Status Message */}
      {message && (
        <p
          className={`mt-4 text-sm font-medium ${
            message.includes("✅") ? "text-green-700" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      {/* Recent Entries */}
      <div className="mt-10 bg-white rounded-2xl shadow-md p-6 w-full max-w-2xl border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Entries
        </h2>
        {recentEntries.length === 0 ? (
          <p className="text-gray-500">No recent data yet.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-700">
                <th className="py-2 px-3">Month</th>
                <th className="py-2 px-3">Collected (kg)</th>
                <th className="py-2 px-3">Distributed (kg)</th>
              </tr>
            </thead>
            <tbody>
              {recentEntries.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3">{item.month}</td>
                  <td className="py-2 px-3">{item.collected}</td>
                  <td className="py-2 px-3">{item.distributed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminAddData;
