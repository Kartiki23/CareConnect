import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const BloodDonarList = () => {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const fetchDonors = async () => {
    try {
      const response = await axios.get(
        "https://careconnect-9y8d.onrender.com/api/v1/user/donors",
        {
          params: { search, bloodGroup: filter },
        }
      );
      setDonors(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch donors");
    }
  };

  const deleteDonor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donor?")) return;
    try {
      await axios.delete(
        `https://careconnect-9y8d.onrender.com/api/v1/user/donors/${id}`
      );
      toast.success("Donor deleted successfully");
      fetchDonors();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete donor");
    }
  };

  useEffect(() => {
    fetchDonors();
  }, [search, filter]);

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-bold mb-6 text-red-600 text-center">
       Donors Admin Panel
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
        <input
          type="text"
          placeholder="Search by name or address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md p-2 w-full sm:w-1/2 focus:ring-2 focus:ring-red-400"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-md p-2 w-full sm:w-1/4 focus:ring-2 focus:ring-red-400"
        >
          <option value="">All Blood Groups</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md table-auto">
          <thead className="bg-red-500 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left hidden sm:table-cell">Email</th>
              <th className="py-2 px-4 text-left hidden md:table-cell">Phone</th>
              <th className="py-2 px-4 text-left hidden lg:table-cell">Age</th>
              <th className="py-2 px-4 text-left hidden lg:table-cell">Gender</th>
              <th className="py-2 px-4 text-left">Blood Group</th>
              <th className="py-2 px-4 text-left hidden md:table-cell">Donations</th>
              <th className="py-2 px-4 text-left hidden lg:table-cell">Last Donation</th>
              <th className="py-2 px-4 text-left hidden xl:table-cell">Health Issues</th>
              <th className="py-2 px-4 text-left hidden xl:table-cell">Address</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <motion.tr
                key={donor._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-2 px-4">{donor.fullName}</td>
                <td className="py-2 px-4 hidden sm:table-cell">{donor.email}</td>
                <td className="py-2 px-4 hidden md:table-cell">{donor.phone}</td>
                <td className="py-2 px-4 hidden lg:table-cell">{donor.age}</td>
                <td className="py-2 px-4 hidden lg:table-cell">{donor.gender}</td>
                <td className="py-2 px-4 text-center">{donor.bloodGroup}</td>
                <td className="py-2 px-4 hidden md:table-cell">{donor.donationType}</td>
                <td className="py-2 px-4 hidden lg:table-cell">
                  {donor.lastDonation
                    ? new Date(donor.lastDonation).toLocaleDateString()
                    : "-"}
                </td>
                <td className="py-2 px-4 hidden xl:table-cell">{donor.healthIssues || "-"}</td>
                <td className="py-2 px-4 hidden xl:table-cell">{donor.address}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => deleteDonor(donor._id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodDonarList;

