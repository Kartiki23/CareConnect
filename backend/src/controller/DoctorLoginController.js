import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { docRegModel } from "../model/DoctorRegistrationModel.js";

const JWT_SECRET = process.env.JWT_SECRET  || "fallbackSecretKey";

export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingDoctor = await docRegModel.findOne({ email });
    if (!existingDoctor) {
      return res.status(404).json({ message: "You haven't registered yet. Please register." });
    }

    const isMatch = await bcrypt.compare(password, existingDoctor.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password." });

    const token = jwt.sign(
      { sub: existingDoctor._id.toString(), role: "doctor" },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      doctor: {
        _id: existingDoctor._id,
        fullName: existingDoctor.fullName,
        email: existingDoctor.email,
      },
      role: "doctor",
    });
  } catch (error) {
    console.log("Doctor login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};