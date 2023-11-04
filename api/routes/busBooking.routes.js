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
    searchCityController,
    updateBookingsController,
    getBookingByIdController,
    getAllBookingsController,
    sendBookingConfirmationMessage,
    sendBookingConfirmationEmail,
    sendCancelTicketMessage,
    sendCancelTicketEmail,
} from "../controllers/busBooking.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const router = express.Router();

router.get("/searchCity/:searchParam", searchCityController);

router.use(authenticateUser);

//Zuelpay API routes
router.get("/getCityList", getCityListController);
router.post("/searchBus", searchBusController);
router.post("/getSeatLayout", getSeatLayoutController);
router.post("/blockSeat", blockSeatController);
router.get("/bookSeat/:ticketKey", bookSeatController);
router.post("/cancelTicket", cancelTicketController);


router.get("/getFilters", getBusFiltersController);
router.post("/getBusDetails", getBusDetailsController);

//booking routes
router.post("/bookBus", bookBusController);
router.patch("/updateBooking/:bookingId", updateBookingsController);
router.get("/getBookingById/:bookingId", getBookingByIdController);
router.get("/getAllBookings/:userId", getAllBookingsController);

//message and email
router.post("/sendBookingConfirmationMessage", sendBookingConfirmationMessage);
router.post("/sendCancelTicketMessage", sendCancelTicketMessage);
router.post("/sendBookingConfirmationEmail", sendBookingConfirmationEmail);
router.post("/sendCancelTicketEmail", sendCancelTicketEmail);

export default router;