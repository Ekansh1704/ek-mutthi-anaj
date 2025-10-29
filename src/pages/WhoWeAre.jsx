import React from "react";
import { motion } from "framer-motion";
import { Users, Heart, Target, Globe, Leaf, CheckCircle } from "lucide-react";

const WhoWeAre = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* HERO SECTION */}
      <section className="min-h-[70vh] bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl font-bold text-blue-700 mb-6">Who We Are</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            <b>Ek Mutthi Anaj</b> is an initiative driven by compassion and
            purpose — to ensure that no one goes to bed hungry. We collect
            surplus grains from societies, individuals, and institutions, and
            distribute them responsibly to old age homes, orphanages, and
            communities in need.
          </p>
          <p className="mt-6 text-gray-600 text-md">
            Together, we’re building a cycle of sharing, dignity, and
            sustainability — one handful at a time. 🌾
          </p>
        </motion.div>
      </section>

      {/* OUR STORY */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">
          Our Story
        </h2>
        <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
          What began as a small neighborhood effort to collect extra grains from
          homes has blossomed into a city-wide mission to combat hunger. Today,
          <b> Ek Mutthi Anaj</b> connects donors and volunteers to orphanages,
          old age homes, and communities that need support the most.
        </p>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-blue-50 py-16 px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto text-center">
          <div className="bg-white shadow-lg rounded-2xl p-8 border-t-4 border-blue-600">
            <Target className="text-blue-600 w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To create a hunger-free society by connecting surplus with
              scarcity — ensuring that every meal reaches a plate that needs it.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-8 border-t-4 border-blue-600">
            <Globe className="text-blue-600 w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
            <p className="text-gray-600">
              A community where sharing food is second nature — where kindness
              replaces waste and compassion fuels change.
            </p>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-semibold text-blue-700 mb-10">
          Our Core Values
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-blue-50 hover:bg-blue-100 transition p-6 rounded-xl shadow-sm"
            >
              <value.icon className="text-blue-600 w-10 h-10 mx-auto mb-3" />
              <h4 className="font-semibold text-lg text-gray-700">
                {value.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 px-6 md:px-20 text-center bg-blue-50">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">
          Join the Movement
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-8">
          Every handful of grains counts. Be a part of the movement — donate,
          volunteer, or spread the message. Together, we can make sure no one
          sleeps hungry.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium shadow-md transition">
          Get Involved
        </button>
      </section>
    </div>
  );
};

export default WhoWeAre;
