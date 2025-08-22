import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("https://careconnect-9y8d.onrender.com", { transports: ["websocket"] });

const ChatBox = ({ senderId, senderModel }) => {
  const [appointments, setAppointments] = useState([]);
  const [activeAppointment, setActiveAppointment] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatEndRef = useRef(null);

  const isDoctor = senderModel === "Doctor";
  const normalizedModel = isDoctor ? "docregmodels" : "patients";

  // Fetch accepted appointments (sidebar)
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(
          `https://careconnect-9y8d.onrender.com/api/v1/chat/myChats/${senderId}/${senderModel}`
        );
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching chats:", err);
      }
    };
    fetchChats();
  }, [senderId, senderModel]);

  // Join room, fetch messages, listen for new messages
  useEffect(() => {
    if (!activeAppointment) return;

    const roomId = activeAppointment.appointmentId;
    socket.emit("joinRoom", { appointmentId: roomId, userId: senderId });

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `https://careconnect-9y8d.onrender.com/api/v1/chat/messages/${roomId}`
        );
        setMessages(res.data.messages || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();

    const handleReceiveMessage = (msg) => {
      if (msg.appointmentId === roomId) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.emit("leaveRoom", { appointmentId: roomId });
    };
  }, [activeAppointment, senderId]);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim() || !activeAppointment) return;

    const newMsg = {
      appointmentId: activeAppointment.appointmentId,
      senderId,
      senderModel: normalizedModel,
      message: text,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setText("");

    try {
      await axios.post("https://careconnect-9y8d.onrender.com/api/v1/chat/send", newMsg);
      socket.emit("sendMessage", newMsg);
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar / Chat list */}
      <div className={`
        fixed md:relative z-20 md:z-auto w-64 md:w-1/4 h-full bg-white border-r
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}>
        <div className="p-4 font-bold border-b bg-blue-500 text-white flex justify-between items-center">
          Chats
          <button
            className="md:hidden font-bold text-white text-lg"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        {appointments.length > 0 ? (
          <div className="overflow-y-auto h-full">
            {appointments.map((chat) => (
              <div
                key={chat.appointmentId}
                onClick={() => {
                  setActiveAppointment(chat);
                  setSidebarOpen(false);
                }}
                className={`p-4 cursor-pointer border-b hover:bg-gray-200 ${
                  activeAppointment?.appointmentId === chat.appointmentId
                    ? "bg-gray-100"
                    : ""
                }`}
              >
                <p className="font-semibold">{chat.name}</p>
                <p className="text-sm text-gray-500 truncate">
                  {chat.lastMessage || "No messages yet"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="p-4 text-gray-500">No accepted chats available</p>
        )}
      </div>

      {/* Hamburger for mobile */}
      {!sidebarOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-30 bg-blue-500 text-white p-2 rounded-full"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
      )}

      {/* Chat area */}
      <div className="flex-1 flex flex-col md:ml-0 md:w-3/4 ml-0">
        <div className="flex items-center justify-between p-4 border-b bg-blue-500 text-white">
          <h2 className="font-bold">
            {activeAppointment ? activeAppointment.name : "Select a chat"}
          </h2>
          {activeAppointment && (
            <button
              onClick={() => setActiveAppointment(null)}
              className="text-white font-bold text-lg hover:text-gray-200 md:hidden"
            >
              ✕
            </button>
          )}
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 flex flex-col"
          style={{ minHeight: 0 }}
        >
          {messages.length > 0 ? (
            messages.map((msg, i) => {
              const senderIdStr = msg.senderId?._id || msg.senderId;
              const isMine = senderIdStr.toString() === senderId.toString();
              return (
                <div
                  key={msg._id || i}
                  className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs sm:max-w-sm md:max-w-md px-4 py-2 rounded-lg shadow ${
                      isMine
                        ? "bg-green-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {!isMine && (
                      <p className="font-semibold text-sm mb-1">
                        {msg.senderName || "Doctor/Patient"}
                      </p>
                    )}
                    <p>{msg.message}</p>
                    <span className="text-xs opacity-70 block text-right">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-sm text-center mt-10">No messages yet</p>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        {activeAppointment && (
          <div className="p-3 border-t bg-white flex">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
              placeholder="Type a message"
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-green-600 text-white px-4 py-2 rounded-full"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
