// backend/controller/doctorController.js
import { docRegModel } from "../model/DoctorRegistrationModel.js";

export const getDoctorProfile = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const doctor = await docRegModel.findOne({ email });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({
      fullName: doctor.fullName,
      doctorPhoto: doctor.doctorPhoto, // Only return filename, not full URL
    });
  } catch (error) {
    console.log("Error fetching doctor profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};