// backend/src/route/LocationRoute.js
import express from "express";
import { reverseGeocode, forwardGeocode } from "../controller/LocationController.js";

const locationRoute= express.Router();

locationRoute.get("/reverse", reverseGeocode);
locationRoute.get("/forward", forwardGeocode);

export default locationRoute;