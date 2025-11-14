// src/pages/SocietyDashboard.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ⬅️ added useNavigate
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const SocietyDashboard = () => {
  const { societyId } = useParams();
  const navigate = useNavigate(); // ⬅️ for redirect

  const [societyData, setSocietyData] = useState({
    name: "Loading...",
    location: "",
    joined: "",
  });

  const [formData, setFormData] = useState({
    grains: "",
    remarks: "",
  });

  const [pending, setPending] = useState([]);
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({
    totalDrives: 0,
    totalGrains: 0,
    familiesHelped: 0,
    lastUpdated: "-",
  });

  const [loading, setLoading] = useState(true);

  // 🔹 Set initial mock data for society
  useEffect(() => {
    setSocietyData({
      name: societyId.replace("-", " "),
      location: "Pune, Maharashtra",
      joined: "Jan 2024",
    });
  }, [societyId]);

  // 🔹 Get 3rd Sunday of the month
  function getThirdSunday(year, month) {
    const date = new Date(year, month, 1);
    let count = 0;
    while (date.getMonth() === month) {
      if (date.getDay() === 0) count++;
      if (count === 3) break;
      date.setDate(date.getDate() + 1);
    }
    return date;
  }

  // 🔹 Fetch Donations + Stats
  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRef = doc(db, "society_stats", societyId);
        const statsSnap = await getDoc(statsRef);

        if (!statsSnap.exists()) {
          await setDoc(statsRef, {
            totalGrains: 0,
            drivesParticipated: 0,
            familiesHelped: 0,
            lastUpdated: serverTimestamp(),
          });
        }

        const q = query(
          collection(db, "society_donations"),
          where("societyId", "==", societyId),
          orderBy("date", "desc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        const approved = data.filter((d) => d.status === "approved");
        const pendingData = data.filter((d) => d.status === "pending");

        const totalGrains = approved.reduce((sum, d) => sum + (d.amount || 0), 0);
        const totalDrives = approved.length;
        const familiesHelped = Math.floor(totalGrains / 20);

        setDonations(data);
        setPending(pendingData);

        setStats({
          totalDrives,
          totalGrains,
          familiesHelped,
          lastUpdated: new Date().toLocaleDateString(),
        });

        await updateDoc(statsRef, {
          totalGrains,
          drivesParticipated: totalDrives,
          familiesHelped,
          lastUpdated: serverTimestamp(),
        });
      } catch (err) {
        console.error("Error fetching society data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [societyId]);

  // 🔹 Handle Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.grains) return alert("Please enter the grain amount.");

    try {
      const today = new Date();
      const thirdSunday = getThirdSunday(today.getFullYear(), today.getMonth());

      await addDoc(collection(db, "society_donations"), {
        societyId,
        amount: Number(formData.grains),
        remarks: formData.remarks || "",
        status: "pending",
        date: serverTimestamp(),
        driveMonth: today.toLocaleString("default", { month: "short", year: "numeric" }),
        driveDate: thirdSunday.toISOString(),
      });

      alert("✅ Donation submitted for admin approval!");
      setFormData({ grains: "", remarks: "" });
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("❌ Something went wrong. Try again.");
    }
  };

  // 🔹 Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userRole");
    alert("You’ve been logged out successfully.");
    navigate("/dashboard"); // redirect to public dashboard
  };

  if (loading) {
    return <p className="text-center mt-20 text-gray-600">Loading data...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 relative">
      {/* 🔸 Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-[#e07b00] text-white px-4 py-2 rounded-lg hover:bg-[#c56b00] transition"
      >
        🚪 Logout
      </button>

      {/* HEADER */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#e07b00]">{societyData.name}</h1>
        <p className="text-gray-600">{societyData.location}</p>
        <p className="text-sm text-gray-500">Joined: {societyData.joined}</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total Drives", value: stats.totalDrives },
          { label: "Total Grains Donated", value: `${stats.totalGrains} kg` },
          { label: "Families Helped", value: stats.familiesHelped },
          { label: "Last Updated", value: stats.lastUpdated },
        ].map((item, i) => (
          <div key={i} className="bg-[#fff6e9] rounded-xl p-4 shadow text-center">
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-xl font-semibold text-[#5c4b36]">{item.value}</p>
          </div>
        ))}
      </div>

      {/* ADD DONATION FORM */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-[#e07b00]">
          Submit Current Drive Data
        </h2>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
          <input
            type="number"
            name="grains"
            value={formData.grains}
            onChange={handleChange}
            placeholder="Grains (in kg)"
            className="border rounded p-2"
            required
          />
          <input
            type="text"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Remarks (optional)"
            className="border rounded p-2"
          />
          <button
            type="submit"
            className="bg-[#e07b00] text-white py-2 rounded hover:bg-[#c56b00] transition"
          >
            ➕ Submit Donation
          </button>
        </form>
      </div>

      {/* PENDING TABLE */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-[#e07b00]">Pending Submissions</h2>
        <table className="w-full text-sm border">
          <thead className="bg-[#fff6e9]">
            <tr>
              <th className="p-2 text-left">Drive</th>
              <th className="p-2">Grains</th>
              <th className="p-2">Remarks</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {pending.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No pending submissions
                </td>
              </tr>
            ) : (
              pending.map((p, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{p.driveMonth}</td>
                  <td className="p-2">{p.amount} kg</td>
                  <td className="p-2">{p.remarks}</td>
                  <td className="p-2 text-yellow-600 font-medium">⏳ Pending</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* DONATION HISTORY */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#e07b00]">Donation History</h2>
        <table className="w-full text-sm border">
          <thead className="bg-[#fff6e9]">
            <tr>
              <th className="p-2">Drive</th>
              <th className="p-2">Grains</th>
              <th className="p-2">Status</th>
              <th className="p-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {donations.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No donations yet
                </td>
              </tr>
            ) : (
              donations.map((d, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{d.driveMonth}</td>
                  <td className="p-2">{d.amount} kg</td>
                  <td
                    className={`p-2 font-medium ${
                      d.status === "approved"
                        ? "text-green-600"
                        : d.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {d.status === "approved"
                      ? "✅ Approved"
                      : d.status === "rejected"
                      ? "❌ Rejected"
                      : "⏳ Pending"}
                  </td>
                  <td className="p-2">{d.remarks || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-center text-sm text-gray-500 mt-10">
        For support, contact{" "}
        <a href="mailto:ekmutthianaj@gmail.com" className="text-[#e07b00]">
          ekmutthianaj@gmail.com
        </a>
      </p>
    </div>
  );
};

export default SocietyDashboard;
