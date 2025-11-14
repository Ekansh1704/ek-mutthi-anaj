import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const DonationSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 px-6 py-12">
      <div className="bg-white shadow-xl rounded-3xl p-8 sm:p-10 max-w-lg text-center border-t-8 border-primary">
        <CheckCircle className="text-primary w-20 h-20 mx-auto mb-5" />
        <h1 className="text-3xl font-bold text-primary mb-3">
          Thank You for Your Kindness!
        </h1>
        <p className="text-gray-700 mb-8 leading-relaxed">
          Your donation brings us one step closer to eradicating hunger and spreading smiles.  
          Every grain counts 🌾
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-secondary transition duration-300 shadow-md"
          >
            Return to Home
          </Link>
          <Link
            to="/donate"
            className="border-2 border-primary text-primary px-6 py-3 rounded-xl font-medium hover:bg-orange-100 transition duration-300"
          >
            Make Another Donation
          </Link>
        </div>
      </div>

      <footer className="mt-10 text-center text-gray-600 text-sm">
        Together, we’re building a hunger-free tomorrow 🌍
      </footer>
    </div>
  );
};

export default DonationSuccess;
