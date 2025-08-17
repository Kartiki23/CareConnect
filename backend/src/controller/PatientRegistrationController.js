// src/controller/PatientRegistrationController.js
import bcrypt from "bcrypt";
import axios from "axios";
import { Patient } from "../model/PatientRegistrationModel.js";

const OPENCAGE_KEY = process.env.OPENCAGE_API_KEY; // set this in your .env

// helper to reverse geocode server-side using OpenCage
export const reverseGeocodeServer = async (lat, lng) => {
  if (!OPENCAGE_KEY || OPENCAGE_KEY === "YOUR_DEFAULT_KEY") {
    console.warn("OpenCage key not set or is using a placeholder.");
    return null;
  }

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(`${lat},${lng}`)}&key=${OPENCAGE_KEY}&no_annotations=1&language=en`;

  try {
    const { data } = await axios.get(url);
    
    if (data?.status?.code === 401) {
      console.warn("OpenCage API returned 401 — check your API key or quota.");
      return null;
    }

    const formatted = data?.results?.[0]?.formatted || null;
    return formatted;
  } catch (err) {
    console.warn("reverseGeocodeServer error:", err?.response?.data?.status?.message || err?.message || err);
    return null;
  }
};

export const registerPatient = async (req, res) => {
  try {
    const { fullName, gender, age, email, phone, password, address } = req.body;
    let { latitude, longitude } = req.body;

    if (!fullName || !gender || !age || !email || !phone || !password) {
      return res.status(400).json({ message: "All required fields are missing." });
    }

    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // photo handling: multer set req.file
    let patientPhoto = null;
    if (req.file) {
      patientPhoto = req.file.filename;
    }

    // If coordinates present but no human address provided, reverse geocode server-side
    let finalAddress = address || null;
    if ((!finalAddress || finalAddress.trim() === "") && latitude && longitude) {
      finalAddress = await reverseGeocodeServer(latitude, longitude);
    }

    // Parse numbers
    if (latitude) latitude = parseFloat(latitude);
    if (longitude) longitude = parseFloat(longitude);

    const newPatient = new Patient({
      fullName,
      gender,
      age,
      email,
      phone,
      password: hashedPassword,
      patientPhoto,
      address: finalAddress,
      location: { type: "Point", coordinates: longitude && latitude ? [longitude, latitude] : [0, 0] },
    });

    await newPatient.save();

    res.status(201).json({
      message: "Patient registered successfully",
      patientId: newPatient._id,
    });
  } catch (error) {
    console.error("Register Patient Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Export the reverse geocode function so route can call it directly (for instant frontend display)
export const reverseGeocodeEndpoint = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) return res.status(400).json({ message: "lat & lng required" });
    const formatted = await reverseGeocodeServer(lat, lng);
    return res.json({ address: formatted });
  } catch (err) {
    console.error("reverseGeocodeEndpoint error", err);
    return res.status(500).json({ message: "Server error" });
  }
};