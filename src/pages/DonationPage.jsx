import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const DonationPage = () => {
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDonation = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate Razorpay (for now)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      await addDoc(collection(db, "donations"), {
        donorName,
        amount: Number(amount),
        message,
        paymentStatus: "Simulated - Awaiting Razorpay Integration",
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/donation-success";
      }, 1200);
    } catch (error) {
      console.error("Error adding donation:", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-white flex flex-col items-center justify-center py-12 px-4">
      {/* Header / Intro Section */}
      <div className="max-w-2xl text-center mb-10">
        <h1 className="text-4xl font-bold text-[#E07B00] mb-3">Make a Difference Today 🌾</h1>
        <p className="text-gray-700 text-lg">
          Your contribution helps bring food security to families in need.  
          Every rupee counts — together, we can create lasting impact.
        </p>
      </div>

      {/* Donation Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg border-t-4 border-[#FF8C00]">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#E07B00]">
          Donate Now
        </h2>

        {success ? (
          <p className="text-green-600 text-center text-lg font-medium mb-3">
            ✅ Thank you! Your donation has been recorded.
          </p>
        ) : (
          <form onSubmit={handleDonation}>
            <label className="block mb-2 text-gray-700 font-medium">
              Your Name
            </label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              required
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-[#FF8C00] outline-none"
            />

            <label className="block mb-2 text-gray-700 font-medium">
              Amount (₹)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="Enter donation amount"
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-[#FF8C00] outline-none"
            />

            <label className="block mb-2 text-gray-700 font-medium">
              Message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message of hope..."
              className="w-full border border-gray-300 rounded-lg p-3 mb-6 h-24 resize-none focus:ring-2 focus:ring-[#FF8C00] outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-[#E07B00] text-white py-3 px-4 rounded-xl w-full text-lg font-medium hover:bg-[#cc6f00] transition"
            >
              {loading ? "Processing..." : "Donate Securely"}
            </button>
          </form>
        )}
      </div>

      {/* Impact Section */}
      <div className="max-w-4xl mt-16 text-center">
        <h3 className="text-2xl font-semibold text-[#E07B00] mb-4">
          Every Donation Counts 💛
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 bg-white shadow-md rounded-xl border-t-4 border-[#FF8C00]">
            <h4 className="font-bold text-lg text-gray-800 mb-2">₹500</h4>
            <p className="text-gray-600">Feeds a family for 3 days</p>
          </div>
          <div className="p-5 bg-white shadow-md rounded-xl border-t-4 border-[#FF8C00]">
            <h4 className="font-bold text-lg text-gray-800 mb-2">₹1000</h4>
            <p className="text-gray-600">Provides monthly grains to 2 families</p>
          </div>
          <div className="p-5 bg-white shadow-md rounded-xl border-t-4 border-[#FF8C00]">
            <h4 className="font-bold text-lg text-gray-800 mb-2">₹2500</h4>
            <p className="text-gray-600">Supports community food drives</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
