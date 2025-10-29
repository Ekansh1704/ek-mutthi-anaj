import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* HERO SECTION */}
      <section
        className="relative h-[60vh] sm:h-[70vh] md:h-[85vh] flex items-center justify-center bg-cover bg-center mt-[72px]"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/contact-bg.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 sm:px-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-100">
            Volunteer with us or just drop a message — we’d love to hear from you!
          </p>
        </motion.div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-white">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto items-stretch">
          {/* LEFT SIDE — MAP */}
          <motion.a
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            href="https://goo.gl/maps/4pZVZqTBRb7BVDtq6"
            target="_blank"
            rel="noopener noreferrer"
            className="relative h-[400px] sm:h-[500px] md:h-auto rounded-3xl overflow-hidden shadow-md block group"
          >
            <iframe
              title="Ek Mutthi Anaj Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.167489445424!2d77.1471762754933!3d28.6253622842356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1dbd2d72a9f1%3A0x3b4b8b0b4f9f1bcd!2sB-127A%2C%20B-Block%2C%20Vasant%20Kunj%20Enclave%2C%20New%20Delhi%2C%20Delhi%20110070!5e0!3m2!1sen!2sin!4v1698632456789!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full z-0 pointer-events-none"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>

            {/* Floating Info */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-8 py-6 z-10 bg-transparent group-hover:bg-white/10 transition">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A3FC1] mb-6 drop-shadow-md tracking-wide">
                Visit Us or Get in Touch
              </h2>

              <div className="space-y-6 text-gray-900 text-sm sm:text-base md:text-lg font-semibold">
                <div className="flex items-start justify-center gap-3">
                  <Send size={20} className="text-red-500 mt-1 flex-shrink-0" />
                  <p className="leading-snug font-medium">
                    B-127A, B-Block, Vasant Kunj Enclave,
                    <br /> New Delhi 110070, India
                  </p>
                </div>

                <div className="flex items-start justify-center gap-3">
                  <Mail size={20} className="text-red-500 mt-1 flex-shrink-0" />
                  <div className="leading-snug font-medium">
                    <p>info@ekmutthianaj.org</p>
                    <p>www.ekmutthianaj.org</p>
                  </div>
                </div>

                <div className="flex items-start justify-center gap-3">
                  <Phone size={20} className="text-red-500 mt-1 flex-shrink-0" />
                  <div className="leading-snug font-medium">
                    <p>011 26898844, 26898866</p>
                    <p>+91 9873800500</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.a>

          {/* RIGHT SIDE — FORM */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center bg-gray-100 p-6 sm:p-8 md:p-10 lg:p-14 rounded-3xl shadow-md"
          >
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
              <input
                type="text"
                placeholder="Phone No"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            <textarea
              placeholder="Message"
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none mt-4 sm:mt-6"
              required
            ></textarea>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition duration-200 mt-6"
            >
              Submit Now
            </motion.button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
