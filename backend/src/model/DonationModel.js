import mongoose, { Schema } from "mongoose";

const donationSchema = new Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        required:true,
        type:String,
    }
},{timestamps:true})

export const donationModel = mongoose.model('donationModel',donationSchema)