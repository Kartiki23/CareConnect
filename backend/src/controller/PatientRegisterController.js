import express from 'express';
import { User } from '../models/Loginmodel.js';
import bcrypt from 'bcrypt';

//const bcrypt = require('bcrypt');

export const userRegister = async (req,res) => {

    try {
        const {name,email,password} = req.body;

        if(!email || !password){
            return res.status(409).json({message:"All fields are requried !!"})
        }

        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(401).json({message:"Email already Exists"})
        }

        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
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