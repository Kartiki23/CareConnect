import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Patient } from "../model/PatientRegistrationModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallbackSecretKey";

export const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingPatient = await Patient.findOne({ email });
    if (!existingPatient) {
      return res.status(404).json({ message: "You haven't registered yet. Please register first." });
    }

    const isMatch = await bcrypt.compare(password, existingPatient.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { sub: existingPatient._id.toString(), role: "patient" },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      patient: { _id: existingPatient._id, email: existingPatient.email },
      role: "patient",
    });
  } catch (error) {
    console.log("Patient Login Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};