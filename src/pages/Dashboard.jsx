// src/pages/Dashboard.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Loader2 } from "lucide-react";

// leaflet icon fix for many bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const COLORS = ["#4b6043", "#FF8C00", "#E07B00", "#A55EEA", "#FF6B6B", "#00C49F"];

/**
 * Dashboard for Ek Mutthi Anaj - Public view
 * - Keeps your structure and data expectations
 * - Adds Community Portal button
 * - Adds subtle Framer Motion fade-in animations for UI polish
 *
 * Firestore expectations (flexible):
 * - collections collection: { quantity, area, partner, societyName, timestamp, lat?, lng? }
 * - partners collection (optional): { name, lat?, lng? }
 * - volunteers collection (optional): one doc per volunteer OR meta doc with count
 */

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  // main data buckets
  const [collectionDocs, setCollectionDocs] = useState([]); // raw docs
  const [partnersList, setPartnersList] = useState([]); // partner names
  const [volunteerCount, setVolunteerCount] = useState(null); // number or null

  // derived datasets
  const [monthlyData, setMonthlyData] = useState([]); // [{ month: 'Jan', collected: 123 }]
  const [areaData, setAreaData] = useState([]); // [{ name: 'Kothrud', value: 120 }]
  const [topSocieties, setTopSocieties] = useState([]); // [{ name, kg }]
  const [latestDonation, setLatestDonation] = useState(null); // latest collection doc

  // animated counters
  const [displayTotal, setDisplayTotal] = useState(0);
  const [displayPartnersCount, setDisplayPartnersCount] = useState(0);
  const [displayNGOsCount, setDisplayNGOsCount] = useState(0);
  const [displayVolunteers, setDisplayVolunteers] = useState(0);

  // area -> coords fallback map (Pune)
  const AREA_COORDS = {
    Kothrud: [18.4841, 73.839],
    Hinjewadi: [18.5975, 73.7314],
    Wakad: [18.5943, 73.7647],
    Aundh: [18.5544, 73.8129],
    "Pimple Saudagar": [18.5984, 73.7806],
    Hadapsar: [18.5061, 73.9333],
    "Koregaon Park": [18.5427, 73.9145],
    Bavdhan: [18.5187, 73.7992],
    Baner: [18.5635, 73.7883],
    Shivajinagar: [18.5204, 73.8567],
  };

  // helper: simple count-up animation (no external lib)
  const animateCount = (target, setter, ms = 700) => {
    if (!target || target === 0) {
      setter(0);
      return;
    }
    const steps = 30;
    const stepTime = Math.max(10, Math.round(ms / steps));
    const increment = target / steps;
    let current = 0;
    let i = 0;
    const t = setInterval(() => {
      i++;
      current += increment;
      if (i >= steps) {
        setter(Math.round(target));
        clearInterval(t);
      } else {
        setter(Math.round(current));
      }
    }, stepTime);
  };

  // fetch Firestore data
  useEffect(() => {
    const fetchAll = async () => {
      try {
        // collections
        const colRef = collection(db, "collections");
        const colSnap = await getDocs(query(colRef, orderBy("timestamp", "desc")));
        const docs = [];
        colSnap.forEach((d) => docs.push({ id: d.id, ...d.data() }));

        // partners (optional)
        const partnersRef = collection(db, "partners");
        let partners = [];
        try {
          const pSnap = await getDocs(partnersRef);
          const setP = new Set();
          pSnap.forEach((p) => {
            const data = p.data();
            const name = data.name || p.id;
            setP.add(name);
          });
          partners = Array.from(setP);
        } catch (err) {
          partners = [];
        }

        // volunteers (optional)
        let volunteers = null;
        try {
          const volRef = collection(db, "volunteers");
          const vSnap = await getDocs(volRef);
          if (!vSnap.empty) volunteers = vSnap.size;
          else volunteers = null;
        } catch (err) {
          volunteers = null;
        }

        setCollectionDocs(docs);
        setPartnersList(partners);
        setVolunteerCount(volunteers);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // derive totals, monthly, area and top societies whenever collectionDocs updates
  useEffect(() => {
    if (!collectionDocs || collectionDocs.length === 0) {
      setMonthlyData([]);
      setAreaData([]);
      setTopSocieties([]);
      setLatestDonation(null);

      animateCount(0, setDisplayTotal);
      animateCount(partnersList.length || 0, setDisplayPartnersCount);
      animateCount(partnersList.length || 0, setDisplayNGOsCount);
      animateCount(volunteerCount || 0, setDisplayVolunteers);
      return;
    }

    let total = 0;
    const monthlyMap = {};
    const areaMap = {};
    const societyMap = {};

    const latest = collectionDocs[0];

    collectionDocs.forEach((doc) => {
      const qty = parseFloat(doc.quantity || doc.quantityKg || doc.qty || 0) || 0;
      total += qty;

      // month label
      let monthLabel = "Unknown";
      if (doc.timestamp && doc.timestamp.seconds) {
        const d = new Date(doc.timestamp.seconds * 1000);
        const month = d.toLocaleString("default", { month: "short" });
        const year = d.getFullYear();
        monthLabel = `${month} ${String(year).slice(-2)}`;
      } else if (doc.month) {
        monthLabel = doc.month;
      }
      monthlyMap[monthLabel] = (monthlyMap[monthLabel] || 0) + qty;

      const area = (doc.area || doc.locality || "Unknown Area").trim();
      areaMap[area] = (areaMap[area] || 0) + qty;

      const society = (doc.societyName || doc.society || "Unknown Society").trim();
      societyMap[society] = (societyMap[society] || 0) + qty;
    });

    const monthlyArr = Object.keys(monthlyMap).map((k) => ({
      month: k,
      collected: Math.round(monthlyMap[k]),
    }));

    const areaArr = Object.keys(areaMap).map((k) => ({
      name: k,
      value: Math.round(areaMap[k]),
    }));

    const societies = Object.keys(societyMap)
      .map((k) => ({ name: k, kg: Math.round(societyMap[k]) }))
      .sort((a, b) => b.kg - a.kg)
      .slice(0, 5);

    setMonthlyData(monthlyArr);
    setAreaData(areaArr);
    setTopSocieties(societies);
    setLatestDonation(latest);

    animateCount(total, setDisplayTotal);
    animateCount(partnersList.length || 0, setDisplayPartnersCount);
    animateCount(partnersList.length || 0, setDisplayNGOsCount);
    animateCount(volunteerCount || 0, setDisplayVolunteers);
  }, [collectionDocs, partnersList, volunteerCount]);

  // map markers - aggregate kg by area and prefer coords from docs if present
  const markers = useMemo(() => {
    const map = {};
    collectionDocs.forEach((d) => {
      const qty = parseFloat(d.quantity || d.quantityKg || 0) || 0;
      if (d.lat && d.lng) {
        const key = `${d.lat},${d.lng}`;
        if (!map[key]) {
          map[key] = {
            lat: d.lat,
            lng: d.lng,
            kg: 0,
            label: d.societyName || d.partner || d.area || "Location",
          };
        }
        map[key].kg += qty;
      } else {
        const area = (d.area || d.locality || "Unknown Area").trim();
        if (AREA_COORDS[area]) {
          const [lat, lng] = AREA_COORDS[area];
          const key = `area:${area}`;
          if (!map[key]) {
            map[key] = { lat, lng, kg: 0, label: area };
          }
          map[key].kg += qty;
        }
      }
    });
    return Object.keys(map).map((k) => map[k]);
  }, [collectionDocs]);

  // helpers
  const formatKg = (n) => `${Number(n || 0).toLocaleString()} kg`;
  const formatDate = (doc) => {
    if (!doc) return "—";
    if (doc.timestamp && doc.timestamp.seconds) {
      return new Date(doc.timestamp.seconds * 1000).toLocaleDateString();
    }
    if (doc.date) return doc.date;
    return "—";
  };

  const puneCenter = [18.5204, 73.8567];
  const mapZoom = 12;

  // Animations presets
  const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };
  const fadeIn = (delay = 0) => ({ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.45, delay } });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-pulse text-3xl font-semibold text-primary">Loading dashboard...</div>
          <p className="text-sm text-gray-500 mt-3">Fetching latest collections from Firebase</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">

      {/* Header hero (Static gradient style) */}
      
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#fdf6ec] to-[#f7e7ce] pt-24">
        <motion.div {...fadeUp} className="relative z-10 px-6 md:px-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-orange-400 mb-6">
            Ek Mutthi Anaj — Dashboard
          </h1>

          <p className="text-base md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10">
            A transparent view of every handful of grain collected and donated across Pune.
          </p>

          {/* Community Portal button */}
          <div className="mt-4">
            <Link
              to="/login"
              className="inline-block bg-orange-400 hover:bg-orange-600 text-white px-8 py-3 md:px-10 md:py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              🌐 Community Portal
            </Link>
          </div>
        </motion.div>

        {/* Optional scroll arrow like the “What We Do” section */}
        <div className="absolute bottom-10 text-gray-500 animate-bounce text-2xl">
          ↓
        </div>
      </section>

      <main className="px-6 md:px-16 py-10 max-w-7xl mx-auto">
        {/* HERO STATS */}
        <motion.div {...fadeIn(0.05)} className="grid grid-cols-1 md:grid-cols-4 gap-6 -mt-3">
          <motion.div {...fadeUp} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
            <p className="text-sm text-gray-500">🌾 Total Grains Collected</p>
            <div className="text-2xl md:text-3xl font-extrabold text-primary mt-2">{displayTotal.toLocaleString()} kg</div>
          </motion.div>

          <motion.div {...fadeUp} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
            <p className="text-sm text-gray-500">🏢 Partner Societies</p>
            <div className="text-2xl md:text-3xl font-extrabold text-primary mt-2">{displayPartnersCount}</div>
          </motion.div>

          <motion.div {...fadeUp} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
            <p className="text-sm text-gray-500">🏬 Partner NGOs / Receivers</p>
            <div className="text-2xl md:text-3xl font-extrabold text-primary mt-2">{displayNGOsCount}</div>
          </motion.div>

          <motion.div {...fadeUp} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
            <p className="text-sm text-gray-500">👥 Active Volunteers</p>
            <div className="text-2xl md:text-3xl font-extrabold text-primary mt-2">{displayVolunteers > 0 ? displayVolunteers : "—"}</div>
          </motion.div>
        </motion.div>

        {/* Charts + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <motion.div {...fadeUp} className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-primary mb-3">Monthly Grain Collection (kg)</h3>
            <div className="w-full h-[300px]">
              {monthlyData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(val) => `${val} kg`} />
                    <Bar dataKey="collected" name="Collected (kg)" fill="#4b6043" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">No monthly data yet</div>
              )}
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-primary mb-3">Collection by Area</h3>
            <div className="w-full h-[220px]">
              {areaData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={areaData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                      {areaData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => `${val} kg`} />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">No area data</div>
              )}
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Pune Map</h4>
              <div className="h-[220px] rounded-xl overflow-hidden border border-gray-100">
                <MapContainer center={puneCenter} zoom={mapZoom} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                  <TileLayer attribution='© OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {markers.length > 0 &&
                    markers.map((m, idx) => (
                      <Marker key={idx} position={[m.lat, m.lng]}>
                        <Popup>
                          <div className="text-sm">
                            <strong>{m.label}</strong>
                            <div>{formatKg(m.kg)}</div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                </MapContainer>
              </div>
              <p className="text-xs text-gray-500 mt-2">Click pins to see area / society totals. Map centers on Pune.</p>
            </div>
          </motion.div>
        </div>

        {/* Partner & Volunteer Highlights */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div {...fadeUp} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-primary mb-3">Top 5 Contributing Societies</h3>
            {topSocieties.length > 0 ? (
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {topSocieties.map((s, i) => (
                  <li key={i} className="flex justify-between items-center">
                    <span>{s.name}</span>
                    <span className="font-semibold text-primary">{s.kg} kg</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-500">No society data yet.</p>
            )}
          </motion.div>

          <motion.div {...fadeUp} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-primary mb-3">Donated to</h3>
            {partnersList.length > 0 ? (
              <ul className="space-y-2 text-gray-700">
                {partnersList.map((p, i) => (
                  <li key={i} className="p-2 bg-gray-50 rounded-md border">{p}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No partners listed yet.</p>
            )}
          </motion.div>

          <motion.div {...fadeUp} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
            <h3 className="text-lg font-semibold text-primary mb-3">Volunteers</h3>
            <div className="text-3xl font-extrabold text-primary">{volunteerCount !== null ? volunteerCount : "—"}</div>
            <p className="text-sm text-gray-500 mt-2">Active volunteers recorded in the system</p>
          </motion.div>
        </section>

        {/* Transparency + Recent Donations Table + CTA */}
        <motion.section {...fadeIn(0.05)} className="mt-8 bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-primary">100% Transparency</h3>
          <p className="text-gray-600 mt-2">Every single grain collected is donated — nothing is retained or sold.</p>

          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-800 mb-3">Latest Donation</h4>
            {latestDonation ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                <div>
                  <p className="text-sm text-gray-500">Society / Source</p>
                  <div className="font-semibold">{latestDonation.societyName || latestDonation.society || "—"}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <div className="font-semibold">{formatKg(latestDonation.quantity || latestDonation.qty || latestDonation.amount)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Donated To</p>
                  <div className="font-semibold">{latestDonation.partner || "Unassigned"}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <div className="font-semibold">{formatDate(latestDonation)}</div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No donation records available yet.</p>
            )}
          </div>

          <div className="mt-6 overflow-x-auto">
            <h4 className="text-lg font-medium text-gray-800 mb-3">Recent Collections</h4>
            <table className="min-w-full text-sm">
              <thead className="bg-orange-50">
                <tr>
                  <th className="py-2 px-4 text-left text-gray-700">Society</th>
                  <th className="py-2 px-4 text-left text-gray-700">Area</th>
                  <th className="py-2 px-4 text-left text-gray-700">Amount</th>
                  <th className="py-2 px-4 text-left text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {collectionDocs.length > 0 ? (
                  collectionDocs.slice(0, 8).map((r, idx) => (
                    <tr key={idx} className="hover:bg-orange-50">
                      <td className="py-2 px-4 border-b">{r.societyName || r.society || "—"}</td>
                      <td className="py-2 px-4 border-b">{r.area || r.locality || "—"}</td>
                      <td className="py-2 px-4 border-b">{formatKg(r.quantity || r.qty || 0)}</td>
                      <td className="py-2 px-4 border-b">{formatDate(r)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500">No collections yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* CTA row */}
          <div className="mt-6 flex flex-col md:flex-row gap-3 items-center justify-center">
            <Link to="/join" className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full font-semibold shadow-md hover:opacity-95 transition">
              Join as Volunteer
            </Link>
            <Link to="/register-society" className="bg-white text-primary border border-primary px-6 py-2 rounded-full font-semibold shadow-sm hover:bg-gray-50 transition">
              Register Your Society
            </Link>
            <Link to="/partner-ngo" className="bg-green-100 text-green-700 px-6 py-2 rounded-full font-semibold shadow-sm hover:bg-green-200 transition">
              Partner as NGO
            </Link>
          </div>
        </motion.section>

        <footer className="mt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Ek Mutthi Anaj — Data powered by Firebase
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
