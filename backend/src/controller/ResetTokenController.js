// Generate token for password reset
import bcrypt from 'bcrypt';
import { docRegModel } from '../model/DoctorRegistrationModel.js';
import { Patient } from '../model/PatientRegistrationModel.js';

// ===== Common Reset Password =====
export const resetPasswordCommon = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ success: false, message: "Email and new password are required." });
    }

    // Check if user is a doctor
    let user = await docRegModel.findOne({ email });
    let modelType = "doctor";

    // If not doctor, check patient
    if (!user) {
      user = await Patient.findOne({ email });
      modelType = "patient";
    }

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password only (skip other required fields for doctors)
    user.password = hashedPassword;

    if (modelType === "doctor") {
      await user.save({ validateBeforeSave: false }); // skip required field validation like consultationFee
    } else {
      await user.save(); // patient schema validation is ok
    }

    res.status(200).json({ success: true, message: "Password reset successfully!" });
  } catch (err) {
    console.log("resetPasswordCommon error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};