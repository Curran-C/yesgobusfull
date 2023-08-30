import express from "express";
import {
    getCityListController,
    searchBusController,
    getSeatLayoutController,
    blockSeatController,
    bookSeatController,
    cancelTicketController,
} from "../controllers/busBooking.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const router = express.Router();

router.use(authenticateUser);

router.get("/getCityList", getCityListController);
router.post("/searchBus", searchBusController);
router.post("/getSeatLayout", getSeatLayoutController);
router.post("/blockSeat", blockSeatController);
router.get("/bookSeat/:ticketKey", bookSeatController);
router.get("/cancelTicket", cancelTicketController);

export default router;