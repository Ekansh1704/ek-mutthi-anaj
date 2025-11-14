// src/pages/WhatWeDo.jsx
import React from "react";
import { motion } from "framer-motion";

const WhatWeDo = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const testimonials = [
    {
      text: "This initiative has grown into a social revolution. Feeding over 700 people a day is just the beginning—we’re aiming to reach institutions across Maharashtra.",
      name: "— Vinod Patil",
    },
    {
      text: "An idea as small as a handful of grain has sparked tonnes of generosity. It’s proof of how collective empathy transforms into impact.",
      name: "— Abhay Baviskar",
    },
    {
      text: "Transparency is the foundation of trust. The committee’s commitment to ethical distribution has earned us the community’s deep respect.",
      name: "— Keshav Joshi",
    },
    {
      text: "From 4 societies to 21 in Wakad alone, the wave of participation shows this movement touches hearts.",
      name: "— Abhijeet Chaudhary",
    },
    {
      text: "Month after month, 32,000+ families join us in giving. The committee is inspired by their belief and moved to expand further.",
      name: "— Aniket Deshmukh",
    },
    {
      text: "Every collection feels like a celebration. It uplifts us and reminds our team what service truly means.",
      name: "— Prasad Padgavkar",
    },
  ];

  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {/* ✅ HERO SECTION */}
      <section
        className="relative h-[80vh] flex items-center justify-center bg-cover bg-center mt-[72px]"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/what-we-do-bg1.jpeg)`,
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 md:px-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            What We Do
          </h1>
          <p className="text-base md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
            Every grain counts. Every act of kindness matters. <br />
            Ek Mutthi Anaj bridges hearts through food and compassion.
          </p>
        </motion.div>
      </section>

      {/* 🌿 INTRODUCTION */}
      <section className="py-20 px-6 md:px-16 bg-gray-50">
        <motion.div
          variants={fadeUp}
          whileInView="visible"
          initial="hidden"
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-lg md:text-xl leading-relaxed text-gray-700">
            At <b>Ek Mutthi Anaj</b>, our purpose is simple yet powerful — to
            ensure that no one sleeps hungry. We collect surplus grains and food
            from individuals, communities, schools, and corporates, and
            redistribute them to those who need it the most — orphanages,
            old-age homes, and shelters.
          </p>
        </motion.div>
      </section>

      {/* 🔄 HOW IT WORKS */}
      <section className="py-20 px-6 md:px-16 bg-white text-center">
        <motion.h2
          variants={fadeUp}
          whileInView="visible"
          initial="hidden"
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-primary mb-12"
        >
          How It Works
        </motion.h2>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Collection",
              desc: "We collect surplus food grains through volunteers, local societies, and corporate drives.",
              img: `${process.env.PUBLIC_URL}/collection.jpeg`,
            },
            {
              title: "Sorting & Storage",
              desc: "Collected grains are cleaned, sorted, and stored hygienically by our team.",
              img: `${process.env.PUBLIC_URL}/sorting&storage1.jpeg`,
            },
            {
              title: "Distribution",
              desc: "Our volunteers deliver the grains to verified NGOs, orphanages, and old-age homes.",
              img: `${process.env.PUBLIC_URL}/distribution.jpeg`,
            },
            {
              title: "Nourishment",
              desc: "Every contribution helps ensure that families and children don’t go to bed hungry.",
              img: `${process.env.PUBLIC_URL}/nourishment1.jpeg`,
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileInView="visible"
              initial="hidden"
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-blue-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition text-center"
            >
              <img
                src={step.img}
                alt={step.title}
                className="rounded-xl mb-4 h-44 md:h-52 w-full object-cover"
              />
              <h3 className="text-xl font-semibold text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🤝 WHO CAN JOIN */}
      <section className="py-20 bg-gray-50 px-6 md:px-16">
        <motion.h2
          variants={fadeUp}
          whileInView="visible"
          initial="hidden"
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-primary text-center mb-12"
        >
          Who Can Join?
        </motion.h2>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Corporates",
              desc: "Partner with us through your CSR initiatives to create sustainable social impact.",
              img: `${process.env.PUBLIC_URL}/corporates.png`,
            },
            {
              title: "Schools",
              desc: "Help students learn empathy and responsibility through food donation drives.",
              img: `${process.env.PUBLIC_URL}/schools.png`,
            },
            {
              title: "Communities",
              desc: "Housing societies can set up collection bins to donate grains regularly.",
              img: `${process.env.PUBLIC_URL}/communities.jpeg`,
            },
            {
              title: "Individuals",
              desc: "Anyone can contribute a handful of grains and help feed someone in need.",
              img: `${process.env.PUBLIC_URL}/individuals.jpeg`,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileInView="visible"
              initial="hidden"
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-md border-2 border-primary/40"
              />
              <h3 className="text-xl font-semibold text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💬 TESTIMONIALS */}
      <section className="py-24 bg-white text-center px-6 md:px-16">
        <motion.h2
          variants={fadeUp}
          whileInView="visible"
          initial="hidden"
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-primary mb-12"
        >
          Voices of Change
        </motion.h2>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileInView="visible"
              initial="hidden"
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-50 p-6 rounded-2xl shadow-md text-left italic"
            >
              <p className="text-gray-700 mb-4">“{t.text}”</p>
              <p className="font-semibold text-primary">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🗺️ MAP SECTION */}
      <section className="py-24 bg-gray-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Spreading Nourishment Across Pune
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-10">
          From Kothrud to Hadapsar, from Shivajinagar to Wakad — our reach continues to expand across Pune.
          Every pin on the map marks a story of shared compassion.
        </p>
        <div className="max-w-4xl mx-auto">
          <img
            src={`${process.env.PUBLIC_URL}/Pune.png`}
            alt="Map of Maharashtra"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
      </section>

      {/* 📸 IN ACTION */}
      <section className="py-20 px-6 md:px-16 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">
          In Action
        </h2>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            `${process.env.PUBLIC_URL}/gallery1.jpeg`,
            `${process.env.PUBLIC_URL}/gallery2.jpeg`,
            `${process.env.PUBLIC_URL}/gallery3.jpeg`,
            `${process.env.PUBLIC_URL}/gallery4.jpeg`,
            `${process.env.PUBLIC_URL}/gallery5.jpeg`,
            `${process.env.PUBLIC_URL}/gallery6.jpeg`,
          ].map((src, i) => (
            <motion.img
              key={i}
              variants={fadeUp}
              whileInView="visible"
              initial="hidden"
              transition={{ duration: 0.6, delay: i * 0.1 }}
              src={src}
              alt={`Gallery ${i + 1}`}
              className="rounded-xl shadow-lg object-cover w-full h-64 hover:scale-105 transition"
            />
          ))}
        </div>
      </section>

      {/* 🌻 CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Join the Movement
        </h2>
        <p className="text-gray-100 max-w-2xl mx-auto mb-8">
          Together, we can ensure no one goes to bed hungry.{" "}
          <b>Be part of Ek Mutthi Anaj</b> — every handful counts.
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

export default WhatWeDo;
