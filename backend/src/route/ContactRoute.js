import express from 'express'
import { contact, getMessage } from "../controller/ContactController.js";

const contactRoute = express.Router();

contactRoute.post('/contact',contact);
contactRoute.get('/contactmessage',getMessage);

export default contactRoute;