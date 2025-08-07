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
