import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, Instagram, MessageCircle } from "lucide-react";
import { db } from "../firebaseConfig"; // ✅ Import your Firestore instance
import { collection, addDoc, Timestamp } from "firebase/firestore";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // success / error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name && formData.email && formData.message) {
      try {
        await addDoc(collection(db, "contactRequests"), {
          ...formData,
          createdAt: Timestamp.now(),
        });

        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } catch (error) {
        console.error("Error submitting form:", error);
        setStatus("error");
      }
    } else {
      setStatus("error");
    }

    setTimeout(() => setStatus(""), 4000);
  };

  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {/* ✅ HERO SECTION */}
      <section
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center mt-[72px]"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/contact-bg.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 md:px-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-base md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
            Have a question, want to collaborate, or volunteer with us?
            <br /> We’d love to hear from you!
          </p>
        </motion.div>
      </section>

      {/* ✅ CONTACT SECTION */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto items-stretch">
          {/* 🗺️ LEFT SIDE — MAP & DETAILS */}
          <motion.a
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            href="https://www.google.com/maps/place/Dattadham+Society/@18.51489,73.849292,14z/data=!4m6!3m5!1s0x3bc2c070dfea2f45:0x906a0adca12bc980!8m2!3d18.5148903!4d73.8492923!16s%2Fg%2F11c1qr6j_m?hl=en&entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="relative h-[400px] sm:h-[500px] md:h-auto rounded-3xl overflow-hidden shadow-lg block group"
          >
            <iframe
              title="Ek Mutthi Anaj Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.167489445424!2d77.1471762754933!3d28.6253622842356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1dbd2d72a9f1%3A0x3b4b8b0b4f9f1bcd!2sB-127A%2C%20B-Block%2C%20Vasant%20Kunj%20Enclave%2C%20New%20Delhi%2C%20Delhi%20110070!5e0!3m2!1sen!2sin!4v1698632456789!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full z-0 pointer-events-none"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-10 py-6 z-10 bg-black/10 group-hover:bg-black/30 transition">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black/70 mb-6 drop-shadow-md tracking-wide">
                Visit Us or Get in Touch
              </h2>

              <div className="space-y-6 text-gray-500 text-sm sm:text-base md:text-lg font-medium">
                <div className="flex items-start justify-center gap-3">
                  <Send size={20} className="text-amber-400 mt-1 flex-shrink-0" />
                  <p className="leading-snug">
                    390B, Narayan Peth, Dattadham, Rashtrabhasha Bhavan lane,
                    <br /> Pune 411030, India
                  </p>
                </div>

                <div className="flex items-start justify-center gap-3">
                  <Mail size={20} className="text-amber-400 mt-1 flex-shrink-0" />
                  <div className="leading-snug">
                    <p>ekmutthianaj@sevavardhini.org</p>
                    <p>www.ekmutthianaj.org</p>
                  </div>
                </div>

                <div className="flex items-start justify-center gap-3">
                  <Phone size={20} className="text-amber-400 mt-1 flex-shrink-0" />
                  <div className="leading-snug">
                    <p>020 - 24432606/ 24433606/ 24499606</p>
                    <p>+91 87675 29417</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.a>

          {/* ✉️ RIGHT SIDE — CONTACT FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center bg-[#FFF9F2] p-6 sm:p-8 md:p-10 lg:p-14 rounded-3xl shadow-md border border-orange-100"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#E07B00] mb-6 text-center md:text-left">
              Send Us a Message
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone No"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none mt-4 sm:mt-6"
              required
            ></textarea>

            {/* 🔸 Success/Error Message */}
            {status === "success" && (
              <p className="text-green-600 font-medium mt-4">
                ✅ Thank you! Your message has been sent.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 font-medium mt-4">
                ⚠️ Please fill all required fields or try again later.
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-[#FF8C00] to-[#E07B00] text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-200 mt-6"
            >
              Submit Now
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* ✅ CTA SECTION */}
      <section className="py-16 bg-gradient-to-r from-[#FF8C00] to-[#E07B00] text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Let’s Create Impact Together
        </h2>
        <p className="text-gray-100 max-w-2xl mx-auto mb-8 text-base md:text-lg">
          Every handful shared is a step closer to a hunger-free tomorrow.
        </p>
        <a
          href="/whatwedo"
          className="bg-white text-[#E07B00] px-8 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transition"
        >
          Explore What We Do
        </a>
      </section>

      {/* ✅ SOCIAL CONTACT STRIP */}
      <footer className="bg-[#FFF3E0] py-6 text-center">
        <div className="flex justify-center gap-8 mb-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E07B00] hover:text-[#FF8C00] transition"
          >
            <Instagram size={28} />
          </a>
          <a
            href="https://wa.me/919873800500"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E07B00] hover:text-[#FF8C00] transition"
          >
            <MessageCircle size={28} />
          </a>
          <a
            href="mailto:ekmutthianaj@sevavardhini.org"
            className="text-[#E07B00] hover:text-[#FF8C00] transition"
          >
            <Mail size={28} />
          </a>
        </div>
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} Ek Mutthi Anaj. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default ContactUs;
