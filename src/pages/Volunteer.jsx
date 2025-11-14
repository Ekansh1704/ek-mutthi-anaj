// src/pages/Volunteer.jsx
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Section = ({ children, bg = "white" }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-20 px-6 sm:px-12 md:px-20 py-12 bg-${bg}`}
    >
      {children}
    </motion.section>
  );
};

const Volunteer = () => {
  const [volunteerCount, setVolunteerCount] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fetch volunteer count
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "volunteers"));
        setVolunteerCount(querySnapshot.size);
      } catch (error) {
        console.error("Error fetching volunteer count:", error);
      }
    };
    fetchVolunteers();
  }, []);

  // Handle input
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "volunteers"), {
        ...formData,
        timestamp: new Date(),
      });
      setFormData({ name: "", email: "", city: "", message: "" });
      setSuccess(true);

      const querySnapshot = await getDocs(collection(db, "volunteers"));
      setVolunteerCount(querySnapshot.size);

      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error("Error adding volunteer:", error);
      alert("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const stories = [
    {
      name: "Riya, 17",
      story:
        "Helped organize a collection drive that gathered 100kg of rice from her community.",
      image: "https://source.unsplash.com/400x400/?volunteer,girl",
    },
    {
      name: "Amit, 21",
      story:
        "Distributed meals to over 300 people during our Diwali Food Drive.",
      image: "https://source.unsplash.com/400x400/?volunteer,boy",
    },
    {
      name: "Sneha, 19",
      story:
        "Leads awareness campaigns in schools to promote zero food waste.",
      image: "https://source.unsplash.com/400x400/?smile,volunteer",
    },
  ];

  return (
    <div className="bg-white text-gray-800 min-h-screen pt-24 pb-16 overflow-x-hidden">
      {/* HERO SECTION */}
      <Section bg="white">
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            Join Hands, Spread Smiles 🌾
          </motion.h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Together, we can ensure that no grain goes to waste and no one
            sleeps hungry. Every hand that joins makes a difference.
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-xl font-semibold text-secondary"
          >
            🎉 {volunteerCount > 0 ? volunteerCount : "Many"} volunteers have
            already joined our cause!
          </motion.p>
        </div>
      </Section>

      {/* WHY VOLUNTEER */}
      <Section bg="gray-50">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          Why Volunteer With Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-center max-w-6xl mx-auto">
          {[
            {
              title: "💙 Real Impact",
              desc: "Be part of food distribution drives that bring meals directly to those who need them most.",
            },
            {
              title: "🤝 Community Spirit",
              desc: "Connect with like-minded people working towards the same goal — zero hunger.",
            },
            {
              title: "📊 Transparency",
              desc: "Track how your time and efforts contribute to real change across communities.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition text-center"
            >
              <h3 className="text-xl font-semibold text-primary mb-3">
                {item.title}
              </h3>
              <p className="text-gray-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* HOW YOU CAN HELP */}
      <Section bg="white">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          How You Can Help
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-center max-w-6xl mx-auto">
          {[
            {
              title: "🥖 Donate Food Grains",
              desc: "Contribute grains from your home or society collection drives.",
            },
            {
              title: "🚚 Join Drives",
              desc: "Be part of our regular food collection and distribution events.",
            },
            {
              title: "📣 Spread Awareness",
              desc: "Help us grow by sharing our mission with your community and online.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition text-center"
            >
              <h3 className="text-xl font-semibold text-primary mb-3">
                {item.title}
              </h3>
              <p className="text-gray-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FORM */}
      <Section bg="gray-50">
        <h2 className="text-3xl font-bold text-primary text-center mb-10">
          Volunteer With Us
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-md border border-gray-100"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 outline-none"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 outline-none"
            />
          </div>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City / Area"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 outline-none mb-6"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="How would you like to help?"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 outline-none mb-6"
          ></textarea>
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-secondary"
              } text-white font-semibold px-10 py-3 rounded-lg transition-all`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
          {success && (
            <p className="text-green-600 text-center mt-4 font-medium">
              ✅ Thank you for joining us! We’ll reach out soon.
            </p>
          )}
        </form>
      </Section>

      {/* STORIES */}
      <Section bg="white">
        <h2 className="text-3xl font-bold text-primary text-center mb-10">
          Real Stories from Real Volunteers
        </h2>
        <div className="overflow-x-auto flex gap-6 px-4 md:px-10 scrollbar-hide">
          {stories.map((person, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="min-w-[250px] bg-blue-50 rounded-2xl shadow-md p-6 text-center"
            >
              <img
                src={person.image}
                alt={person.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-sm"
              />
              <h4 className="text-lg font-semibold text-primary">
                {person.name}
              </h4>
              <p className="text-gray-700 text-sm mt-2">{person.story}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section bg="gray-50">
        <div className="text-center text-gray-700">
          <p>
            Prefer to talk? Reach us at{" "}
            <span className="text-primary font-semibold">
              ekmutthianaj@sevavardhini.org
            </span>{" "}
            or call{" "}
            <span className="text-primary font-semibold">077200 38233</span>
          </p>
        </div>
      </Section>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-primary to-secondary text-white text-center py-14 mt-20"
      >
        <p className="text-2xl font-semibold">
          🌱 Your time is as valuable as your donation — join our mission today.
        </p>
      </motion.div>
    </div>
  );
};

export default Volunteer;
