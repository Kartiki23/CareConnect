
import express from 'express'
import authRoutes from './route/DoctorRegistrationRoute.js';
import { connectDB } from './config/Db.js';
import docLoginRouter from './route/DoctorLoginRoute.js';
import cors from 'cors';
import specialtiesRouter from './route/SpecialtiesRoute.js';

const app = express()

app.use(express.json())

app.use(cors());

connectDB();

const PORT = 3001

app.use('/api/v1/user',authRoutes)

app.use('/uploads', express.static('uploads')); 

app.use('/api/v1/user',docLoginRouter)

app.use('/api/v1/user',specialtiesRouter)

app.use('/',(req,res)=> {
    res.send ("Hello World")
})

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})

