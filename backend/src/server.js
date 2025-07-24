import express from 'express'
import authRoutes from './route/DoctorRegistrationRoute.js';
import { connectDB } from './config/Db.js';
import docLoginRouter from './route/DoctorLoginRoute.js';


const app = express()

app.use(express.json())

connectDB();

const PORT = 3001

app.use('/api/v1/user',authRoutes)

app.use('/api/v1/user',docLoginRouter)

app.use('/',(req,res)=> {
    res.send ("Hello World")
})

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})