import bcrypt from "bcrypt";
import { docRegModel } from "../model/DoctorRegistrationModel.js";

export const registerDoctor = async (req, res) => {
  try {
    const {
      fullName, gender, age, email, phone, aadharNumber,
      password, specialization, hospital, licenseNumber,
      consultationFee,
      addressLine = "", city = "", state = "", postalCode = "", country = "",
      latitude, longitude
    } = req.body;

    const licensePhoto = req.files?.licensePhoto?.[0]?.filename || "";
    const doctorPhoto  = req.files?.doctorPhoto?.[0]?.filename || "";

    // ✅ Validation
    if (!fullName || !gender || !age || !email || !phone || !aadharNumber || !password ||
        !specialization || !hospital || !licenseNumber || !licensePhoto || !doctorPhoto) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // ✅ Duplicate email check
    const exists = await docRegModel.findOne({ email });
    if (exists) return res.status(400).json({ message: "Doctor already registered." });

    // ✅ Hash password
    const hashed = await bcrypt.hash(password, 10);

    // ✅ Handle numbers safely
    const lng = longitude ? Number(longitude) : 0;
    const lat = latitude  ? Number(latitude)  : 0;

    const doc = new docRegModel({
      fullName,
      gender,
      age: Number(age),  // 👈 FIX cast issue
      email,
      phone,
      aadharNumber,
      password: hashed,
      specialization,
      hospital,
      licenseNumber,
      licensePhoto,
      doctorPhoto,
      consultationFee: consultationFee !== undefined ? Number(consultationFee) : 0,
      addressLine,
      city,
      state,
      postalCode,
      country,
      location: { type: "Point", coordinates: [lng, lat] }
    });

    await doc.save();

    res.status(201).json({
      message: "Doctor registered successfully.",
      doctor: {
        _id: doc._id,
        fullName: doc.fullName,
        email: doc.email,
        doctorPhoto: doc.doctorPhoto,
        consultationFee: doc.consultationFee
      }
    });

  } catch (error) {
    console.error("Registration Error:", error); // 👈 log full error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await docRegModel.find(
      {},
      'fullName specialization consultationFee addressLine city state postalCode country location'
    );
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch doctors', error });
  }
};


export const getDoctorsBySpecialty = async (req, res) => {
  try {
    const { specialization } = req.params;

    console.log("Requested specialization:", specialization);

    // Find doctors matching the specialization
    const doctors = await docRegModel.find({
      specialization: { $regex: new RegExp(`^${specialization}$`, "i") } // case-insensitive exact match
    });

    if (!doctors.length) {
      return res.status(404).json({ message: "No doctors found for this specialization" });
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};