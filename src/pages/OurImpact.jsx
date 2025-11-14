// src/pages/OurImpact.jsx
import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Users, Star, Award, Clock, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, delay },
});

const Stat = ({ Icon, value, label, suffix = "", delay = 0 }) => (
  <motion.div
    {...fadeUp(delay)}
    className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-lg transition"
  >
    <Icon className="w-10 h-10 text-primary mx-auto mb-3" />
    <div className="text-4xl font-extrabold text-secondary mb-1">
      <CountUp end={value} duration={2.2} separator="," />{suffix}
    </div>
    <div className="text-gray-600 text-sm md:text-base">{label}</div>
  </motion.div>
);

export default function OurImpact() {
  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {/* ✅ HERO SECTION */}
      <section
        className="relative h-[80vh] flex items-center justify-center bg-cover bg-center mt-[72px]"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/ourimpact.jpeg)`,
        }}
      >
        <div className="absolute inset-0 bg-black/0" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 md:px-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Our Impact
          </h1>
          <p className="text-base md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
            Together, we’re turning small handfuls into big change — feeding hope and dignity to families across Maharashtra.
          </p>
        </motion.div>
      </section>

      {/* ✅ STATS SECTION */}
      <section className="py-20 px-6 md:px-16 bg-gray-50">
        <motion.h2
          {...fadeUp()}
          className="text-3xl md:text-4xl font-bold text-primary text-center mb-12"
        >
          Numbers That Tell Our Story
        </motion.h2>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Stat Icon={Users} value={1200} label="Active Volunteers" delay={0.05} />
          <Stat Icon={Star} value={5000} label="Kg Grains Collected" suffix="+" delay={0.1} />
          <Stat Icon={Award} value={60} label="Societies Involved" suffix='+' delay={0.15} />
          <Stat Icon={Clock} value={8} label="Years of Service" suffix="+" delay={0.2} />
        </div>
      </section>

      {/* ✅ IMPACT STORY SECTION */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            src={`${process.env.PUBLIC_URL}/impactwork.jpeg`}
            alt="Impact Work"
            className="rounded-2xl shadow-lg object-cover w-full h-[350px]"
          />
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Making a Difference in Pune
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              What started in a few housing societies in Wakad has now expanded 
              across Pune — uniting thousands of families who believe in sharing 
              what they have to ensure no one sleeps hungry.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              With structured collection drives, transparent distribution systems, 
              and dedicated volunteers, Ek Mutthi Anaj continues to nourish lives 
              every single day.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ MILESTONES SECTION */}
      <section className="py-20 bg-gray-50 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
          Our Journey So Far
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              title: "The Beginning (2016)",
              desc: "Started with 4 societies in Pune — simple grain collections for local NGOs.",
              icon: "🌾",
            },
            {
              title: "Growing Network",
              desc: "Expanded to 60+ societies with 1200 active volunteers supporting daily operations.",
              icon: "🤝",
            },
            {
              title: "Future Vision",
              desc: "Aiming to connect with more orphanages and old age homes — spreading nourishment and kindness.",
              icon: "🚀",
            },
          ].map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition text-center"
            >
              <div className="text-4xl mb-4">{m.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {m.title}
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ QUOTE SECTION */}
      <section className="py-20 px-6 md:px-16 bg-white text-center">
        <motion.blockquote
          {...fadeUp(0.1)}
          className="max-w-3xl mx-auto bg-blue-50 p-10 rounded-2xl shadow-md border border-blue-100"
        >
          <p className="text-2xl md:text-3xl font-medium text-primary leading-relaxed mb-4">
            “Every handful shared is a step closer to a hunger-free tomorrow.”
          </p>
          <footer className="text-gray-600 flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-red-500" /> — Ek Mutthi Anaj Team
          </footer>
        </motion.blockquote>
      </section>

      {/* ✅ CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Help Us Grow This Impact
        </h2>
        <p className="text-gray-100 max-w-2xl mx-auto mb-8 text-base md:text-lg">
          Join our growing family of donors, volunteers, and changemakers.
          Together, we can ensure that no one goes to bed hungry — one handful at a time.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transition"
            >
              Get Involved
            </motion.button>
          </Link>
          <Link to="/what-we-do">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-transparent border border-white/70 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition"
            >
              Learn More
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}
