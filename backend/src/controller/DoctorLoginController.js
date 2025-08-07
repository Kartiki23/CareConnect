import { docLogin } from "../model/doctorLoginModel.js";
import bcrypt from "bcrypt";
import { docRegModel } from "../model/DoctorRegistrationModel.js";
import jwt from "jsonwebtoken";

export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if doctor exists
    const existingDoctor = await docRegModel.findOne({ email });

    if (!existingDoctor) {
      return res
        .status(404)
        .json({ message: "You haven't registered yet. Please register." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, existingDoctor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT
    const token = jwt.sign(
      { doctorId: existingDoctor._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Success response
    res.status(200).json({
      message: "Login successful",
      token,
      doctor: {
        _id: existingDoctor._id,
        fullName: existingDoctor.fullName,
        email: existingDoctor.email,
      },
    });
  } catch (error) {
    console.log("Doctor login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
