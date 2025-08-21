import express from 'express';
import { donationFun, getDonationImage, getDonations } from '../controller/DonationController.js';

const donationRoute = express.Router();

donationRoute.post('/donation',donationFun);

donationRoute.get('/donation',getDonationImage);

donationRoute.get('/donation',getDonations);

export default donationRoute;