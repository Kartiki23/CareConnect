import express from 'express'
import cors from 'cors';
import doctorReg from './route/DoctorRegisterRoute.js';
import { connectDB } from './config/db.js';
//import dotenv from 'dotenv';

const app=express();

app.use(express.json());

app.use(cors());

//dotenv.config();

connectDB();

const Port=3001


app.use('/api/v1/auth',doctorReg)

app.listen(Port,()=>{
    console.log(`Server is running on http://localhost:${Port}`)
})