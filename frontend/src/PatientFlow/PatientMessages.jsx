import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const PatientMessages = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem("patientToken");
  const patient = JSON.parse(localStorage.getItem("patient")); // Assuming patient info is stored

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/messages/my-doctors", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error("Error fetching doctors", err));
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      axios
        .get(`http://localhost:3001/api/messages/${selectedDoctor._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setMessages(res.data))
        .catch((err) => console.error("Error fetching messages", err));
    }
  }, [selectedDoctor]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedDoctor) return;

    axios
      .post(
        "http://localhost:3001/api/messages",
        {
          receiverId: selectedDoctor._id,
          message: newMessage
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then((res) => {
        setMessages((prev) => [...prev, res.data]);
        setNewMessage("");
      })
      .catch((err) => console.error("Error sending message", err));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left panel: Doctors */}
      <div className="w-1/3 border-r bg-white">
        <div className="p-4 border-b font-bold text-lg">My Doctors</div>
        {doctors.map((doc) => (
          <div
            key={doc._id}
            onClick={() => setSelectedDoctor(doc)}
            className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-200 ${
              selectedDoctor?._id === doc._id ? "bg-gray-200" : ""
            }`}
          >
            <img
              src={`http://localhost:3001/uploads/${doc.doctorPhoto}`}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <span>{doc.fullName}</span>
          </div>
        ))}
      </div>

      {/* Right panel: Chat */}
      <div className="w-2/3 flex flex-col">
        {selectedDoctor ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white flex items-center gap-3">
              <img
                src={`http://localhost:3001/uploads/${selectedDoctor.doctorPhoto}`}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <span className="font-semibold">{selectedDoctor.fullName}</span>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-2 flex ${
                    msg.senderId === patient._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg ${
                      msg.senderId === patient._id
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white flex gap-2">
              <input
                className="flex-1 border rounded px-3 py-2"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a doctor to start chat
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientMessages;