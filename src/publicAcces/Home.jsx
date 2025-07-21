import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';

const donationSlides = [
  {
    title: "Blood Donation",
    description: "Your blood can save lives. Donate regularly to help accident victims, surgeries, and blood disorder patients."
  },
  {
    title: "Tissue Donation",
    description: "Donate skin, heart valves, and connective tissues to help burn victims and surgical procedures."
  },
  {
    title: "Sperm Donation",
    description: "Support families with fertility challenges by donating healthy sperm at approved centers."
  },
  {
    title: "Eye Donation",
    description: "Restore sight to the blind by donating your eyes. You can give the gift of vision."
  },
  {
    title: "Bone Marrow Donation",
    description: "Help blood cancer patients by donating stem cells or bone marrow through a painless process."
  },
  {
    title: "Organ Donation",
    description: "Donate organs like kidneys, heart, liver to save lives. You can register as a donor easily."
  },
  {
    title: "Body Donation",
    description: "Help advance medical education and research by donating your whole body after life."
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % donationSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-blue-50 py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          Book Appointments Anytime, Anywhere
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Welcome to CareConnect – a unified platform to connect patients with trusted doctors across multiple hospitals.
        </p>
        <a href="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">Book Appointment
        </a>
      </section>

      {/* Organ & Body Donation Carousel */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Organ & Body Donation Awareness</h2>

          <div className="relative bg-white shadow-lg rounded-lg p-8 transition-all duration-500 ease-in-out min-h-[200px]">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
            {donationSlides[currentSlide].title}
            </h3>
            <p className="text-gray-700">{donationSlides[currentSlide].description}</p>
          </div>

          {/* Dot Indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {donationSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
              } transition duration-300`} >
            </button>
            ))}
          </div>
        </div>
        </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">What Our Patients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p>"CareConnect helped me find a top cardiologist instantly. Booking was smooth and secure!"</p>
              <p className="mt-4 font-semibold">– Aditi Sharma</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p>"I appreciate the awareness around organ donation. Very informative and easy to navigate."</p>
              <p className="mt-4 font-semibold">– Rahul Mehta</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p>"Finally a medical platform that respects my time and connects me to real doctors fast."</p>
              <p className="mt-4 font-semibold">– Sneha Kulkarni</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 text-center">
        <p>&copy; {new Date().getFullYear()} CareConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
