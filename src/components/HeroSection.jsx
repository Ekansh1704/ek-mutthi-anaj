import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="relative h-[85vh] flex items-center justify-center text-white mt-[72px] sm:mt-[76px] overflow-hidden"
    >
      {/* Background Image (Dummy for now) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1608450540370-9a0f2a5d6ef4?auto=format&fit=crop&w=1600&q=80')",
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 text-center px-6 sm:px-10"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-4 drop-shadow-lg">
          Every Grain Counts 🌾
        </h1>

        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-100 drop-shadow-md leading-relaxed">
          Ek Mutthi Anaj collects food grains from societies and distributes them
          to orphanages and old age homes — ensuring no plate goes empty.
        </p>

        <motion.a
          href="/Donate"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary hover:bg-secondary transition-all duration-300 px-8 py-3 rounded-full font-semibold shadow-medium text-white inline-block"
        >
          Donate Now
        </motion.a>
      </motion.div>

      {/* Decorative subtle grain texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] opacity-10"></div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 z-10 flex justify-center w-full"
      >
        <ChevronDown className="w-7 h-7 text-white opacity-80" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
