import express from "express";
import {
    createCabBookingController,
    getCabBookingsByUserController,
    cancelCabBookingController
} from "../controllers/cabBooking.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const router = express.Router();

router.use(authenticateUser);

router.post("/create", createCabBookingController);
router.get("/getCabBookingsByUser/:id", getCabBookingsByUserController);
router.patch("/cancelCabBooking/:bookingId", cancelCabBookingController);

export default router;