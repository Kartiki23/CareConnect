import { docRegModel } from "../model/DoctorRegistrationModel.js";

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
      doctorPhoto: doctor.doctorPhoto,
    });
  } catch (error) {
    console.log("Error fetching doctor profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
