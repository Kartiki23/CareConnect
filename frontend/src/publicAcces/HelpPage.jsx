// HelpPage.jsx
import { useState } from "react";
import { Search, Phone, Mail, MessageCircle } from "lucide-react";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer:
        "Go to the 'Appointments' section, select a doctor, choose a date and time, then confirm your booking.",
    },
    {
      question: "Can I cancel or reschedule my booking?",
      answer:
        "Yes, go to 'My Appointments' and choose the appointment you want to cancel or reschedule.",
    },
    {
      question: "Is my medical data secure?",
      answer:
        "We use end-to-end encryption and follow healthcare security standards to keep your data safe.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can call us, email us, or use the live chat option available below.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Page Title */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600">Help & Support</h1>
        <p className="text-gray-600 mt-2">
          Find answers to your questions or reach out to us directly.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-10 flex items-center gap-2 bg-white shadow p-3 rounded-xl">
        <Search className="text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search help topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full outline-none text-gray-700"
        />
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl p-5 border border-gray-100"
              >
                <h3 className="text-lg font-medium text-blue-600">
                  {faq.question}
                </h3>
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No results found...</p>
          )}
        </div>
      </div>

      {/* Contact Options */}
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Still Need Help?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Phone className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-medium text-gray-800">Call Us</h3>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Mail className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-medium text-gray-800">Email Support</h3>
            <p className="text-gray-600">support@careconnect.com</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <MessageCircle className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-medium text-gray-800">Live Chat</h3>
            <p className="text-gray-600">Chat with us for instant help</p>
          </div>
        </div>
      </div>
    </div>
  );
}