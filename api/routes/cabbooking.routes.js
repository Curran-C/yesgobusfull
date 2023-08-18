import express from "express";
import {
    createCabBooking,
    getCabBookingsByUser,
    cancelCabBooking
} from "../controllers/cabBooking.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const router = express.Router();

router.use(authenticateUser);

router.post("/create", createCabBooking);
router.get("/getCabBookingsByUser/:id", getCabBookingsByUser);
router.patch("/cancelCabBooking/:bookingId", cancelCabBooking);

export default router;