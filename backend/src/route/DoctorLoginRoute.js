import express from 'express'
import { userRegister } from '../controller/DoctorLoginController.js';


const docLoginRouter = express.Router();

docLoginRouter.post('/login',userRegister)

export default docLoginRouter;