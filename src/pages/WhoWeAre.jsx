// src/pages/WhoWeAre.jsx
import React from "react";
import { motion } from "framer-motion";

const WhoWeAre = () => {
  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {/* ✅ HERO SECTION */}
      <section
        className="relative h-[80vh] flex items-center justify-center bg-cover bg-center mt-[68px] md:mt-[72px]"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/mission-team.png)`,
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
            Who We Are
          </h1>
          <p className="text-base md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
            Ek Mutthi Anaj is a collective of kind hearts who believe that no act of giving is too small. 
            Every handful of grain shared brings someone hope, dignity, and a meal.
          </p>
        </motion.div>
      </section>

      {/* ✅ OUR STORY SECTION */}
      <section className="py-20 px-6 md:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            src={`${process.env.PUBLIC_URL}/ourstory.jpeg`}
            alt="Our Story"
            className="rounded-2xl shadow-lg object-cover w-full h-[350px]"
          />
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Our Story
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              <b>Ek Mutthi Anaj</b> began with a humble yet powerful act — 
              families offering a handful of grains from their kitchens to feed children in need. 
              What started as one small gesture in Pune has blossomed into a movement 
              that now provides food and dignity to hundreds of children and families every day.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Over the years, our community of volunteers and donors has grown across cities, 
              driven by a shared mission: to ensure no one sleeps hungry. 
              Rooted in compassion and transparency, we strive to turn empathy into sustainable action — 
              one handful at a time.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ OUR VALUES SECTION */}
      <section className="py-20 bg-white px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
          Our Core Values
        </h2>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Compassion",
              desc: "We believe kindness is the strongest catalyst for change — one handful, one meal, one life at a time.",
              icon: "❤️",
            },
            {
              title: "Transparency",
              desc: "Every donation, every grain, and every meal is documented to ensure it reaches those who need it most.",
              icon: "🔍",
            },
            {
              title: "Community",
              desc: "Our strength lies in togetherness — uniting volunteers, families, and donors in the shared mission of feeding hope.",
              icon: "🤝",
            },
            {
              title: "Sustainability",
              desc: "We promote long-term food security by encouraging mindful sharing and reducing food wastage.",
              icon: "🌾",
            },
          ].map((value, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition text-center"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {value.title}
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ MEET THE TEAM SECTION */}
      <section className="py-20 bg-gray-50 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
          Meet the Team
        </h2>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {[
            {
              name: "Vinod Patil",
              role: "Founder & Visionary",
              img: "og-img.png",
            },
            {
              name: "Ananya Patel",
              role: "Operations & Logistics",
              img: "og-img.png",
            },
            {
              name: "Karan Mehta",
              role: "Community Engagement Lead",
              img: "og-img.png",
            },
            {
              name: "Sneha Rao",
              role: "Volunteer Coordinator",
              img: "og-img.png",
            },
          ].map((person, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition text-center"
            >
              <img
                src={person.img}
                alt={person.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover shadow-md"
              />
              <h3 className="text-lg font-semibold text-primary">
                {person.name}
              </h3>
              <p className="text-gray-600 text-sm">{person.role}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-gray-700 mt-12 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
          Behind Ek Mutthi Anaj is a growing family of volunteers and changemakers who dedicate their time and hearts 
          to serving others. From collection drives to meal distributions, each person plays a vital role in 
          transforming compassion into action.
        </p>
      </section>

      {/* ✅ CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Making a Difference, One Handful at a Time!
        </h2>
        <p className="text-gray-100 max-w-2xl mx-auto mb-8 text-base md:text-lg">
          Join our growing family of volunteers, donors, and changemakers.
          Together, we can ensure that no one goes to bed hungry — one handful at a time.
        </p>
        <a
          href="/contact"
          className="bg-white text-primary px-8 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transition"
        >
          Get Involved
        </a>
      </section>
    </div>
  );
};

export default WhoWeAre;
