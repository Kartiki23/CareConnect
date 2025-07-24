import express from 'express'
import { loginDoctor} from '../controller/DoctorLoginController.js';


const docLoginRouter = express.Router();

docLoginRouter.post('/login',loginDoctor)

export default docLoginRouter;