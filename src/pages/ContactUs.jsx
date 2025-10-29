// src/pages/Contact.jsx
import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h1 className="text-4xl font-semibold text-blue-600 mb-4">Contact Us</h1>
      <p className="text-gray-600 max-w-md mb-8">
        Have questions or want to collaborate with <b>Ek Mutthi Anaj</b>?
        We’d love to hear from you!
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <p className="text-gray-700 mb-2">
          📧 <b>Email:</b> info@sevaardhini.org
        </p>
        <p className="text-gray-700 mb-2">
          ☎️ <b>Phone:</b> +91-9876543210
        </p>
        <p className="text-gray-700">
          📍 <b>Address:</b> Pune, Maharashtra, India
        </p>
      </div>
    </div>
  );
};

export default Contact;
