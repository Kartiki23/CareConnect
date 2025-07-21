import React, { useEffect, useState } from 'react'; import { motion } from 'framer-motion'; import Navbar from './Navbar';

const donationSlides = [ { title: "Blood Donation", description: "Your blood can save lives. Donate regularly to help accident victims, surgeries, and blood disorder patients." }, { title: "Tissue Donation", description: "Donate skin, heart valves, and connective tissues to help burn victims and surgical procedures." }, { title: "Sperm Donation", description: "Support families with fertility challenges by donating healthy sperm at approved centers." }, { title: "Eye Donation", description: "Restore sight to the blind by donating your eyes. You can give the gift of vision." }, { title: "Bone Marrow Donation", description: "Help blood cancer patients by donating stem cells or bone marrow through a painless process." }, { title: "Organ Donation", description: "Donate organs like kidneys, heart, liver to save lives. You can register as a donor easily." }, { title: "Body Donation", description: "Help advance medical education and research by donating your whole body after life." } ];

const specialties = [ { name: 'Gynaecology', price: 499, image: '/images/gynae.png' }, { name: 'Sexology', price: 499, image: '/images/sexology.png' }, { name: 'General Physician', price: 399, image: '/images/physician.png' }, { name: 'Dermatology', price: 449, image: '/images/derma.png' }, { name: 'Psychiatry', price: 499, image: '/images/psychiatry.png' }, { name: 'Stomach & Digestion', price: 399, image: '/images/digestion.png' }, { name: 'Cardiology', price: 599, image: '/images/cardiology.png' }, { name: 'Neurology', price: 599, image: '/images/neurology.png' }, { name: 'Pediatrics', price: 399, image: '/images/pediatrics.png' }, { name: 'Orthopedics', price: 499, image: '/images/ortho.png' }, { name: 'ENT', price: 399, image: '/images/ent.png' }, { name: 'Urology', price: 499, image: '/images/urology.png' }, { name: 'Nephrology', price: 599, image: '/images/nephrology.png' }, { name: 'Oncology', price: 699, image: '/images/oncology.png' }, { name: 'Endocrinology', price: 499, image: '/images/endocrinology.png' }, { name: 'Pulmonology', price: 499, image: '/images/pulmonology.png' }, { name: 'Hematology', price: 499, image: '/images/hematology.png' }, { name: 'Rheumatology', price: 499, image: '/images/rheumatology.png' }, { name: 'Gastroenterology', price: 499, image: '/images/gastro.png' }, { name: 'Ophthalmology', price: 499, image: '/images/ophthal.png' }, { name: 'Dental', price: 399, image: '/images/dental.png' }, { name: 'Psychology', price: 399, image: '/images/psychology.png' }, { name: 'Homeopathy', price: 349, image: '/images/homeopathy.png' }, { name: 'Ayurveda', price: 349, image: '/images/ayurveda.png' }, { name: 'Nutrition', price: 399, image: '/images/nutrition.png' } ];

const Home = () => { const [currentSlide, setCurrentSlide] = useState(0); const [currentSpecialty, setCurrentSpecialty] = useState(0); const specialtySlideSize = 4;

useEffect(() => { const slideInterval = setInterval(() => { setCurrentSlide((prev) => (prev + 1) % donationSlides.length); }, 3000); return () => clearInterval(slideInterval); }, []);

useEffect(() => { const specialtyInterval = setInterval(() => { setCurrentSpecialty((prev) => (prev + specialtySlideSize) % specialties.length); }, 4000); return () => clearInterval(specialtyInterval); }, []);

const displayedSpecialties = specialties.slice(currentSpecialty, currentSpecialty + specialtySlideSize);

return ( <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-gray-800"> <Navbar />

{/* Hero Section */}
  <motion.section initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="bg-blue-50 py-20 px-4 text-center">
    <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">Book Appointments Anytime, Anywhere</h1>
    <p className="text-lg max-w-2xl mx-auto mb-6">
      Welcome to CareConnect – a unified platform to connect patients with trusted doctors across multiple hospitals.
    </p>
    <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
      Book Appointment
    </motion.a>
  </motion.section>

  {/* Organ & Body Donation Section */}
  <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="bg-gray-100 py-16 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-10">Organ & Body Donation Awareness</h2>
      <motion.div key={currentSlide} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative bg-white shadow-lg rounded-lg p-8 min-h-[200px]">
        <h3 className="text-2xl font-semibold text-green-700 mb-4">{donationSlides[currentSlide].title}</h3>
        <p className="text-gray-700">{donationSlides[currentSlide].description}</p>
      </motion.div>
      <div className="flex justify-center space-x-2 mt-6">
        {donationSlides.map((_, index) => (
         // <button key={index} onClick={() => setCurrentSlide(index)} className={w-3 h3 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'} transition duration-300} />
       <button
  key={index}
  onClick={() => setCurrentSlide(index)}
  className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'} transition duration-300`}
/>
       ))}
      </div>
    </div>
  </motion.section>

  {/* Specialties Section */}
  <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-white py-16 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-800">25+ Specialties</h2>
        <button className="text-blue-600 font-medium hover:underline">See all Specialties</button>
      </div>
      <div className="relative">
        <button onClick={() => setCurrentSpecialty((prev) => (prev - specialtySlideSize + specialties.length) % specialties.length)} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-blue-100 hover:bg-blue-200 rounded-full shadow">‹</button>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 transition-transform duration-700 ease-in-out">
          {displayedSpecialties.map((item, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-full mb-4 object-cover bg-blue-100" />
              <h3 className="text-md font-semibold text-gray-800 text-center">{item.name}</h3>
              <p className="text-gray-500 text-sm mt-1">₹{item.price}</p>
              <button className="text-blue-600 text-sm mt-2 hover:underline">Consult now →</button>
            </motion.div>
          ))}
        </div>
        <button onClick={() => setCurrentSpecialty((prev) => (prev + specialtySlideSize) % specialties.length)} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-blue-100 hover:bg-blue-200 rounded-full shadow">›</button>
      </div>
    </div>
  </motion.section>

  {/* Testimonials Section */}
  <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-white py-16 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-10">What Our Patients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { quote: "CareConnect helped me find a top cardiologist instantly. Booking was smooth and secure!", name: "Aditi Sharma" },
          { quote: "I appreciate the awareness around organ donation. Very informative and easy to navigate.", name: "Rahul Mehta" },
          { quote: "Finally a medical platform that respects my time and connects me to real doctors fast.", name: "Sneha Kulkarni" },
        ].map((t, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.2 }} className="bg-gray-100 p-6 rounded-lg shadow-md">
            <p>"{t.quote}"</p>
            <p className="mt-4 font-semibold">– {t.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>

  {/* Footer */}
  <footer className="bg-blue-600 text-white py-6 text-center">
    <p>&copy; {new Date().getFullYear()} CareConnect. All rights reserved.</p>
  </footer>
</motion.div>

);
 };

export default Home;