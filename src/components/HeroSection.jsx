import React from "react";

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[90vh] flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1608450540370-9a0f2a5d6ef4?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl font-bold mb-4">
          Every Grain Counts 🌾
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Ek Mutthi Anaj collects food grains from societies and distributes them to
          orphanages and old age homes — ensuring no plate goes empty.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-full font-semibold shadow-lg">
          Donate Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
