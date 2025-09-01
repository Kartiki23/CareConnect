import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatBox from "../Components/ChatBox";

const DoctorDashboard = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [isListOpen, setIsListOpen] = useState(false); // mobile toggle

  useEffect(() => {
    axios
      .get(`https://careconnect-1-xvl2.onrender.com/api/v1/chat/acceptedPatients/${doctorId}`)
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error(err));
  }, [doctorId]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Patient List */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform transition-transform duration-300
          ${isListOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex justify-between items-center p-4 border-b md:border-none">
          <h2 className="text-lg font-bold">Accepted Patients</h2>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsListOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto h-full">
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <div
                key={appt.appointmentId}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                  activeChat?.appointmentId === appt.appointmentId
                    ? "bg-indigo-100"
                    : ""
                }`}
                onClick={() => {
                  setActiveChat(appt);
                  setIsListOpen(false); // close list on mobile
                }}
              >
                <p className="font-medium">{appt.name}</p>
                <p className="text-sm text-gray-500">{appt.appointmentDate}</p>
              </div>
            ))
          ) : (
            <p className="p-2 text-gray-500">No accepted patients yet.</p>
          )}
        </div>
      </div>

      {/* Hamburger for mobile */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button
          onClick={() => setIsListOpen(true)}
          className="text-gray-700 hover:text-indigo-600"
        >
          ☰
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 md:p-6 ml-0 md:ml-64 h-screen overflow-y-auto">
        {activeChat ? (
          <ChatBox
            appointmentId={activeChat.appointmentId}
            senderId={doctorId}
            senderModel="docregmodels"
          />
        ) : (
          <p className="text-gray-500 text-center mt-10 md:mt-20">
            Select a patient to chat
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
