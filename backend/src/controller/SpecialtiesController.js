import { Specialties } from "../model/SpecialtiesModel.js";


export const specialtiesData = async (req, res) => {
  try {
    const { id, name, price, image } = req.body;

    // Check if all required fields are present
    if (!id || !name || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const specialtiesExist = await Specialties.findOne({ id });

    if (specialtiesExist) {
      return res.status(409).json({ message: "Specialties already exists" });
    }

    const newSpecialties = new Specialties({
      id,
      name,
      price,
      image,
    });

    await newSpecialties.save();

    res.status(201).json({
      message: "Specialties added successfully!",
      product: { id, name, price, image },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};



export const getAllSpecialties = async (req, res) => {
  try {
    const specialties = await Specialties.find();
    res.status(200).json({ specialties });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error while fetching products" });
  }
};
