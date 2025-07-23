import express from 'express'
import { userRegister } from '../contollers/Logincontroller.js';

const authRouter = express.Router();

authRouter.post('/login',userRegister)

export default authRouter;