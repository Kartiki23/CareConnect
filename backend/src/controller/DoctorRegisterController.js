import express from 'express';
import bcrypt from 'bcrypt';
import { doctorRegisterModel } from '../model/DoctorRegisterModel.js';

//const bcrypt = require('bcrypt');

export const doctorRegister = async (req,res) => {

    try {
        const {fullName,gender,age,contactNo,aadharcardNo,email,password,specialization,hospitalName,licenseNo,licensePhoto,doctorPhoto} = req.body;

        if(!email || !password){
            return res.status(409).json({message:"All fields are requried !!"})
        }

        const userExist = await doctorRegisterModel.findOne({email});

        if(userExist){
            return res.status(401).json({message:"Email already Exists"})
        }

        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const newDoctor = new doctorRegisterModel({
            fullName,
            gender,
            age,
            contactNo,
            aadharcardNo,
            email,
            password:hashedPassword,
            specialization,
            hospitalName,
            licenseNo,
            licensePhoto,
            doctorPhoto
        });

        await newDoctor.save();

        res.status(201).json({
            message:"Login Successfully!!!",
            email
        })    
    } catch (error) {
        console.log(error);
        res.status(501).json({message:"Server Error"})
    }

}