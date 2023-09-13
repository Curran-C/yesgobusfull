import express from "express";
import {
    authenticateController,
    aadhaarKycGenerateOtpController,
    aadhaarKycVerifyOtpController,
    panVerificationController,
    bankAccountVerificationController
} from "../controllers/verifykyc.controller";

const routes = express.Router();

routes.get("/authenticate", authenticateController);
routes.post("/aadhaar/generateOtp", aadhaarKycGenerateOtpController);
routes.post("/aadhaar/verifyOtp", aadhaarKycVerifyOtpController);
routes.post("/pan/verify", panVerificationController);
routes.post("/bank/verify", bankAccountVerificationController);

export default routes;
