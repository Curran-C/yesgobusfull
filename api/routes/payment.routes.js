import express from "express";
import {
  initiatePaymentController,
  checkPaymentStatusController,
  refundPaymentController,
} from "../controllers/payment.controller.js";

const routes = express.Router();

routes.post("/initiatePayment", initiatePaymentController);
routes.get("/checkPaymentStatus/:merchantTransactionId", checkPaymentStatusController);
routes.post("/refundPayment", refundPaymentController);

export default routes;