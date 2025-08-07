import React, { useState, useEffect } from "react"; import { io } from "socket.io-client"; import { FaUserCircle } from "react-icons/fa";

const socket = io("http://localhost:3001"); // Adjust to your backend

const PatientMessages = () => { const [messages, setMessages] = useState([]); const [newMessage, setNewMessage] = useState("");

useEffect(() => { socket.on("receive_message", (message) => { setMessages((prev) => [...prev, message]); });

return () => {
  socket.off("receive_message");
};

}, []);

const sendMessage = () => { if (newMessage.trim() === "") return; const messageData = { sender: "patient", content: newMessage, timestamp: new Date(), }; socket.emit("send_message", messageData); setMessages((prev) => [...prev, messageData]); setNewMessage(""); };

return ( 
<div className="flex h-screen">
   {/* Sidebar */} 
   {/* <div className="w-64 bg-blue-600 text-white p-4"> <div className="flex items-center gap-3 mb-6"> <FaUserCircle size={32} /> <span className="text-lg font-semibold">Patient Dashboard</span> </div> <nav className="flex flex-col gap-3"> <a href="/patient/profile" className="hover:underline">Profile</a> <a href="/patient/messages" className="underline">Messages</a> <a href="/patient/appointments" className="hover:underline">Appointments</a> </nav> </div> */}

{/* Main Chat Area */}
  <div className="flex-1 flex flex-col p-6 bg-gray-50">
    <h2 className="text-2xl font-bold mb-4 text-center">Messages</h2>

    <div className="flex-1 overflow-y-auto mb-4 p-4 rounded bg-white shadow-inner">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-2 p-2 rounded-lg max-w-xs text-sm shadow-md ${
            msg.sender === "patient"
              ? "bg-blue-100 self-end ml-auto"
              : "bg-gray-200 self-start"
          }`}
        >
          <p>{msg.content}</p>
          <p className="text-xs text-right text-gray-500 mt-1">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>

    <div className="flex items-center gap-2">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border rounded-lg p-2"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Send
      </button>
    </div>
  </div>
</div>

); };

export default PatientMessages;