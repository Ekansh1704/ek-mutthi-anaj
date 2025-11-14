// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const links = [
    { name: "Who We Are", path: "/who-we-are" },
    { name: "What We Do", path: "/what-we-do" },
    { name: "Impact", path: "/impact" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FFF5E1]/95 backdrop-blur-md shadow-md border-b border-[#F8D29D]"
          : "bg-[#FFF5E1]/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-3 flex items-center justify-between">
        {/* 🌾 Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-11 w-11 sm:h-12 sm:w-12 bg-white rounded-full border border-[#F8D29D] flex items-center justify-center shadow-sm group-hover:shadow-md transition">
            <img
              src={`${process.env.PUBLIC_URL}/seva-logo.png`}
              alt="Ek Mutthi Anaj Logo"
              className="h-9 w-9 object-contain"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/48x48.png?text=E")
              }
            />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-wide text-[#C1440E] group-hover:text-[#A33108] transition-colors duration-300">
            Ek Mutthi Anaj
          </span>
        </Link>

        {/* 🧭 Desktop Menu */}
        <div className="hidden md:flex items-center space-x-7 lg:space-x-9 font-medium">
          {links.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative pb-1 tracking-wide transition-all duration-200 ${
                  isActive
                    ? "text-[#C1440E] font-semibold"
                    : "text-[#4B2E05] hover:text-[#C1440E]"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#C1440E] rounded-full transition-all duration-300" />
                )}
              </Link>
            );
          })}

          {/* 🎁 Buttons */}
          <div className="flex items-center space-x-3 ml-4">
            <Link
              to="/donate"
              className="bg-[#2E7D32] text-white px-5 py-2.5 rounded-full font-semibold shadow-md hover:bg-[#1B5E20] transition-all duration-300"
            >
              Donate
            </Link>
            <Link
              to="/volunteer"
              className="bg-[#E87400] text-white px-5 py-2.5 rounded-full font-semibold shadow-md hover:bg-[#C1440E] transition-all duration-300"
            >
              Volunteer
            </Link>
          </div>
        </div>

        {/* 📱 Mobile Menu Button */}
        <button
          className="md:hidden text-[#C1440E] hover:text-[#A33108] hover:scale-110 transition-transform duration-200"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* 📱 Mobile Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-[#FFF5E1]/95 backdrop-blur-md border-t border-[#F8D29D] shadow-lg`}
      >
        <div className="px-6 py-4 space-y-2 font-medium">
          {links.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block rounded-lg px-3 py-2 transition-all duration-150 ${
                  isActive
                    ? "bg-[#F8D29D] text-[#C1440E] font-semibold"
                    : "text-[#4B2E05] hover:bg-[#FFE2B3] hover:text-[#C1440E]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          <div className="flex flex-col space-y-3 mt-4">
            <Link
              to="/donate"
              onClick={() => setMenuOpen(false)}
              className="block text-center bg-[#2E7D32] text-white px-4 py-2.5 rounded-full font-semibold hover:bg-[#1B5E20] transition-all duration-300"
            >
              Donate
            </Link>
            <Link
              to="/volunteer"
              onClick={() => setMenuOpen(false)}
              className="block text-center bg-[#E87400] text-white px-4 py-2.5 rounded-full font-semibold hover:bg-[#C1440E] transition-all duration-300"
            >
              Volunteer
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
