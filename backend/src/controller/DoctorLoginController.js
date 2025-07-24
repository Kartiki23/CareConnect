import express from 'express';
import bcrypt from 'bcrypt';
import { docLogin} from '../model/DoctorLoginModel.js';

//const bcrypt = require('bcrypt');

export const userRegister = async (req,res) => {

    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(409).json({message:"All fields are requried !!"})
        }

        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new docLogin({
            email,
            password:hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message:"Login Successfully!!!",
            email
        })    
    } catch (error) {
        console.log(error);
        res.status(501).json({message:"Server Error"})
    }

}