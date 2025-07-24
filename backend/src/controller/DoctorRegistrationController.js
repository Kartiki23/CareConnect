import express from 'express'
import bcrypt from 'bcrypt';
import { docRegModel } from '../model/DoctorRegistrationModel.js';

export const docRegistration = async (req,res)=>{

    try {
        const {fullName,gender,age,contactNo,aadharcardNo,email,password,specialization,hospitalname,licenseNo,licensePhoto,doctorPhoto } = req.body;

        // if(!email || !password ){
        //     return res.status(409).json({message:"All fields are required"})
        // }

        const userExist = await docRegModel.findOne({email} )

        if(userExist ){
            return res.status(409).json({message:"User Already exist"})
        }

        const salt = 10
        const hashPassword= await bcrypt.hash(password,salt);


        const newDoc = new docRegModel({
            fullName,
            gender,
            age,
            contactNo,
            aadharcardNo,
            email,
            password:hashPassword,
            specialization,
            hospitalname,
            licenseNo,
            licensePhoto,
            doctorPhoto
        });

        await newDoc.save();

        res.status(201).json({
            message:"Login Sucessfully",
            fullName,
            gender,
            age,
            contactNo,
            aadharcardNo,
            email,
            password:hashPassword,
            specialization,
            hospitalname,
            licenseNo,
            licensePhoto,
            doctorPhoto
        })

        
    } catch (error) {
        console.log(error)   
        res.status(501).json({message:"Server error"})
    }
    

}