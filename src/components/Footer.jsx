import React from "react";

function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-4 text-center mt-auto shadow-inner">
      <p className="text-sm">
        © {new Date().getFullYear()} Ek Mutthi Anaj. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
