import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#fff6e9] text-[#5c4b36] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* --- Column 1: Logo + Description --- */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            {/* Logo Container (slightly larger with zoomed-out logo) */}
            <div className="h-16 w-16 flex items-center justify-center rounded-full bg-white border border-[#f3d6a0] shadow-sm overflow-hidden">
              <img
                src={`${process.env.PUBLIC_URL}/seva-logo.png`}
                alt="Ek Mutthi Anaj Logo"
                className="h-12 w-12 object-contain transform scale-[0.9]"
                style={{ objectPosition: "center" }}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/48x48.png?text=E")
                }
              />
            </div>
            <h2 className="text-xl font-bold text-[#e07b00] leading-tight">
              Ek Mutthi Anaj
            </h2>
          </div>

          <p className="text-sm leading-relaxed max-w-xs sm:max-w-sm">
            Together, we ensure no one goes to bed hungry. Every handful counts — 
            join us in spreading hope and kindness.
          </p>
        </div>

        {/* --- Column 2: Quick Links --- */}
        <div>
          <h3 className="text-lg font-semibold text-[#e07b00] mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/who-we-are" className="hover:text-[#ff8c00] transition">
                Who We Are
              </a>
            </li>
            <li>
              <a href="/what-we-do" className="hover:text-[#ff8c00] transition">
                What We Do
              </a>
            </li>
            <li>
              <a href="/impact" className="hover:text-[#ff8c00] transition">
                Impact
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-[#ff8c00] transition">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-[#ff8c00] transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* --- Column 3: Gallery --- */}
        <div>
          <h3 className="text-lg font-semibold text-[#e07b00] mb-3">
            Gallery
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              `${process.env.PUBLIC_URL}/gallery1.jpeg`,
              `${process.env.PUBLIC_URL}/gallery2.jpeg`,
              `${process.env.PUBLIC_URL}/gallery3.jpeg`,
              `${process.env.PUBLIC_URL}/gallery4.jpeg`,
              `${process.env.PUBLIC_URL}/gallery5.jpeg`,
              `${process.env.PUBLIC_URL}/gallery6.jpeg`,
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Gallery ${i + 1}`}
                className="h-16 w-full object-cover rounded-md hover:opacity-90 transition duration-200 ease-in-out"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/100x100.png?text=Image")
                }
              />
            ))}
          </div>
        </div>

        {/* --- Column 4: Stay Connected --- */}
        <div>
          <h3 className="text-lg font-semibold text-[#e07b00] mb-3">
            Stay Connected
          </h3>
          <p className="text-sm mb-3 leading-relaxed">
            390B, Narayan Peth, Dattadham, Rashtrabhasha Bhavan lane, Pune
            411030, India
          </p>
          <p className="text-sm mb-1">📞 +91 87675 29417</p>
          <p className="text-sm mb-3">✉️ ekmutthianaj@sevavardhini.org</p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <button
              className="hover:text-[#e07b00] transition"
              aria-label="Facebook link coming soon"
            >
              <Facebook size={18} />
            </button>
            <button
              className="hover:text-[#e07b00] transition"
              aria-label="Instagram link coming soon"
            >
              <Instagram size={18} />
            </button>
            <button
              className="hover:text-[#e07b00] transition"
              aria-label="Twitter link coming soon"
            >
              <Twitter size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className="border-t border-[#f1d7b0] py-4 text-center text-sm text-[#6b5b48]">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-[#e07b00]">Ek Mutthi Anaj</span> — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
