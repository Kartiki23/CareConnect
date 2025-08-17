import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatBox from "../Components/ChatBox";


const PatientMessages = ({ patientId }) => {
  const [appointments, setAppointments] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/v1/chat/acceptedAppointments/${patientId}`)
      .then((res) => setAppointments(res.data));
  }, [patientId]);

  return (
    <div className="flex">
      <div className="w-1/3 border-r">
        <h2 className="text-lg font-bold p-2">My Doctors</h2>
        {appointments.map((appt) => (
          <div
            key={appt.appointmentId}
            className="p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => setActiveChat(appt)}
          >
            Dr. {appt.doctorName} ({appt.appointmentDate})
          </div>
        ))}
      </div>
      <div className="w-2/3 p-4">
        {activeChat ? (
          <ChatBox
            appointmentId={activeChat.appointmentId}
            senderId={patientId}
            senderModel="Patient"
          />
        ) : (
          <p>Select a doctor to chat</p>
        )}
      </div>
    </div>
  );
};

export default PatientMessages;
