import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white text-gray-800">
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 md:px-20 min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-blue-700 mb-6 leading-tight">
            Welcome to <span className="text-blue-800">Ek Mutthi Anaj 🌾</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-8 leading-relaxed">
            A movement driven by compassion — collecting grains from homes and
            distributing them to those in need. Together, we’re building a
            hunger-free community, one handful at a time.
          </p>

          <Link to="/who-we-are">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium shadow-md transition flex items-center gap-2 mx-auto"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* VALUES / FEATURES SECTION */}
      <section className="py-16 px-6 md:px-20 text-center bg-white">
        <h2 className="text-3xl font-semibold text-blue-700 mb-10">
          What Drives Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Heart,
              title: "Compassion",
              desc: "Caring for those in need and ensuring no one sleeps hungry.",
            },
            {
              icon: Leaf,
              title: "Sustainability",
              desc: "Reducing food waste and creating a cycle of sharing.",
            },
            {
              icon: ArrowRight,
              title: "Action",
              desc: "Turning small contributions into meaningful impact.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-blue-50 hover:bg-blue-100 transition p-8 rounded-2xl shadow-sm"
            >
              <item.icon className="text-blue-600 w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 px-6 md:px-20 text-center bg-blue-50">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-blue-700 mb-6"
        >
          Join the Movement
        </motion.h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-8">
          You can make a difference — donate grains, volunteer your time, or
          help us spread the word. Every small step creates a bigger impact.
        </p>
        <Link to="/contact-us">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium shadow-md transition"
          >
            Get Involved
          </motion.button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
