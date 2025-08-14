import mongoose, { Schema } from "mongoose";

export const patientSchema = new Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:6
    },

},{ timestamps: true,}
);

export const patientLoginModel = mongoose.model('patientLoginModel',patientSchema);