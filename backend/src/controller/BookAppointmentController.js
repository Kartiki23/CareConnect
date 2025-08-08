import mongoose from "mongoose";
import { appointment } from "../model/BookAppointmentModel.js";
import { Patient } from "../model/PatientRegistrationModel.js";
import { docRegModel } from "../model/DoctorRegistrationModel.js";

// Book an appointment
export const bookAppointment = async (req, res) => {
  try {
    const {
      name,
      email,
      contactNo,
      gender,
      age,
      specialization,
      doctorId,
      appointmentDate,
      appointmentTime,
      reason,
      medicalHistory,
      patientId
    } = req.body;

    if (
      !name ||
      !email ||
      !contactNo ||
      !gender ||
      !age ||
      !specialization ||
      !doctorId ||
      !appointmentDate ||
      !appointmentTime ||
      !reason ||
      !medicalHistory
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newAppointment = new appointment({
      name,
      email,
      contactNo,
      gender,
      age,
      specialization,
      doctorId: new mongoose.Types.ObjectId(doctorId),
      appointmentDate,
      appointmentTime,
      reason,
      medicalHistory,
      patientId,
      status: "pending",
    });

    await newAppointment.save();

    res.status(201).json({ message: "Appointment Booked Successfully!" });
  } catch (error) {
    console.log("Booking error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Fetch appointments for a specific doctor
export const getAppointmentsForDoctor = async (req, res) => {
  try {
    const { doctorId } = req.query;

    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    const appointments = await appointment.find({
      doctorId: new mongoose.Types.ObjectId(doctorId),
    });

    res.status(200).json({ appointments });
  } catch (error) {
    console.log("Error fetching appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update appointment status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    if (!appointmentId || !status) {
      return res
        .status(400)
        .json({ message: "Appointment ID and status required" });
    }

    const updated = await appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: `Appointment status updated`, appointment: updated });
  } catch (error) {
    console.log("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get Appointments For Patient
export const getAppointmentsForPatient = async (req, res) => {
  try {
    const { patientId } = req.query;

    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

   const appointments = await appointment.find({ patientId ,}).populate("doctorId", "fullName specialization");

    // const appointments = await appointment
    //   .find({ patientId })
    //   .populate("doctorId", "fullName"); // <-- THIS POPULATES fullName from doctor

    res.status(200).json({ appointments });
  } catch (error) {
    console.log("Fetching error:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

// Cancel Appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    await appointment.findByIdAndDelete(appointmentId);
    res.status(200).json({ message: "Appointment cancelled" });
  } catch (error) {
    console.error("Cancellation error:", error);
    res.status(500).json({ error: "Failed to cancel appointment" });
  }
};
