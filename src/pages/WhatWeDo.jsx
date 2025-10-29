import React from "react";
import { motion } from "framer-motion";

const WhatWeDo = () => {
  return (
    <div className="bg-white text-gray-800">

      {/* HERO SECTION */}
      <section
        className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/what-we-do-bg.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            What We Do
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
            Every grain counts. Every act of kindness matters.  
            Ek Mutthi Anaj bridges hearts through food and compassion.
          </p>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-20 px-6 md:px-16 bg-gray-50">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            whileHover={{ scale: 1.02 }}
            src={`${process.env.PUBLIC_URL}/mission-team.png`}
            alt="Ek Mutthi Anaj Mission Team"
            className="rounded-3xl shadow-xl w-full h-auto object-cover"
          />
          <div>
            <h2 className="text-4xl font-bold text-blue-700 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ek Mutthi Anaj aims to ensure that no one sleeps hungry.  
              We collect small contributions of food grains from individuals, societies, and institutions, 
              and channel them towards orphanages, old-age homes, and shelters that need support.  
              Through our collective efforts, we bring the spirit of sharing to life.
            </p>
          </div>
        </div>
      </section>

      {/* HISTORY SECTION */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            whileHover={{ scale: 1.02 }}
            src={`${process.env.PUBLIC_URL}/history-img.png`}
            alt="History of Ek Mutthi Anaj"
            className="rounded-3xl shadow-lg w-full h-auto object-cover"
          />
          <div>
            <h2 className="text-4xl font-bold text-blue-700 mb-6">Our History</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              The Ek Mutthi Anaj campaign, launched in 2007, is a growing movement rooted in the spirit of compassion.  
              Traditionally, people in India would set aside a portion of their daily food or grain to feed a Fakir, Sadhu, Bhikshu, or even an animal that came to their doorstep.  
              Ek Mutthi Anaj brings back this timeless practice in a modern, organized way — partnering with schools, communities, and corporations to collect grains that are distributed to community kitchens and homes in need.
            </p>
          </div>
        </div>
      </section>

      {/* WHO ALL CAN JOIN IN */}
      <section className="py-20 bg-gray-50 px-6 md:px-16">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">
          Who All Can Join In?
        </h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {[
            {
              title: "Corporates",
              desc: "Corporates looking to invest in transparent CSR initiatives that guarantee a huge and direct impact on society.",
              img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "Schools",
              desc: "Schools mold future generations. Encouraging students to participate instills values of sharing and caring.",
              img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "Communities",
              desc: "Housing societies and local groups can organize drives to support those in need within their neighborhoods.",
              img: "https://images.unsplash.com/photo-1603570419874-32843e9b2fdb?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "Individuals",
              desc: "Every grain matters. Whether it’s one meal or one sack of grain — your contribution makes a difference.",
              img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-8 rounded-3xl shadow-md flex items-center gap-6"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-28 h-28 rounded-full object-cover shadow-md"
              />
              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-white px-6 md:px-16 text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-10">
          {[
            {
              title: "Collection",
              desc: "We gather grains from households and societies through our volunteers.",
              img: "https://images.unsplash.com/photo-1590080875833-50a94c41b223?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "Sorting & Storage",
              desc: "All collected grains are sorted, weighed, and stored systematically.",
              img: "https://images.unsplash.com/photo-1581092334440-4c06e1a8b3d3?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "Distribution",
              desc: "Our team distributes grains to partner NGOs, orphanages, and old-age homes.",
              img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "Nourishment",
              desc: "Thousands benefit from the meals made possible by collective generosity.",
              img: "https://images.unsplash.com/photo-1601050690597-df4a7f8cbf63?auto=format&fit=crop&w=800&q=80",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 rounded-2xl shadow-md p-6"
            >
              <img
                src={step.img}
                alt={step.title}
                className="rounded-xl mb-4 h-48 w-full object-cover"
              />
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-500 text-white text-center">
        <h2 className="text-4xl font-bold mb-10">Our Impact</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
            { number: "5000+", label: "Kg Grains Collected" },
            { number: "20+", label: "Homes & Orphanages Supported" },
            { number: "1000+", label: "Volunteers Engaged" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="bg-white/10 p-8 rounded-2xl shadow-md backdrop-blur-md"
            >
              <h3 className="text-5xl font-bold mb-3">{stat.number}</h3>
              <p className="text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-20 px-6 md:px-16 bg-gray-50">
        <h2 className="text-4xl font-bold text-blue-700 text-center mb-12">
          Moments of Service
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1526318472351-bc6c2cb12c7c?auto=format&fit=crop&w=800&q=80",
          ].map((img, i) => (
            <motion.img
              key={i}
              whileHover={{ scale: 1.05 }}
              src={img}
              alt="Gallery"
              className="rounded-2xl shadow-md object-cover h-64 w-full"
            />
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 bg-blue-700 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Join Us in Making a Difference
        </h2>
        <p className="text-gray-100 mb-8 max-w-2xl mx-auto">
          Together, we can make sure no one goes to bed hungry.  
          Be part of the Ek Mutthi Anaj movement today.
        </p>
        <a
          href="/contact"
          className="px-8 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-full shadow-md hover:bg-yellow-300 transition"
        >
          Get Involved
        </a>
      </section>
    </div>
  );
};

export default WhatWeDo;
