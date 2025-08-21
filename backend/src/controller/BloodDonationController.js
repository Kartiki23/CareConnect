import { BloodDonation } from "../model/BloodDonationModel.js";


export const submitBloodDonation = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      age,
      gender,
      bloodGroup,
      donationType,
      lastDonation,
      healthIssues,
      address,
    } = req.body;

    // Simple validation
    if (!fullName || !email || !phone || !age || !gender || !donationType || !bloodGroup || !address) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    const newDonation = new BloodDonation({
      fullName,
      email,
      phone,
      age,
      gender,
      bloodGroup,
      donationType,
      lastDonation,
      healthIssues,
      address,
    });

    await newDonation.save();
    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Admin Panel APIs
// -------------------------

// Get all donors, optional filter by bloodGroup & search by name/address
export const getDonors = async (req, res) => {
  try {
    const { bloodGroup, search } = req.query;
    let filter = {};

    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
      ];
    }

    const donors = await BloodDonation.find(filter).sort({ createdAt: -1 });
    res.status(200).json(donors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a donor by ID
export const deleteDonor = async (req, res) => {
  try {
    const { id } = req.params;
    await BloodDonation.findByIdAndDelete(id);
    res.status(200).json({ message: "Donor deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};




export const createDonation = async (req, res) => {
  try {
    const newDonation = new ({
      patientId: req.patientId,   // ✅ comes from middleware
      bloodGroup: req.body.bloodGroup,
      units: req.body.units,
      location: req.body.location,
      date: req.body.date,
    });

    await newDonation.save();
    res.status(201).json({ message: "Donation recorded successfully", donation: newDonation });
  } catch (error) {
    console.error("Error creating donation:", error.message);
    res.status(500).json({ message: "Server error while creating donation." });
  }
};

export const getDonationsByPatient = async (req, res) => {
  try {
    const donations = await BloodDonation.find({ patientId: req.patientId }).sort({ createdAt: -1 });
    res.json({ success: true, donations });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch donations" });
  }
};

