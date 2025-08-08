import { Patient } from "../model/PatientRegistrationModel.js";


export const getPatientProfile = async (req, res) => {
  try {
    const { patientId } = req.body;

    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      _id: patient._id,
      fullName: patient.fullName,
      email: patient.email,
      gender: patient.gender,
      age: patient.age,
      phone: patient.phone,
      //doctorPhoto: doctor.doctorPhoto,
    });
  } catch (error) {
    console.log("Error fetching Patient profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Backend/src/controller/DoctorDashboardController.js

export const PatientProfile = async (req, res) => {
  try {
    const { patientId } = req.body;

    if (!patientId) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    const patient = await Patient.findById(patientId).select("-password");

    if (!patient) {
      return res.status(404).json({ message: "patient not found" });
    }

    res.status(200).json({ success: true, patient });
  } catch (error) {
    console.log("Error fetching doctor profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Update profile 
export const updatePatientInfo = async (req, res) => {
  try {
    const { patientId } = req.body; 

    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    const updatedFields = {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      age: req.body.age,
    };

    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      { $set: updatedFields },
      { new: true }
    );

    res.status(200).json({
      message: "Patient profile updated successfully",
      patient: updatedPatient,
    });
  } catch (error) {
    console.log("Error updating patient profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
