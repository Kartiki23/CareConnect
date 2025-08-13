import { Patient } from "../model/PatientRegistrationModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Normalize email
    const existingPatient = await Patient.findOne({ email: email.toLowerCase() });

    if (!existingPatient) {
      return res
        .status(404)
        .json({ message: "You haven't registered yet. Please register first." });
    }

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, existingPatient.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ patientId: existingPatient._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      patient:{
        _id: existingPatient._id
      }
    });
  } catch (error) {
    console.log("Patient Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
