// src/pages/Analytics.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";

const Analytics = () => {
  const trendData = [
    { month: "Jan", collected: 320, distributed: 280 },
    { month: "Feb", collected: 400, distributed: 360 },
    { month: "Mar", collected: 450, distributed: 420 },
    { month: "Apr", collected: 480, distributed: 440 },
    { month: "May", collected: 520, distributed: 500 },
    { month: "Jun", collected: 610, distributed: 580 },
  ];

  const centerPerformance = [
    { center: "Vasant Kunj", collected: 120 },
    { center: "Dwarka", collected: 98 },
    { center: "Gurugram", collected: 145 },
    { center: "Noida", collected: 87 },
    { center: "Rohini", collected: 110 },
  ];

  const volunteerActivity = [
    { month: "Jan", active: 40 },
    { month: "Feb", active: 45 },
    { month: "Mar", active: 48 },
    { month: "Apr", active: 52 },
    { month: "May", active: 55 },
    { month: "Jun", active: 56 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pt-24 pb-16">
      {/* HEADER */}
      <section className="text-center px-4 sm:px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-3">
          Analytics Dashboard
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Gain insights into grain collection, distribution efficiency, and
          volunteer participation trends.
        </p>
      </section>

      {/* METRICS SECTION */}
      <section className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-12 px-4 sm:px-8">
        {[
          {
            title: "Avg. Monthly Growth",
            value: "+8.2%",
            color: "text-green-600",
            border: "border-green-100",
          },
          {
            title: "Top Performing Center",
            value: "Gurugram",
            color: "text-blue-600",
            border: "border-blue-100",
          },
          {
            title: "Total Impact",
            value: "4.3 Tons",
            color: "text-yellow-500",
            border: "border-yellow-100",
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`bg-white shadow-lg rounded-2xl w-72 max-w-[85vw] p-6 text-center border-2 ${item.border} hover:shadow-xl transform hover:scale-105 transition duration-300`}
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              {item.title}
            </h2>
            <p className={`text-4xl font-extrabold ${item.color}`}>
              {item.value}
            </p>
          </div>
        ))}
      </section>

      {/* CHARTS SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 max-w-7xl mx-auto mt-16 px-4 sm:px-8">
        {/* LINE CHART */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-t-4 border-blue-700">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-800 mb-5 text-center">
            Collection vs Distribution (6 Months)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "0.8rem" }} />
              <Line
                type="monotone"
                dataKey="collected"
                stroke="#2563eb"
                strokeWidth={3}
                name="Collected"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="distributed"
                stroke="#facc15"
                strokeWidth={3}
                name="Distributed"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-t-4 border-yellow-400">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-800 mb-5 text-center">
            Center-Wise Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={centerPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="center" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="collected" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* AREA CHART */}
      <section className="max-w-4xl mx-auto mt-16 px-4 sm:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-t-4 border-blue-700">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-800 mb-5 text-center">
            Volunteer Activity Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={volunteerActivity}>
              <defs>
                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#facc15" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="active"
                stroke="#facc15"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorActive)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default Analytics;
