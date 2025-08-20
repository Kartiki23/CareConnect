import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatBox from "../Components/ChatBox";

const DoctorDashboard = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    axios
      .get(`https://careconnect-9y8d.onrender.com/api/v1/chat/acceptedPatients/${doctorId}`)
      .then((res) => setAppointments(res.data));
  }, [doctorId]);

  return (
    <div className="flex">
      <div className="w-1/3 border-r">
        <h2 className="text-lg font-bold p-2">Accepted Patients</h2>
        {appointments.map((appt) => (
          <div
            key={appt.appointmentId}
            className="p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => setActiveChat(appt)}
          >
            {appt.name} ({appt.appointmentDate})
          </div>
        ))}
      </div>
      <div className="w-2/3 p-4">
        {activeChat ? (
          <ChatBox
            appointmentId={activeChat.appointmentId}
            senderId={doctorId}
            senderModel="docregmodels"
          />
        ) : (
          <p>Select a patient to chat</p>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
