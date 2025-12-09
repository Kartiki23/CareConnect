// frontend/src/PatientFlow/BloodDonationPanel.jsx
import React, { useEffect, useState } from "react";
import { FaTint } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import BloodDonationForm from "../publicAcces/BlooddonationForm";
import axios from "axios";

const BloodDonationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
   const [donations, setDonations] = useState([]);

    useEffect(() => {
    const fetchDonations = async () => {
      try {
        //const token = localStorage.getItem("token"); // ✅ JWT stored at login
        const res = await axios.get("https://careconnect-1-xvl2.onrender.com/api/v1/user/my-donations", {
          //headers: { Authorization: `Bearer ${token}` },
        });
        setDonations(res.data.donations);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDonations();
  }, []);

  return (
    <div>
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-red-500 flex justify-center items-center gap-2"
      >
        <FaTint className="text-red-500" />
        Patient Donation Panel
      </motion.h2>

      {/* Donate Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="mt-6 bg-red-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-red-700 transition flex items-center gap-2 mx-auto"
      >
        <FaTint className="text-white" />
        Donate 
      </motion.button>

      {/* Modal for Donation Form */}
      <AnimatePresence>
        {isOpen && (
         <div>
        

              <BloodDonationForm onClose={() => setIsOpen(false)} />
           
         </div>
        )}
      </AnimatePresence>
    </div>


        {/* // Donation List */}
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-red-600 flex items-center justify-center gap-2">
         My Donations
      </h2>

      {donations.length === 0 ? (
        <p className="text-center text-gray-600">No donations found yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {donations.map((donat) => (
            <motion.div
              key={donat._id}
              whileHover={{ scale: 1.02 }}
              className="p-5 bg-white rounded-xl shadow-lg border"
            >
              <h3 className="text-xl font-semibold text-red-600">{donat.bloodGroup} Blood</h3>
              <p><strong>Name:</strong> {donat.fullName}</p>
              <p><strong>Age:</strong> {donat.age}</p>
              <p><strong>Phone:</strong> {donat.phone}</p>
              <p><strong>Donation Type:</strong> {donat.donationType}</p>
              <p><strong>Last Donation:</strong> {donat.lastDonation || "N/A"}</p>
              <p><strong>Health Issues:</strong> {donat.healthIssues || "None"}</p>
              <p><strong>Address:</strong> {donat.address}</p>
              <p className="text-sm text-gray-500 mt-2">
                Donated on {new Date(donat.createdAt).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default BloodDonationPanel;


