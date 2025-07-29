import express from 'express';
import { donationFun, getDonationImage } from '../controller/DonationController.js';

const donationRoute = express.Router();

donationRoute.post('/donation',donationFun);

donationRoute.get('/donation',getDonationImage);

export default donationRoute;