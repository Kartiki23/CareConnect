import { Patient } from "../model/PatientRegistrationModel.js";

export const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if patient exists
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(404).json({ message: "You haven't registered yet. Please register first." });
    }

    // Match password (for production, use bcrypt for hashed password comparison)
    if (patient.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", patient });
  } catch (error) {
    console.error("Patient Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};