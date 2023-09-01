import express from "express";
import {
  initiatePaymentController,
  checkPaymentStatusController,
} from "../controllers/payment.controller.js";

const routes = express.Router();

routes.post("/initiatePayment", initiatePaymentController);
routes.get("/checkPaymentStatus/:merchantTransactionId", checkPaymentStatusController);

export default routes;