
import express from 'express'
import authRoutes from './route/DoctorRegistrationRoute.js';
import { connectDB } from './config/Db.js';
import docLoginRouter from './route/DoctorLoginRoute.js';
import patientRoutes from './route/PatientRegistrationRoute.js'
import cors from 'cors';
import dotenv from "dotenv";
import specialtiesRouter from './route/SpecialtiesRoute.js';
import donationRoute from './route/DonatinRoute.js';
import docDashboardRouter from './route/DoctorDashboardRoute.js';
import bookAppointmentRoute from './route/BookAppointmentRoute.js';
import patientloginRoutes from './route/PatientLoginRoute.js';
import patientRegisterrouter from './route/PatientRegistrationRoute.js';


const app = express()

app.use(express.json())

app.use(cors());

dotenv.config();

connectDB();

const PORT = 3001

app.use('/api/v1/user',authRoutes)

app.use('/uploads', express.static('uploads')); 

app.use('/api/v1/user',docLoginRouter)

app.use('/api/v1/user',patientloginRoutes)

app.use('/api/v1/user', patientRegisterrouter);

app.use('/api/v1/user', docDashboardRouter);

app.use('/api/v1/user',specialtiesRouter)

app.use('/api/v1/user',donationRoute)

app.use('/api/v1/user',bookAppointmentRoute)


// app.use('/',(req,res)=> {
//     res.send ("Hello World")
// })



app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})

