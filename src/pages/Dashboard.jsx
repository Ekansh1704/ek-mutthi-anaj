// src/pages/Dashboard.js
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const monthlyData = [
    { month: "Jan", collected: 320, distributed: 280 },
    { month: "Feb", collected: 400, distributed: 360 },
    { month: "Mar", collected: 450, distributed: 420 },
    { month: "Apr", collected: 480, distributed: 440 },
    { month: "May", collected: 520, distributed: 500 },
    { month: "Jun", collected: 610, distributed: 580 },
  ];

  const stockData = [
    { name: "Rice", value: 45 },
    { name: "Wheat", value: 30 },
    { name: "Pulses", value: 15 },
    { name: "Other", value: 10 },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#facc15", "#ef4444"];

  const recentCollections = [
    { id: 1, location: "Vasant Kunj", amount: "120 kg", date: "Oct 12, 2025" },
    { id: 2, location: "Dwarka", amount: "98 kg", date: "Oct 15, 2025" },
    { id: 3, location: "Gurugram", amount: "145 kg", date: "Oct 20, 2025" },
    { id: 4, location: "Noida", amount: "87 kg", date: "Oct 23, 2025" },
  ];

  return (
    <div className="bg-white min-h-screen text-gray-800 pt-24 pb-20">
      {/* HEADER */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 text-base max-w-2xl mx-auto">
          View live data about food grain collections, distributions, and stock
          levels across centers.
        </p>
      </section>

      {/* STATS CARDS */}
      <section className="flex flex-wrap justify-center gap-8 mt-10 px-6">
        <div className="bg-white shadow-md rounded-2xl w-80 p-6 text-center border border-gray-100 hover:shadow-lg transition-all">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Total Grains Collected
          </h2>
          <p className="text-3xl font-extrabold text-green-500 tracking-wide">
            2,345 kg
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl w-80 p-6 text-center border border-gray-100 hover:shadow-lg transition-all">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Centers Supported
          </h2>
          <p className="text-3xl font-extrabold text-blue-600 tracking-wide">
            18
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl w-80 p-6 text-center border border-gray-100 hover:shadow-lg transition-all">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Volunteers Active
          </h2>
          <p className="text-3xl font-extrabold text-yellow-500 tracking-wide">
            56
          </p>
        </div>
      </section>

      {/* CHARTS */}
      <section className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto mt-16 px-6">
        {/* Bar Chart */}
        <div className="bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Monthly Grain Collection vs Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="collected" fill="#22c55e" name="Collected" />
              <Bar dataKey="distributed" fill="#3b82f6" name="Distributed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Growth in Grain Collection
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="collected"
                stroke="#ef4444"
                strokeWidth={3}
                name="Collected"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* PIE + TABLE */}
      <section className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto mt-16 px-6">
        <div className="bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Current Stock Composition
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stockData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {stockData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Recent Collections
          </h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-3 rounded-tl-lg">Location</th>
                <th className="py-2 px-3">Amount</th>
                <th className="py-2 px-3 rounded-tr-lg">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentCollections.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-100 transition"
                >
                  <td className="py-3 px-3">{item.location}</td>
                  <td className="py-3 px-3 font-medium text-green-600">
                    {item.amount}
                  </td>
                  <td className="py-3 px-3 text-gray-600">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
