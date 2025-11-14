import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Loader2 } from "lucide-react";

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const q = query(collection(db, "donations"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDonations(data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const handleVerify = async (id) => {
    try {
      setVerifyingId(id);
      const donationRef = doc(db, "donations", id);
      await updateDoc(donationRef, { paymentStatus: "Verified ✅" });
      setDonations((prev) =>
        prev.map((donation) =>
          donation.id === id
            ? { ...donation, paymentStatus: "Verified ✅" }
            : donation
        )
      );
    } catch (error) {
      console.error("Error verifying donation:", error);
    } finally {
      setVerifyingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-600">
        <Loader2 className="animate-spin mr-2" /> Loading donations...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Donations</h2>

      {donations.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Donor</th>
                <th className="py-2 px-4 border-b text-left">Amount (₹)</th>
                <th className="py-2 px-4 border-b text-left">Message</th>
                <th className="py-2 px-4 border-b text-left">Date</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => {
                const date = donation.createdAt?.seconds
                  ? new Date(donation.createdAt.seconds * 1000).toLocaleDateString()
                  : "—";
                return (
                  <tr key={donation.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{donation.donorName}</td>
                    <td className="py-2 px-4 border-b">₹{donation.amount}</td>
                    <td className="py-2 px-4 border-b">
                      {donation.message || "—"}
                    </td>
                    <td className="py-2 px-4 border-b">{date}</td>
                    <td className="py-2 px-4 border-b text-sm text-gray-600">
                      {donation.paymentStatus || "Pending"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {donation.paymentStatus === "Verified ✅" ? (
                        <span className="text-green-600 font-semibold">Verified</span>
                      ) : (
                        <button
                          onClick={() => handleVerify(donation.id)}
                          disabled={verifyingId === donation.id}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-sm"
                        >
                          {verifyingId === donation.id ? "Verifying..." : "Verify"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No donations yet.</p>
      )}
    </div>
  );
};

export default AdminDonations;
