// src/pages/MultiPatientChat.jsx 
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const patients = [
  { id: 1, name: "Jane Cooper" },
  { id: 2, name: "Wade Warren" },
  { id: 3, name: "Brooklyn Henderson" },
];

const DoctorMsg = () => {
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      text: input,
      sender: "doctor",
      timestamp: new Date().toISOString(),
    };

    const patientId = selectedPatient.id;
    const updatedMessages = {
      ...messages,
      [patientId]: [...(messages[patientId] || []), newMessage],
    };

    setMessages(updatedMessages);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg">
        <div className="p-4 text-xl font-bold border-b">Patients</div>
        <ul>
          {patients.map((p) => (
            <li
              key={p.id}
              onClick={() => setSelectedPatient(p)}
              className={`px-4 py-3 cursor-pointer border-b hover:bg-gray-100 ${
                selectedPatient.id === p.id ? "bg-blue-50 font-semibold" : ""
              }`}
            >
              {p.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b bg-white flex items-center text-lg font-semibold">
          Chat with {selectedPatient.name}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {(messages[selectedPatient.id] || []).map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === "doctor"
                  ? "bg-blue-500 text-white self-end ml-auto"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white flex items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />
          <button
            onClick={handleSend}
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorMsg;