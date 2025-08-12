// src/PatientFlow/PatientMessages.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const SERVER = "http://localhost:3001";
const socket = io(SERVER, { transports: ["websocket"] });

const makeConversationId = (a, b) => [String(a), String(b)].sort().join("_");

export default function PatientMessages() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef(null);

  const patient = JSON.parse(localStorage.getItem("patient") || "null");
  const patientId = patient?._id;

  useEffect(() => {
    if (!patientId) return;

    const loadDoctors = async () => {
      try {
        const res = await axios.get(`${SERVER}/api/v1/messages/user/${patientId}/doctors`);
        setDoctors(res.data || []);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    loadDoctors();
  }, [patientId]);

  useEffect(() => {
    const handler = (payload) => {
      if (!selectedDoctor) return;

      const convId = makeConversationId(payload.senderId, payload.receiverId);
      const currentConv = makeConversationId(patientId, selectedDoctor._id);

      if (convId === currentConv) {
        setMessages((prev) => [
          ...prev,
          {
            senderId: payload.senderId,
            receiverId: payload.receiverId,
            message: payload.text,
            createdAt: payload.createdAt,
          },
        ]);
      }
    };

    socket.on("receiveMessage", handler);
    return () => {
      socket.off("receiveMessage", handler);
    };
  }, [selectedDoctor, patientId]);

  const openChat = async (doc) => {
    setSelectedDoctor(doc);
    setMessages([]);
    try {
      const res = await axios.get(`${SERVER}/api/v1/messages/${patientId}/${doc._id}`);
      setMessages(res.data || []);
      const convId = makeConversationId(patientId, doc._id);
      socket.emit("joinRoom", convId);
    } catch (err) {
      console.error("Error loading conversation:", err);
    }
  };

  const sendMessage = async () => {
    if (!draft.trim() || !selectedDoctor) return;

    const payload = {
      senderId: patientId,
      receiverId: selectedDoctor._id,
      message: draft,
    };

    try {
      await axios.post(`${SERVER}/api/v1/messages`, payload);

      const conversationId = makeConversationId(patientId, selectedDoctor._id);
      socket.emit("sendMessage", {
        conversationId,
        senderId: patientId,
        receiverId: selectedDoctor._id,
        text: draft,
      });

      setMessages((prev) => [
        ...prev,
        {
          senderId: patientId,
          receiverId: selectedDoctor._id,
          message: draft,
          createdAt: new Date(),
        },
      ]);
      setDraft("");
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left: doctors list */}
      <div className="w-1/3 md:w-1/4 border-r bg-white">
        <div className="p-4 font-bold border-b">Doctors</div>
        <div className="overflow-y-auto h-[calc(100vh-64px)]">
          {doctors.length ? (
            doctors.map((doc) => (
              <div
                key={doc._id}
                onClick={() => openChat(doc)}
                className={`p-3 border-b cursor-pointer flex items-center gap-3 hover:bg-gray-50 ${
                  selectedDoctor?._id === doc._id ? "bg-gray-100" : ""
                }`}
              >
                <img
                  src={
                    doc.doctorPhoto
                      ? `${SERVER}/uploads/${doc.doctorPhoto}`
                      : "https://i.pravatar.cc/40"
                  }
                  alt={doc.fullName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium">{doc.fullName}</div>
                  <div className="text-xs text-gray-500">{doc.specialization}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-gray-500">No doctors available</div>
          )}
        </div>
      </div>

      {/* Right: chat */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-white flex items-center gap-4">
          {selectedDoctor ? (
            <>
              <img
                src={
                  selectedDoctor.doctorPhoto
                    ? `${SERVER}/uploads/${selectedDoctor.doctorPhoto}`
                    : "https://i.pravatar.cc/40"
                }
                alt={selectedDoctor.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">{selectedDoctor.fullName}</div>
                <div className="text-xs text-gray-500">{selectedDoctor.specialization}</div>
              </div>
            </>
          ) : (
            <div className="text-gray-600">Select a doctor to start chat</div>
          )}
        </div>

        <div className="flex-1 p-4 overflow-auto bg-gray-50">
          {!selectedDoctor ? (
            <div className="text-center text-gray-500 mt-20">Select a conversation</div>
          ) : (
            <div className="space-y-3">
              {messages.map((m, idx) => {
                const mine = String(m.senderId) === String(patientId);
                return (
                  <div key={idx} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`${
                        mine ? "bg-blue-600 text-white" : "bg-white text-black"
                      } px-4 py-2 rounded-lg shadow-sm max-w-[70%]`}
                    >
                      {m.message || m.text}
                      <div className="text-[10px] text-gray-300 mt-1 text-right">
                        {new Date(m.createdAt || Date.now()).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={scrollRef} />
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-white flex gap-3">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder={
              selectedDoctor ? `Message ${selectedDoctor.fullName}` : "Select a doctor first"
            }
            disabled={!selectedDoctor}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!selectedDoctor || !draft.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}