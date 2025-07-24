// controllers/DoctorRegistrationController.js

export const registerDoctor = async (req, res) => {
  try {
    const {
      fullName,
      gender,
      age,
      email,
      phone,
      aadharNumber,
      password,
      specialization,
      hospital,
      licenseNumber,
    } = req.body;

    console.log("Uploaded files:", req.files);

    const licensePhoto = req.files.licensePhoto?.[0]?.filename || "";
    const profilePhoto = req.files.profilePhoto?.[0]?.filename || "";

    if (!email || !password || !licensePhoto || !profilePhoto) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Save logic here...

    res.status(201).json({ message: "Doctor registered successfully." });

  } catch (error) {
    console.error("Backend error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};