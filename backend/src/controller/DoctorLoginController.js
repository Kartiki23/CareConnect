import { docLogin } from "../model/doctorLoginModel.js";
import bcrypt from "bcrypt";

export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingDoctor = await docLogin.findOne({ email });

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

    // Success
    res.status(200).json({ message: "Login successful", doctor: existingDoctor });
  } catch (error) {
    console.log("Doctor login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};