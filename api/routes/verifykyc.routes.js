import express from "express";
import {
    // authenticateController,
    aadhaarKycGenerateOtpController,
    aadhaarKycVerifyOtpController,
    panVerificationController,
    bankAccountVerificationController,
    drivingLicenseVerificationController,
} from "../controllers/verifykyc.controller.js";

const routes = express.Router();

// routes.get("/authenticate", authenticateController);
routes.post("/aadhaar/generateOtp", aadhaarKycGenerateOtpController);
routes.post("/aadhaar/verifyOtp", aadhaarKycVerifyOtpController);
routes.post("/pan/verify", panVerificationController);
routes.post("/bank/verify", bankAccountVerificationController);
routes.post("/drivingLicense/verify", drivingLicenseVerificationController);

export default routes;
