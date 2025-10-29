import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Who We Are", path: "/who-we-are" },
    { name: "What We Do", path: "/what-we-do" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Analytics", path: "/analytics" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary shadow-md"
          : "bg-primary/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between">
        {/* ✅ Logo and Brand Name */}
        <Link
          to="/"
          className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
        >
          <div className="h-11 w-11 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
            <img
              src={`${process.env.PUBLIC_URL}/seva-logo1.png`}
              alt="Ek Mutthi Anaj Logo"
              className="h-9 w-9 object-contain"
              onError={(e) => {
                e.target.style.display = "none";
                console.error("❌ Image not found at /public/seva-logo1.png");
              }}
            />
          </div>
          <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide text-white">
            Ek Mutthi Anaj
          </span>
        </Link>

        {/* ✅ Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm lg:text-base font-medium">
          {links.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`transition-colors duration-200 ${
                location.pathname === item.path
                  ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                  : "text-white hover:text-yellow-200"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* ✅ Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none text-white hover:text-yellow-200 transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ✅ Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-primary/95`}
      >
        <div className="px-6 pb-4 pt-2 space-y-2 text-sm font-medium text-white">
          {links.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 rounded-lg px-2 transition-colors duration-150 ${
                location.pathname === item.path
                  ? "bg-yellow-400 text-blue-900 font-semibold"
                  : "hover:bg-blue-500 hover:text-yellow-100"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
