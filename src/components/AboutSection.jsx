import React from "react";

const AboutSection = () => {
  const highlights = [
    {
      title: "Who We Are",
      text: "Ek Mutthi Anaj is a non-profit organization that collects grains from housing societies and distributes them to orphanages, old age homes, and other communities in need.",
      icon: "🌾",
    },
    {
      title: "Our Mission",
      text: "To ensure that no one goes to bed hungry by creating a simple and sustainable model for food donation and distribution.",
      icon: "🤝",
    },
    {
      title: "Our Impact",
      text: "Over 10,000 kg of grains collected and distributed to more than 30 institutions — all thanks to the support of our donors and volunteers.",
      icon: "📊",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">
          About <span className="text-blue-600">Us</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-semibold mb-3 text-blue-600">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
