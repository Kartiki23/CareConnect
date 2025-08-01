
import express from 'express'
import authRoutes from './route/DoctorRegistrationRoute.js';
import { connectDB } from './config/Db.js';
import docLoginRouter from './route/DoctorLoginRoute.js';
import patientRoutes from './route/PatientRegistrationRoute.js'
import cors from 'cors';
import specialtiesRouter from './route/SpecialtiesRoute.js';
import donationRoute from './route/DonatinRoute.js';
import patientLoginRouter from './route/PatientLoginRoute.js';
import docDashboardRouter from './route/DoctorDashboardRoute.js';

const app = express()

app.use(express.json())

app.use(cors());

connectDB();

const PORT = 3001

app.use('/api/v1/user',authRoutes)

app.use('/uploads', express.static('uploads')); 

app.use('/api/v1/user',docLoginRouter)

app.use('/api/v1/user',patientLoginRouter)

app.use('/api/v1/user', patientRoutes);

app.use('/api/v1/user', docDashboardRouter);


// app.use('/',(req,res)=> {
//     res.send ("Hello World")
// })


app.use('/api/v1/user',specialtiesRouter)

app.use('/api/v1/user',donationRoute)

// app.use('/',(req,res)=> {
//     res.send ("Hello World")
// })



app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})

