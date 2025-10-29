// src/pages/WhoWeAre.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Heart,
  Target,
  Globe,
  Leaf,
  CheckCircle,
} from "lucide-react";

const WhoWeAre = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* HERO SECTION */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 md:px-12 bg-gradient-to-b from-blue-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-blue-700 mb-4">
            Who We Are
          </h1>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            <b>Ek Mutthi Anaj</b> is an initiative built on compassion and
            purpose — to ensure that no one goes to bed hungry. We collect
            surplus grains from individuals, societies, and institutions, and
            distribute them to those who need them the most.
          </p>
          <p className="mt-6 text-gray-600 text-sm md:text-base">
            Together, we are building a cycle of sharing, dignity, and
            sustainability — one handful at a time. 🌾
          </p>
        </motion.div>
      </section>

      {/* OUR STORY */}
      <section className="py-16 px-6 md:px-20 text-center bg-white">
        <h2 className="text-3xl md:text-4xl font-semibold text-blue-700 mb-6">
          Our Story
        </h2>
        <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-base md:text-lg">
          What began as a small local effort to collect extra grains from homes
          has grown into a movement spanning cities. Today,{" "}
          <b>Ek Mutthi Anaj</b> connects donors, volunteers, and beneficiaries
          — ensuring that every contribution finds its way to a deserving plate.
        </p>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-blue-50 py-16 px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto text-center">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white shadow-md rounded-2xl p-8 border-t-4 border-blue-600"
          >
            <Target className="text-blue-600 w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              Our Mission
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              To build a hunger-free society by connecting surplus with need —
              making sure that no grain goes to waste and every meal reaches a
              hungry soul.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white shadow-md rounded-2xl p-8 border-t-4 border-blue-600"
          >
            <Globe className="text-blue-600 w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              Our Vision
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              A community where sharing is a way of life — where kindness
              replaces waste and empathy fuels lasting change.
            </p>
          </motion.div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="py-16 px-6 md:px-20 text-center bg-white">
        <h2 className="text-3xl md:text-4xl font-semibold text-blue-700 mb-10">
          Our Core Values
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 max-w-5xl mx-auto">
          {[
            { icon: Heart, title: "Compassion" },
            { icon: Leaf, title: "Sustainability" },
            { icon: Users, title: "Community" },
            { icon: CheckCircle, title: "Transparency" },
            { icon: Globe, title: "Service" },
            { icon: Target, title: "Commitment" },
          ].map((value, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-50 hover:bg-blue-100 transition p-6 md:p-8 rounded-2xl shadow-sm flex flex-col items-center"
            >
              <value.icon className="text-blue-600 w-10 h-10 mb-3" />
              <h4 className="font-semibold text-base md:text-lg text-gray-700">
                {value.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-500 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Our Impact</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto px-6">
          {[
            { number: "5000+", label: "Kg of Grains Collected" },
            { number: "20+", label: "Communities Supported" },
            { number: "1000+", label: "Volunteers Engaged" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 p-8 rounded-2xl shadow-md backdrop-blur-sm"
            >
              <h3 className="text-5xl font-bold mb-3">{stat.number}</h3>
              <p className="text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 px-6 md:px-20 text-center bg-blue-50">
        <h2 className="text-3xl md:text-4xl font-semibold text-blue-700 mb-4">
          Join the Movement
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-8 text-base md:text-lg">
          Every handful of grains matters. Be a part of the <b>Ek Mutthi Anaj</b> 
          movement — donate, volunteer, or spread awareness. Together, we can
          make sure no one goes hungry.
        </p>
        <a
          href="/contact"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium shadow-md transition inline-block"
        >
          Get Involved
        </a>
      </section>
    </div>
  );
};

export default WhoWeAre;
