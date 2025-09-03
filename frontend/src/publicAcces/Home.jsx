import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSpecialty, setCurrentSpecialty] = useState(0);
  const [specialties, setSpecialties] = useState([]);
  const [donationSlides, setDonationSlides] = useState([]);
  const [loadingSpecialties, setLoadingSpecialties] = useState(true);
  const [loadingDonations, setLoadingDonations] = useState(true);
  const specialtySlideSize = 4;

  // Fetch specialties
  const getSpecialties = async () => {
    try {
      const response = await axios.get(
        "https://careconnect-1-xvl2.onrender.com/api/v1/user/specialties"
      );
      setSpecialties(response.data.specialties ?? []);
    } catch (error) {
      console.error("Error fetching specialties:", error);
      setSpecialties([]);
    } finally {
      setLoadingSpecialties(false);
    }
  };

  // Fetch donations
  const getDonations = async () => {
    try {
      const response = await axios.get(
        "https://careconnect-1-xvl2.onrender.com/api/v1/user/donation"
      );
      setDonationSlides(response.data.donation ?? []);
    } catch (error) {
      console.log("Error fetching donations:", error);
      setDonationSlides([]);
    } finally {
      setLoadingDonations(false);
    }
  };

  useEffect(() => {
    getSpecialties();
    getDonations();
  }, []);

  // Donation auto-slide
  useEffect(() => {
    if (donationSlides.length === 0) return;
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % donationSlides.length);
    }, 3000);
    return () => clearInterval(slideInterval);
  }, [donationSlides.length]);

  // Specialties auto-slide
  useEffect(() => {
    if (specialties.length === 0) return;
    const specialtyInterval = setInterval(() => {
      setCurrentSpecialty(
        (prev) => (prev + specialtySlideSize) % specialties.length
      );
    }, 4000);
    return () => clearInterval(specialtyInterval);
  }, [specialties.length]);

  const displayedSpecialties = specialties.slice(
    currentSpecialty,
    currentSpecialty + specialtySlideSize
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-gray-800"
    >
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-blue-50 py-16 sm:py-20 px-4 text-center"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          Book Appointments Anytime, Anywhere
        </h1>
        <p className="text-base sm:text-lg max-w-2xl mx-auto mb-6">
          Welcome to CareConnect – connect patients with trusted doctors across
          multiple hospitals.
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/login"
          className="bg-blue-600 text-white px-5 sm:px-6 py-3 rounded-lg text-base sm:text-lg hover:bg-blue-700 transition"
        >
          Book Appointment
        </motion.a>
      </motion.section>

      {/* Donation Slider */}
      <section id="donation">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="bg-gray-100 py-16 px-4"
        >
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-10">
              Organ & Body Donation Awareness
            </h2>
            <div className="flex justify-center gap-2 mb-5 flex-wrap">
              <p>If you want to do donation</p>
              <Link to="/login">
                <span className="text-blue-400 underline">Click here</span>
              </Link>
            </div>
            {loadingDonations ? (
              <p className="text-center w-full py-10">
                Loading donation slides...
              </p>
            ) : (
              <>
                <motion.div
                  key={donationSlides[currentSlide]?.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    backgroundImage: `url('${donationSlides[currentSlide]?.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="relative bg-white shadow-lg rounded-lg p-6 sm:p-8 min-h-[220px] max-w-2xl mx-auto"
                >
                  <h3 className="text-xl sm:text-2xl font-semibold text-green-700 mb-3">
                    {donationSlides[currentSlide]?.name}
                  </h3>
                  <p className="text-sm sm:text-base">
                    {donationSlides[currentSlide]?.description}
                  </p>
                </motion.div>
                {/* Pagination dots */}
                <div className="flex justify-center space-x-2 mt-6">
                  {donationSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full ${
                        currentSlide === index
                          ? "bg-blue-600"
                          : "bg-gray-300"
                      } transition duration-300`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.section>
      </section>

      {/* Specialties */}
      <section id="specialties">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white py-16 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-800">
                25+ Specialties
              </h2>
              <Link to="/specialties">
                <button className="text-blue-600 font-medium hover:underline">
                  See all Specialties
                </button>
              </Link>
            </div>
            <div className="relative">
              {/* Prev btn */}
              <button
                onClick={() =>
                  specialties.length &&
                  setCurrentSpecialty(
                    (prev) =>
                      (prev - specialtySlideSize + specialties.length) %
                      specialties.length
                  )
                }
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-blue-100 hover:bg-blue-200 rounded-full shadow hidden sm:block"
              >
                ‹
              </button>

              {loadingSpecialties ? (
                <p className="text-center w-full py-10">
                  Loading specialties...
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {displayedSpecialties.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-4 object-cover bg-blue-100"
                      />
                      <h3 className="text-sm sm:text-md font-semibold text-gray-800 text-center">
                        {item.name}
                      </h3>
                      <Link to="/doctorPage" state={{ specialization: item.name }}>
                        <button className="text-blue-600 text-xs sm:text-sm mt-2 hover:underline">
                          Consult now →
                        </button>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Next btn */}
              <button
                onClick={() =>
                  specialties.length &&
                  setCurrentSpecialty(
                    (prev) => (prev + specialtySlideSize) % specialties.length
                  )
                }
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-blue-100 hover:bg-blue-200 rounded-full shadow hidden sm:block"
              >
                ›
              </button>
            </div>
          </div>
        </motion.section>
      </section>

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white py-16 px-4"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10">
            What Our Patients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                quote:
                  "CareConnect helped me find a top cardiologist instantly. Booking was smooth and secure!",
                name: "Aditi Sharma",
              },
              {
                quote:
                  "I appreciate the awareness around organ donation. Very informative and easy to navigate.",
                name: "Rahul Mehta",
              },
              {
                quote:
                  "Finally a medical platform that respects my time and connects me to real doctors fast.",
                name: "Sneha Kulkarni",
              },
            ].map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="bg-gray-100 p-6 rounded-lg shadow-md"
              >
                <p className="text-sm sm:text-base">"{t.quote}"</p>
                <p className="mt-4 font-semibold">– {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-blue-900 text-gray-200 px-6 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-white font-bold text-lg sm:text-xl mb-4">
              CareConnect
            </h2>
            <p className="text-sm">
              Your trusted partner for online doctor consultations, hospital
              bookings, and healthcare solutions – anytime, anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-white font-semibold text-md sm:text-lg mb-4">
              Quick Links
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="hover:text-blue-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/helppage" className="hover:text-blue-400">
                  Services
                </a>
              </li>
              <li>
                <a href="/specialties" className="hover:text-blue-400">
                  Specialties
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-white font-semibold text-md sm:text-lg mb-4">
              Resources
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/faqs" className="hover:text-blue-400">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/blogs" className="hover:text-blue-400">
                  Health Blogs
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-blue-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-blue-400">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h2 className="text-white font-semibold text-md sm:text-lg mb-4">
              Connect With Us
            </h2>
            <p className="text-sm">📍 Pune, Maharashtra, India</p>
            <p className="text-sm">📞 +91 98765 43210</p>
            <p className="text-sm">✉ support@careconnect.com</p>

            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-blue-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm text-gray-300 mt-8 border-t border-blue-800 pt-4">
          © {new Date().getFullYear()} CareConnect. All rights reserved.
        </div>
      </footer>
    </motion.div>
  );
};

export default Home;
