import { donationModel } from "../model/DonationModel.js";

export const donationFun = async (req,res)=>{
    try {
        const {id,name,description,image} = req.body;

        if( !name || !description || !image){
            return res.status(400).json({message : "All fields are required" });
        }

        const newDonation = new donationModel({
            id,
            name,
            description,
            image
        })

        await newDonation.save();

        res.status(201).json({
            message:"Donation data added Sucessfully",
            id,
            name,
            description,
            image

        })


    } catch (error) {
        console.log(error)
        res.status(500).json({messasge: "server error"})
    }
};


export const getDonationImage = async (req,res)=>{
    try {
        const donation = await donationModel.find();
        res.status(201).json({donation});
    } catch (error) {
        console.log(error);
        res.status(500).josn({message: "Server Error while fetching images"})
    }
};


export const getDonations = async (req, res) => {
  try {
    const donations = await donationModel.find();
    res.status(200).json({ donation: donations });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};