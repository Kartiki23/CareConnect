import { appointment } from "../model/BookAppointmentModel.js";
import { docRegModel } from "../model/DoctorRegistrationModel.js";
import { Patient } from "../model/PatientRegistrationModel.js";
import mongoose from "mongoose";

export const getDoctorProfile = async (req, res) => {
  try {
    const { doctorId } = req.body;

    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    const doctor = await docRegModel.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({
      _id: doctor._id,
      fullName: doctor.fullName,
      email: doctor.email,
      gender: doctor.gender,
      age: doctor.age,
      phone: doctor.phone,
      aadharNumber: doctor.aadharNumber,
      specialization: doctor.specialization,
      hospital: doctor.hospital,
      licenseNumber: doctor.licenseNumber,
      licensePhoto: doctor.licensePhoto,
      doctorPhoto: doctor.doctorPhoto,
    });
  } catch (error) {
    console.log("Error fetching doctor profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Backend/src/controller/DoctorDashboardController.js

export const DoctorProfile = async (req, res) => {
  try {
    const { doctorId } = req.body;

    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    const doctor = await docRegModel.findById(doctorId).select("-password");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ success: true, doctor });
  } catch (error) {
    console.log("Error fetching doctor profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Update profile 

//import { docRegModel } from "../model/DoctorRegistrationModel.js";

export const updateDoctorInfo = async (req, res) => {
  try {
    const { doctorId } = req.body;

    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    const updatedFields = {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      specialization: req.body.specialization,
      gender: req.body.gender,
      age: req.body.age,
      hospital: req.body.hospital,
      licenseNumber: req.body.licenseNumber,
    };

    if (req.file) {
      updatedFields.doctorPhoto = req.file.filename;
    }

    const updatedDoctor = await docRegModel.findByIdAndUpdate(
      doctorId,
      { $set: updatedFields },
      { new: true }
    );

    res.status(200).json({
      message: "Doctor profile updated successfully",
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// import Appointment from "../models/AppointmentModel.js";
// import Payment from "../models/PaymentModel.js";
// import Patient from "../models/PatientModel.js";

export const getDoctorDashboard = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Total Patients
    const totalPatients = await appointment
      .distinct("patientId", { doctorId })
      .then((p) => p.length);

    // New Patients in last 30 days
    const lastMonth = new Date();
    lastMonth.setDate(lastMonth.getDate() - 30);

    const newPatients = await appointment
      .distinct("patientId", {
        doctorId,
        createdAt: { $gte: lastMonth }
      })
      .then((p) => p.length);

    // Activity Data (monthly stats)
    const thisYear = new Date().getFullYear();
    const lastYear = thisYear - 1;

    const activity = await Promise.all(
      Array.from({ length: 12 }, async (_, monthIndex) => {
        const month = monthIndex; // 0 = Jan, 11 = Dec

        const thisYearStart = new Date(thisYear, month, 1);
        const thisYearEnd = new Date(thisYear, month + 1, 1);

        const lastYearStart = new Date(lastYear, month, 1);
        const lastYearEnd = new Date(lastYear, month + 1, 1);

        const thisYearCount = await appointment.countDocuments({
          doctorId,
          createdAt: { $gte: thisYearStart, $lt: thisYearEnd }
        });

        const lastYearCount = await appointment.countDocuments({
          doctorId,
          createdAt: { $gte: lastYearStart, $lt: lastYearEnd }
        });

        return {
          name: thisYearStart.toLocaleString("default", { month: "short" }),
          thisYear: thisYearCount,
          lastYear: lastYearCount
        };
      })
    );

    // Age Distribution
    const patients = await Patient.find({
      _id: { $in: await appointment.distinct("patientId", { doctorId }) }
    });

    const ageGroups = [
      { name: "0-20", patients: patients.filter((p) => p.age <= 20).length },
      { name: "21-40", patients: patients.filter((p) => p.age >= 21 && p.age <= 40).length },
      { name: "41-60", patients: patients.filter((p) => p.age >= 41 && p.age <= 60).length },
      { name: "61+", patients: patients.filter((p) => p.age >= 61).length }
    ];

    // Gender Distribution
    const genderCount = [
      { name: "Men", value: patients.filter((p) => p.gender === "Male").length },
      { name: "Women", value: patients.filter((p) => p.gender === "Female").length }
    ];

    // Payment Summary (Cash only)
    const totalCashPayments = await appointment.countDocuments({
      doctorId,
      paymentMethod: "Cash"
    });

    // If you also store amount
    const totalCashAmount = await appointment.aggregate([
      { $match: { doctorId: new mongoose.Types.ObjectId(doctorId), paymentMethod: "Cash" } },
      { $group: { _id: null, total: { $sum: "$paymentAmount" } } }
    ]);

    res.json({
      totalPatients,
      newPatients,
      activity,
      ageGroups,
      genderCount,
      paymentSummary: {
        totalCashPayments,
        totalCashAmount: totalCashAmount.length ? totalCashAmount[0].total : 0
      }
    });
  } catch (err) {
    console.log("Error fetching doctor dashboard:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
