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
        isScrolled ? "bg-blue-700 shadow-md" : "bg-blue-700"
      }`}
    >
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
            <img
              src={`${process.env.PUBLIC_URL}/seva-logo1.png`}
              alt="Ek Mutthi Anaj Logo"
              className="h-10 w-10 object-contain"
              onError={(e) => {
                e.target.style.display = "none";
                console.error("❌ Image not found at /public/seva-logo1.png");
              }}
            />
          </div>
          <span className="text-xl md:text-2xl font-semibold tracking-wide text-white">
            Ek Mutthi Anaj
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          {links.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`transition-colors duration-200 ${
                location.pathname === item.path
                  ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                  : "hover:text-yellow-200 text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none text-white"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-blue-600 px-6 pb-4 space-y-2 text-sm font-medium text-white">
          {links.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 ${
                location.pathname === item.path
                  ? "text-yellow-300"
                  : "hover:text-yellow-200"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
