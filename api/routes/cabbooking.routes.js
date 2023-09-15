import express from "express";
import {
    createCabBookingController,
    getCabBookingsByUserController,
    cancelCabBookingController,
    completeBookingController
} from "../controllers/cabBooking.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const router = express.Router();

router.use(authenticateUser);

router.post("/create", createCabBookingController);
router.get("/getCabBookingsByUser/:id", getCabBookingsByUserController);
router.patch("/cancelCabBooking/:bookingId", cancelCabBookingController);
router.patch("/completeBooking/:bookingId", completeBookingController);

export default router;