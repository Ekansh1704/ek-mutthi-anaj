import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      title: "1. Collection of Grains",
      description:
        "Residents of housing societies donate small portions of grains every week — a handful from each home makes a big difference.",
      icon: "🏠",
    },
    {
      title: "2. Sorting & Storage",
      description:
        "The grains are collected, sorted, and stored at our centers to ensure quality and readiness for distribution.",
      icon: "🏗️",
    },
    {
      title: "3. Distribution to Homes",
      description:
        "Volunteers deliver the grains to orphanages, old-age homes, and shelters — ensuring they reach those who need them most.",
      icon: "🚚",
    },
    {
      title: "4. Feeding Smiles",
      description:
        "Thousands of people get access to meals through this simple act of sharing — one handful at a time.",
      icon: "😊",
    },
  ];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Create line animation that grows as you scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16 text-center text-gray-800"
        >
          How <span className="text-blue-600">It Works</span>
        </motion.h2>

        <div className="relative flex flex-col md:flex-row md:justify-between md:items-start">
          {/* Timeline Line (Animated) */}
          <div className="absolute left-5 md:left-1/2 top-0 w-1 bg-gray-200 md:w-full md:h-1 md:top-1/2 md:left-0">
            <motion.div
              className="absolute bg-blue-500 w-1 md:h-1 md:w-full origin-top md:origin-left"
              style={{
                height: lineHeight,
                scaleX: lineHeight,
              }}
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative pl-12 md:pl-0 md:w-1/4 md:text-center mb-12 md:mb-0"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white text-xl rounded-full shadow-md absolute left-0 md:static">
                {step.icon}
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
