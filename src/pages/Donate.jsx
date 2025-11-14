import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Loader2, CheckCircle } from "lucide-react";

export default function Donate() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDonate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "donations"), {
        name: name.trim() || "Anonymous",
        amount: parseInt(amount),
        message: message.trim(),
        date: new Date().toISOString(),
        status: "pending", // to update after Razorpay
      });

      setSuccess(true);
      setName("");
      setAmount("");
      setMessage("");
    } catch (error) {
      console.error("❌ Error adding donation:", error);
      alert("Something went wrong. Please try again!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-white pt-28 pb-16 px-6 flex flex-col items-center">
      {/* 🧡 Donation Form Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center border-t-4 border-[#FF8C00]">
        <h1 className="text-3xl font-bold mb-3 text-[#E07B00]">
          Support Ek Mutthi Anaj 🌾
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          Every handful shared is a step closer to a hunger-free tomorrow.
        </p>

        {!success ? (
          <form onSubmit={handleDonate} className="space-y-4 text-left">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Your Name (optional)
              </label>
              <input
                type="text"
                placeholder="Ekansh Chandak"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-[#FF8C00] outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Amount (₹)
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-[#FF8C00] outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Message (optional)
              </label>
              <textarea
                placeholder="Add a short note..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-[#FF8C00] outline-none"
                rows="3"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#E07B00] text-white w-full py-2.5 rounded-full font-medium hover:bg-[#cc6f00] flex items-center justify-center transition"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Saving...
                </>
              ) : (
                "Confirm Donation"
              )}
            </button>
          </form>
        ) : (
          <div className="text-[#E07B00] font-medium flex flex-col items-center">
            <CheckCircle className="h-10 w-10 text-green-600 mb-2" />
            <p>Thank you for your support! 🎉</p>
            <p className="text-gray-500 text-sm mt-1">
              (Payment integration coming soon)
            </p>
            <Link
              to="/"
              className="mt-5 text-[#E07B00] hover:underline text-sm font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        )}
      </div>

      {/* 🌾 Impact Section */}
      <div className="max-w-3xl mt-16 text-center">
        <h3 className="text-2xl font-semibold text-[#E07B00] mb-6">
          Your Impact 🌱
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 bg-white shadow-md rounded-xl border-t-4 border-[#FF8C00]">
            <h4 className="font-bold text-lg text-gray-800 mb-1">₹500</h4>
            <p className="text-gray-600 text-sm">Feeds a family for 3 days</p>
          </div>
          <div className="p-5 bg-white shadow-md rounded-xl border-t-4 border-[#FF8C00]">
            <h4 className="font-bold text-lg text-gray-800 mb-1">₹1000</h4>
            <p className="text-gray-600 text-sm">Supports 2 families for a week</p>
          </div>
          <div className="p-5 bg-white shadow-md rounded-xl border-t-4 border-[#FF8C00]">
            <h4 className="font-bold text-lg text-gray-800 mb-1">₹2500</h4>
            <p className="text-gray-600 text-sm">Funds a community food drive</p>
          </div>
        </div>
      </div>
    </div>
  );
}
