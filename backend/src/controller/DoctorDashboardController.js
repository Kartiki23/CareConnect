import { docRegModel } from "../model/DoctorRegistrationModel.js";

export const getDoctorProfile = async (req, res) => {
  try {
    const { fullName,email,doctorPhoto } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const doctor = await docRegModel.findOne({ email });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({
      doctor: {
    fullName: doctor.fullName,
    doctorPhoto: doctor.doctorPhoto
  }
    });
  } catch (error) {
    console.log("Error fetching doctor profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};