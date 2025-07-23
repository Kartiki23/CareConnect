import mongoose, { Schema } from "mongoose";

export const patientRegisterSchema = new Schema({
    fullName:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    phoneNo:{
        type:Number,
        required:true,
        trim:true,
        unique: true,
        length:10
    },
    password:{
        type:String,
        require:true,
        trim:true,
        unique: true,
        minLength:6
    }

},{timestamps: true,}
);

export const patientRegisterModel = mongoose.model('patientRegisterModel',patientRegisterSchema);