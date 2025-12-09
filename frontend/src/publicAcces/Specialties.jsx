// src/pages/Specialties.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Specialties = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch all specialties
  const getSpecialties = async () => {
    try {
      const response = await axios.get("https://careconnect-1-xvl2.onrender.com/api/v1/user/specialties");
      setSpecialties(response.data.specialties ?? []);
    } catch (error) {
      console.error("Error fetching specialties:", error);
      setSpecialties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSpecialties();
  }, []);

  // Filter specialties by search input
  const filteredSpecialties = specialties.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-800">Find a Specialty</h1>
        <p className="text-gray-600 mt-2">
          Browse through 25+ medical specialties and consult doctors instantly.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-lg mx-auto mb-8">
        <input
          type="text"
          placeholder="Search for a specialty (e.g., Cardiology, Dermatology)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Specialties Grid */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <p className="text-center py-10">Loading specialties...</p>
        ) : filteredSpecialties.length === 0 ? (
          <p className="text-center py-10 text-gray-500">
            No specialties found. Try another search.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {filteredSpecialties.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer text-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 mx-auto mb-4 rounded-full object-cover bg-blue-50"
                />
                <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                <Link to="/login">
                  <button className="mt-3 text-sm text-blue-600 hover:underline">
                    Consult Now →
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Specialties;