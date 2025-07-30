import express from 'express'
import { getAllSpecialties, specialtiesData } from '../controller/SpecialtiesController.js';

const specialtiesRouter = express.Router();

specialtiesRouter.post('/specialties',specialtiesData);

specialtiesRouter.get('/specialties', getAllSpecialties);

export default specialtiesRouter;