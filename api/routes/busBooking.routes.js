import express from "express";
import {
    getCityListController,
    searchBusController,
    getSeatLayoutController,
    blockSeatController,
    bookSeatController,
    cancelTicketController,
    getBusFiltersController,
    getBusDetailsController,
    bookBusController,
} from "../controllers/busBooking.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const router = express.Router();

// router.use(authenticateUser);

router.get("/getCityList", getCityListController);
router.post("/searchBus", searchBusController);
router.post("/getSeatLayout", getSeatLayoutController);
router.post("/blockSeat", blockSeatController);
router.get("/bookSeat/:ticketKey", bookSeatController);
router.get("/cancelTicket", cancelTicketController);

router.get("/getFilters", getBusFiltersController);

router.post("/getBusDetails", getBusDetailsController);

router.post("/bookBus", bookBusController);

export default router;